import api from "@/lib/api";
import router from "next/router";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Card, CardTitle, CardDescription } from "./card";
import { useRouter } from "next/navigation";

export default function QuestionPanel() {
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>([])

    async function loadQuestions() {
      const response = await api.get("webscraper/get-questions")

      setQuestions(response.data);
    }

    function formatDateTime(date: Date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        }).format(date);
    }

    useEffect(() => {
      loadQuestions();
    }, []);
    return (
        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 h-[80vh] overflow-y-auto flex flex-col space-y-4 p-4">
          <Button className="w-1/2" onClick={() => router.push(`/webscraper/`)}>New Question</Button>
          {questions.map((question, index) => (
            <Card key={index} className="p-3 w-60">
              <CardTitle><Button variant="ghost" onClick={() => router.push(`/webscraper/${question.id}/`)}>{question.question}</Button></CardTitle>
              <CardDescription>{formatDateTime(new Date(question.created_at))}</CardDescription>
            </Card>
          ))}
        </div>
    )
}