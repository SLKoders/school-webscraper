"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import QuestionPanel from '@/components/ui/question-panel';
import api from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";

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
    <div>
      <QuestionPanel></QuestionPanel>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="self-end mr-100">
          <Card className="p-5">
            <CardTitle>{ question?.question }</CardTitle>
          </Card>
        </div>
        <div className="self-start ml-100">
          {articles.map((article, index) => (
            <Card key={index} className="w-150 p-5 mb-5">
              <ReactMarkdown>{article.text}</ReactMarkdown>
              <CardDescription><Link href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</Link></CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}