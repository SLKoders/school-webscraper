from selenium.webdriver.common.by import By
from typing import List

from .base import BaseWebscraper

class BulgarianWebscraper(BaseWebscraper):
    
    def __init__(self):
        super().__init__()
        
    def collect_links(self, query: str) -> List[str]:
        links = []
        self.driver.get(f'https://kaksepishe.com/?s={query}&type=title')
        
        if '?s=' in self.driver.current_url:
            articles = self.driver.find_elements(By.TAG_NAME, 'article')
            
            links = [article.find_element(By.TAG_NAME, 'a').get_attribute('href') for article in articles]
        else:
            links.append(self.driver.current_url)
            
        return [link for link in links if link is not None]
    
    def extract_page(self, link: str) -> str:
        self.driver.get(link)
        return self.driver.find_element(By.XPATH, '//article').text