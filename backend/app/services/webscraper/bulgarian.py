from app.services.webscraper.base import BaseWebscraper
from selenium.webdriver.common.by import By
from typing import List, Dict

class BulgarianWebscraper(BaseWebscraper):
    
    def __init__(self):
        super().__init__()
        
    def collect_links(self, query: str) -> List[str]:
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
    
    def extract_page(self, link: str) -> str:
        self.driver.get(link)
        xpath_expression = """
        //article/div//*[self::p or self::ol or self::ul or self::li 
                        or self::strong or self::em or self::b or self::i
                        or self::h1 or self::h2 or self::h3 or self::h4 
                        or self::h5 or self::h6 or self::blockquote
                        or self::span or self::a][normalize-space(text())]
        """
        return '\n'.join([p.text for p in self.driver.find_elements(By.XPATH, xpath_expression)])