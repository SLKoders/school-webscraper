"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function WebScraper({
  params, 
}: {
  params: Promise<Params>;
}) {
  const router = useRouter();

  const { id } = use(params);

  const [articles, setArticles] = useState<Article[]>([]);
  const [question, setQuestion] = useState<Question>();

  async function loadQuestion() {
    const response = await api.get(`webscraper/get-articles/${id}`);
    setArticles(response.data.articles);
    setQuestion(response.data.question);
  }

  useEffect(() => {
    loadQuestion();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="self-end mr-10">
        <Card>
          <CardTitle>{ question?.question }</CardTitle>
        </Card>
      </div>
      <div className="self-start ml-10">
        {articles.map((article, index) => (
          <Card key={index} className="w-150 p-5 mb-5">
            <CardTitle>{article.text}</CardTitle>
            <CardDescription>{article.url}</CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}