import os
import os.path
import re
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

source_folder = "../features/citizen/v1/src/"

issues_output_folder = "../_scv1_issues/"
articles_output_folder = "../_sc_articles/v1/"

for issue_number in range(0,26):
    # The filename is in the format 1.html, 2.html, etc.
    issue_path = os.path.join(source_folder, str(issue_number) + ".html")
    raw_html = open(issue_path, "r").read()                     # Read whole file
    (blank, header, html) = raw_html.split("---\n")             # Split into header and body
    # Replace the template in the header with the updated template
    header = header.replace("layout: citizen_v1\n", "layout: citizen_v1_2\n")
    # Look for date in the header
    date_string = re.search("date: (.*)\n", header).group(1)
    if date_string:
        date_string = date_string.strip()
        issue_date = datetime.strptime(date_string, "%Y-%m-%d")
    else:
        issue_date = None
    # Set up the issue page as version 1, and import existing header details
    issue_page = "---\nversion: 1\n" + header
    output_issue_path = os.path.join(issues_output_folder, str(issue_number) + ".html")
    issue_body = BeautifulSoup(html, "html.parser")
    # Look for the editorial
    editorial = issue_body.find("article", class_="editorial")
    if editorial:
        # Look for any cover image and ALT text
        cover_image = editorial.find("img")
        if cover_image:
            cover_image_path = cover_image["src"]
            cover_image_text = cover_image["alt"]
            if cover_image_path:
                issue_page += "cover_image: \"" + cover_image_path + "\"\n"
            if cover_image_text:
                issue_page += "cover_image_text: \"" + cover_image_text + "\"\n"
        issue_page += "---\n"   # End of the header
        for editorial_child in editorial.children:
            issue_page += str(editorial_child).strip()
    else:
        issue_page += "---\n"   # End of the header
    # Now start extracting all the articles
    articles = issue_body.find_all("article")
    for article in articles:
        # Skip the editorial
        if article.has_attr("class") and "editorial" in article["class"]:
            continue
        id_tag = article.find("a")          # Extract ID of the article
        article_id = id_tag["name"]
        headline = article.find("h2")       # Extract headline of the article
        article_header = "---\nversion: 1\n" + "id: " + article_id + "\narticle_id: " + article_id + "\n" + "title: \"" + headline.text + "\"\n" + "issue: " + str(issue_number)
        if issue_date:          # Add issue date if we have it
            article_header += "\n" + "date: " + issue_date.strftime("%Y-%m-%d %H:%M:%S")
            issue_date = issue_date + timedelta(minutes=1)      # Increment the date by 1 minute. (This so we can sort the order of articles)
        article_header += "\n---\n"
        article_path = os.path.join(articles_output_folder, article_id + ".html")   # Save the article to a file
        article_page = article_header
        for child in article.children:
            if child.name == "h2" or child.name == "a":                     # Skip the headline and ID
                continue
            article_page += str(child).strip()                              # Add the rest of the article
        open(article_path, "w", encoding="utf-8").write(article_page)       # Save the article to a file
    open(output_issue_path, "w", encoding="utf-8").write(issue_page)        # Save the issue to a file
