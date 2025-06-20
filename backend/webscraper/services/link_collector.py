import os
from typing import List
from dotenv import load_dotenv
import requests

class LinkCollector:
    def __init__(self):
        load_dotenv()
        self.API_KEY = os.environ.get('SEARCH_API_KEY')
        self.CX = os.environ.get('CX')
        
        
    def collect_links(self, query) -> List[str]:
        params = {
            "q": query,          # Search query
            "key": self.API_KEY,       # Your API key
            "cx": self.CX            # Number of results (optional)
        }

        response = requests.get('https://customsearch.googleapis.com/customsearch/v1', params=params)
        
        return [result['link'] for result in response.json()['items']]