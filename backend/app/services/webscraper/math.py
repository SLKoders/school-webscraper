from typing import List
from app.services.webscraper.base import BaseWebscraper
from selenium.webdriver.common.by import By

class MathWebscraper(BaseWebscraper):
    def __init__(self):
        super().__init__()
        
    def collect_links(self, query: str) -> List[str]:
        self.driver.get(f'https://www.matematika.bg/search.html?q={query}')
        
        elements = self.driver.find_elements(By.XPATH, "//a[@class='gs-title']")
        links = [element.get_attribute('href') for element in elements]
        
        
        return [link for link in links if link is not None and isinstance(link, str) and ('geometry' in link or 'algebra' in link)]
        
    def extract_page(self, link: str) -> str:
        self.driver.get(link)
        
        return self.driver.find_element(By.XPATH, "//article").text