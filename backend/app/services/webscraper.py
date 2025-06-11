from selenium import webdriver
from selenium.webdriver.common.by import By
from typing import List

class Webscraper:
    
    def __init__(self):
        self.driver = webdriver.Chrome()
        
    def search(self, query: str) ->  List[str]:
        links = []
        self.driver.get(f'https://kaksepishe.com/?s={query}&type=title')
        
        if '?s=' in self.driver.current_url:
            articles = self.driver.find_elements(By.TAG_NAME, 'article')
            
            for article in articles:
                link = article.find_element(By.TAG_NAME, 'a').get_attribute('href')
                links.append(link)
        else:
            links.append(self.driver.current_url)
            
        return links
