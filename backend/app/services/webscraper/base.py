from selenium import webdriver
from selenium.webdriver.common.by import By
from typing import List, Dict

from abc import ABC, abstractmethod

class BaseWebscraper(ABC):
    
    def __init__(self):
        self.driver = webdriver.Chrome()
    
    @abstractmethod
    def collect_links(self, query: str) -> List[str]:
        """searches for articles

        Args:
            query (str): user input

        Returns:
            List[str]: list of links
        """
    
    @abstractmethod
    def extract_page(self, link: str) -> str:
        """extracts raw data from page

        Args:
            link (str): link to page

        Returns:
            str: raw data
        """

    def search(self, query: str) -> Dict[str, str]:
        return {link: self.extract_page(link) for link in self.collect_links(query)}