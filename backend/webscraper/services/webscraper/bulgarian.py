from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from typing import List

from .base import BaseWebscraper

class BulgarianWebscraper(BaseWebscraper):
    
    def __init__(self):
        super().__init__()
        
    def collect_links(self, query: str) -> List[str]:
        links = []
        self.driver.get(f'https://kaksepishe.com/?s={query}&type=title')
        
        if '?s=' in self.driver.current_url:
            articles = WebDriverWait(self.driver, 7).until(
                EC.presence_of_all_elements_located((By.TAG_NAME, 'article'))
            )
            
            links = [WebDriverWait(article, 7).until(EC.presence_of_element_located((By.TAG_NAME, 'a'))).get_attribute('href') for article in articles]
        else:
            links.append(self.driver.current_url)
            
        return [link for link in links if link is not None]
    
    def extract_page(self, link: str) -> str:
        self.driver.get(link)
        
        # return self.driver.find_element(By.XPATH, "//article").text
        article = WebDriverWait(self.driver, 7).until(EC.presence_of_element_located((By.XPATH, "//article")))
        return str(article.get_attribute("textContent"))