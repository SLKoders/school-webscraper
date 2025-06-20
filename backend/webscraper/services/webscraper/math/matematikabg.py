from typing import List
from ..base import BaseWebscraper
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class MatematikaBGWebscraper(BaseWebscraper):
    def __init__(self, driver):
        self.driver = driver
        
    def collect_links(self, query: str) -> List[str]:
        self.driver.get(f'https://www.matematika.bg/search.html?q={query}')
        
        # elements = self.driver.find_elements(By.XPATH, "//a[@class='gs-title']")
        elements = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located((By.XPATH, "//a[@class='gs-title']")))
        links = [element.get_attribute('href') for element in elements]
        
        
        return [link for link in links if link is not None and ('geometry' in link or 'algebra' in link)]
        
    def extract_page(self, link: str) -> str:
        self.driver.get(link)
        
        # return self.driver.find_element(By.XPATH, "//article").text
        article = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.XPATH, "//article")))
        return str(article.get_attribute("textContent"))