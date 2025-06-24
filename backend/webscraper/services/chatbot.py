import os
from dotenv import load_dotenv
import google.generativeai as genai

class ChatBot:
    CATEGORIES = {
        "bg": "Български език",
        "math": "Математика"
    }
    
    def __init__(self):
        load_dotenv()
        API_KEY = os.environ.get('GEMINI_API_KEY')
        
        genai.configure(api_key=API_KEY) # type: ignore
        self.model = genai.GenerativeModel('gemini-2.0-flash') # type: ignore
        
    def process_data(self, user_input: str, category: str, data: str) -> str:
        prompt = f"Прочети текста. Ако той отговаря на темата и катеогрията, опрости го, така че да е лесно разбираем за ученик. Не обяснявай дали е свързан с темата или категорията, не добавяй въвеждащи фрази, само върни опростеното обяснение форматирано с Markdown. Използвай удебелен шрифт (bold) за акцентиране, водещи точки за списъци (bullet points) и заглавия (headings). \n📌 Ако текстът **не отговаря** на темата или категорията, просто напиши:  \n❌ Текстът не съдържа информация по тази тема. \n🔎 **Тема:** {user_input} \n **Категория:** {ChatBot.CATEGORIES[category]} \n📄 **Текст:**  {data}"
        
        return self.model.generate_content(prompt + data).text
    
    def generate_text(self, user_input: str, category: str) -> str:
        prompt = f"Генерирай текст по темата \"{user_input}\" в категория \"{self.CATEGORIES[category]}\", опрости го, така че да е лесно разбираем за ученик. Не добавяй въвеждащи фрази, само върни опростеното обяснение форматирано с Markdown. Използвай удебелен шрифт (bold) за акцентиране, водещи точки за списъци (bullet points) и заглавия (headings)."
        return self.model.generate_content(prompt).text