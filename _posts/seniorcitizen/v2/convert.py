# Senior Citizen v2 convert to Jeykll
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
from datetime import datetime
from slugify import slugify
import os
import re

def simple_get(url):
    print('!!!!!!!!')
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        log_error('Error during requests to {0} : {1}'.format(url, str(e)))
        return None

def is_good_response(resp):
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200 and content_type is not None and content_type.find('html') > -1)

def log_error(e):
    print(e)
    
#test_url= 'http://seniorcitizen.blogspot.com/2000_09_03_archive.html'
root_url= 'http://seniorcitizen.blogspot.com/'
raw_html = simple_get(root_url)
html = BeautifulSoup(raw_html, 'html.parser')

# Get all archive pages
archive_widget = html.find("div", {"class": "BlogArchive"})
links_list = archive_widget.select('a.post-count-link')
archive_urls = []
for archive_url in links_list:
    link_url = archive_url.attrs.get('href')
    if link_url.endswith('archive.html'):
        print('Archive URL found: %s' % (link_url))
        archive_urls.append(link_url)
        
# Now extract all the posts
for archive_url in archive_urls:
    raw_html = simple_get(archive_url)
    html = BeautifulSoup(raw_html, 'html.parser')

    for day_archive in html.find_all("div", {"class": "date-outer"}):
        date_string=day_archive.select('h2.date-header > span')[0].text
        print('Processing for posts in: %s' % (date_string))
        date_format = '%A, %B %d, %Y'
        if date_string:
            date_archive = datetime.strptime(date_string, date_format)
        else:
            date_archive = datetime.now()
        post_year = str(date_archive.year)
        post_month = str(date_archive.month).zfill(2) 
        post_day = str(date_archive.day).zfill(2) 
        date_string = post_year + '-' + post_month + '-' + post_day
        posts = day_archive.select('div.date-posts > div.post-outer')
        print('%s posts found.' % (len(posts)))
        grouped_tags = []
        for post in posts:
            title = post.select('h3.post-title')
            article_body = post.select('div.post > div.post-body')[0]
            post_id = article_body.attrs.get('id').replace( 'post-body-', '')
            if not title:
                title = article_body.select('h3')
                if len(title) == 0:
                    title = article_body.select('h4')
                    if len(title) == 0:
                        title = article_body.select('h1')
                        if len(title) == 0:
                            title = None
                        else:
                            title = title[0].text
                    else:
                        title = title[0].text
                else:
                    title = title[0].text
            else:
                title = title[0].text
            tags = post.select('span.post-labels')
            if len(tags) > 0:
                tags = tags[0].text.replace('\n', ' ').replace('Labels: ', ' ').strip().split(',')
                if len(tags) == 1 and tags[0] == '':
                    tags = None
                else:
                    print("Tags found: %s" % tags)
            else:
                tags = None
            post_content_block = article_body.find('div', { 'class': re.compile('(story|editorial|slogan|linkoid)') })
            if post_content_block:
                post_type = post_content_block.attrs.get('class')[0]
                post_content = post_content_block.decode_contents().replace('<h1>Linkoid!!!</h1>','').replace('<div style="clear: both;"></div>', '')
            else:
                post_type = 'story'
                post_content = article_body.decode_contents()
            if title:
                if 'Linkoid' in title:
                    filename = date_string + '-' + slugify(title) + '-' + post_id + '.md'
                else:
                    filename = date_string + '-' + slugify(title) + '.md'
            else:
                filename = date_string + '-' + slugify(post_id) + '.md'
            print(post_id, filename)
            #print(post_type, post_content)
            #print(post.select('div.post-footer a.timestamp-link abbr.published'))
            post_time_search = post.select('div.post-footer a.timestamp-link abbr.published')
            if post_time_search:
                post_time = post_time_search[0].text
            else:
                post_time = '12:00'
            post_timestamp = date_string + ' ' + post_time
            
            # Check folder is created for posts
            target_month_folder = os.path.join(post_year, post_month)
            target_day_folder = os.path.join(target_month_folder, post_day)
            if not os.path.isdir(post_year):
                os.makedirs(post_year)
            if not os.path.isdir(target_month_folder):
                os.makedirs(target_month_folder)
            if not os.path.isdir(target_day_folder):
                os.makedirs(target_day_folder)
            target_file = os.path.join(target_day_folder, filename)
            #target_title = re.escape(title.replace('\n', ''))
            target_title = line = re.sub(r'([\'\"]+)', r'\\\1', title.replace('\n', ''))
            
            with open(target_file, "w", encoding='utf8') as output_file:
                print(f"---\nlayout: senior2\ntitle: \"{target_title}\"", file=output_file)
                print(f"type: {post_type}", file=output_file)
                print(f"id: {post_id}", file=output_file)
                print(f"date: {post_timestamp}", file=output_file)
                print(f"day: {date_string}", file=output_file)
                if tags:
                    if len(tags) > 0:
                        print(f"tags:", file=output_file)
                        for tag in tags:
                            tag = tag.strip()
                            print(f"- {tag}", file=output_file)
                            grouped_tags.append(tag)
                print(f"robots: noindex\n---\n{post_content}", file=output_file)

        target_day_filename = os.path.join(target_day_folder, date_string + "-index.md")
        print('Creating day post for %s. Writing to %s' % (date_string, target_day_filename) )
        with open(target_day_filename, "w", encoding='utf8') as output_file:
            print(f"---\nlayout: senior2_day\ntitle: \"{date_string}\"", file=output_file)
            print(f"type: day", file=output_file)
            print(f"id: {date_string}", file=output_file)
            print(f"date: {date_string}", file=output_file)
            if grouped_tags:
                if len(grouped_tags) > 0:
                    print(f"tags:", file=output_file)
                    for tag in grouped_tags:
                        tag = tag.strip()
                        print(f"- {tag}", file=output_file)
            print(f"robots: noindex\n---\n", file=output_file)
