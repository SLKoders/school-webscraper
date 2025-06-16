# 📚 School Web Scraper

A Python-based tool that scrapes educational content in Bulgarian from trusted websites, then uses AI to simplify and explain it in student-friendly language.

## ✨ Features

- 🔍 **Smart Search**: Enter a subject or theme (e.g., _„минало свършено време“_) and the scraper will find relevant articles.
- 📄 **Content Extraction**: Extracts clean article text from matching results.
- 🤖 **AI-Powered Simplification**: Uses Gemini to rewrite the content clearly, **without adding or changing facts**.
- 🇧🇬 **Supports Only Bulgarian**.

## 🧠 How It Works

1. **User input**: You type a school-related topic or theme.
2. **Search**: The scraper sends a search request to trusted websites.
3. **Extraction**: Article contents are scraped and stored.
4. **AI Processing**: If an article contains useful info, the AI returns a simplified explanation.

## ⚙️ Technologies Used

- **Python 3.11.2**
- `Django`
- `Gemini API`
---
- **React**
- `shadcn/ui`