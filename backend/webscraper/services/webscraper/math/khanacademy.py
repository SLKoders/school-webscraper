from typing import List
from ..base import BaseWebscraper
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class KhanAcademyWebscraper(BaseWebscraper):
    def __init__(self, driver):
        self.driver = driver
        
    def collect_links(self, query: str) -> List[str]:
        self.driver.get('https://bg.khanacademy.org/')
        
        search = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@id=':ra:']"))
        )
        search.send_keys(query)
        
        articles = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located((By.XPATH, "//a[@class='gs-title']")))
        links = [article.get_attribute('href') for article in articles]
        
        return [link for link in links if link is not None]
        
    def extract_page(self, link: str) -> str:
        self.driver.get(link)
        
        # return self.driver.find_element(By.XPATH, "//article").text
        article = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.XPATH, "//div[@class='perseus-renderer perseus-renderer-responsive']")))
        return str(article.get_attribute("textContent"))