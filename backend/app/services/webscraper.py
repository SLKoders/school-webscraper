from selenium import webdriver
from selenium.webdriver.common.by import By
from typing import List, Dict

class Webscraper:
    
    def __init__(self):
        self.driver = webdriver.Chrome()
        
    def search(self, query: str):
        links = []
        self.driver.get(f'https://kaksepishe.com/?s={query}&type=title')
        
        if '?s=' in self.driver.current_url:
            articles = self.driver.find_elements(By.TAG_NAME, 'article')
            
            for article in articles:
                link = article.find_element(By.TAG_NAME, 'a').get_attribute('href')
                links.append(link)
        else:
            links.append(self.driver.current_url)
            
        return self.get_data_from_links(links)
    
    def extract_page(self, link: str) -> str:
        self.driver.get(link)
        return '\n'.join([p.text for p in self.driver.find_elements(By.XPATH, '//article/div/p')])

    def get_data_from_links(self, links: List[str]) -> Dict[str, str]:
        data = {}
        
        for link in links:
            page = self.extract_page(link)
            data[link] = page
            
        return data