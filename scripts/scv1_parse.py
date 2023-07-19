import os
import os.path
from bs4 import BeautifulSoup

source_folder = "../features/citizen/v1/"

issues_output_folder = "../_scv1_issues/"
articles_output_folder = "../_scv1_articles/"

for issue_number in range(11,26):
    issue_path = os.path.join(source_folder, str(issue_number) + ".html")
    raw_html = open(issue_path, "r").read()
    (blank, header, html) = raw_html.split("---\n")
    issue_page = "---\n" + header + "---\n"
    output_issue_path = os.path.join(issues_output_folder, str(issue_number) + ".html")
    issue_body = BeautifulSoup(html, "html.parser")
    editorial = issue_body.find("article", class_="editorial")
    if editorial:
        for editorial_child in editorial.children:
            issue_page += str(editorial_child).strip()
    articles = issue_body.find_all("article")
    for article in articles:
        if article.has_attr("class") and "editorial" in article["class"]:
            continue
        id_tag = article.find("a")
        article_id = id_tag["name"]
        headline = article.find("h2")
        article_header = "---\n" + "id: " + article_id + "\n" + "title: \"" + headline.text + "\"\n" + "issue: " + str(issue_number) + "\n---\n"
        article_path = os.path.join(articles_output_folder, article_id + ".html")
        article_page = article_header
        for child in article.children:
            if child.name == "h2" or child.name == "a":
                continue
            article_page += str(child).strip()
        open(article_path, "w", encoding="utf-8").write(article_page)
    open(output_issue_path, "w", encoding="utf-8").write(issue_page)
