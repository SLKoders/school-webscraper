from typing import List
from webscraper.services.webscraper.math.khanacademy import KhanAcademyWebscraper
from webscraper.services.webscraper.base import BaseWebscraper
from webscraper.services.webscraper.math.matematikabg import MatematikaBGWebscraper


class MathWebscraper(BaseWebscraper):
    def __init__(self):
        super().__init__()
        self.website_scrapers = {
            'www.matematika.bg': MatematikaBGWebscraper(self.driver),
            'bg.khanacademy.org': KhanAcademyWebscraper(self.driver)
        }
        
    def collect_links(self, query: str) -> List[str]:
        # return self.link_collector.collect_links(query)
        links = []
        for website, webscraper in self.website_scrapers.items():
            links.extend(webscraper.collect_links(query))
            
        return links
        
    def extract_page(self, link: str) -> str:
        print(link.split('/'))
        webscraper = self.website_scrapers.get(link.split('/')[2])
        
        if webscraper is None:
            return ''
        
        return webscraper.extract_page(link)