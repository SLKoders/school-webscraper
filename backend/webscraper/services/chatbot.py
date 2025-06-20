import os
from dotenv import load_dotenv
import google.generativeai as genai

class ChatBot:
    
    def __init__(self):
        load_dotenv()
        API_KEY = os.environ.get('GEMINI_API_KEY')
        
        genai.configure(api_key=API_KEY) # type: ignore
        self.model = genai.GenerativeModel('gemini-2.0-flash') # type: ignore
        
    def process_data(self, user_input: str, data: str) -> str:
        prompt = f"Прочети текста. Ако той отговаря на темата, опрости го, така че да е лесно разбираем за ученик. Не обяснявай дали е свързан с темата, не добавяй въвеждащи фрази, само върни опростеното обяснение форматирано с Markdown. Използвай удебелен шрифт (bold) за акцентиране, водещи точки за списъци (bullet points) и заглавия (headings). \n📌 Ако текстът **не отговаря** на темата, просто напиши:  \n❌ Текстът не съдържа информация по тази тема. \n🔎 **Тема:** {user_input} \n📄 **Текст:**  {data}"
        
        return self.model.generate_content(prompt + data).text