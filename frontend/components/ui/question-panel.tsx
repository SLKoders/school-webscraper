import api from "@/lib/api";
import router from "next/router";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Card, CardTitle, CardDescription } from "./card";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/utils";

export default function QuestionPanel() {
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>([])

    async function loadQuestions() {
      const response = await api.get("webscraper/get-questions")

      setQuestions(response.data);
    }

    

    useEffect(() => {
      loadQuestions();
    }, []);
    return (
        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 h-[80vh] overflow-y-auto flex flex-col space-y-4 p-4">
          <Button className="w-30" onClick={() => router.push(`/webscraper/`)}>
            Нов въпрос
          </Button>
          {questions.map((question, index) => (
            <Card key={index} className="p-3 w-60 max-w-[240px]"> {/* Fixed width */}
              <CardTitle className="w-full"> {/* Ensure full width */}
                <Button 
                  variant="ghost" 
                  className="w-full max-w-full text-left justify-start" 
                  onClick={() => router.push(`/webscraper/${question.id}/`)}
                >
                  <span className="truncate block w-full">{question.question}</span>
                </Button>
              </CardTitle>
              <CardDescription>{formatDateTime(new Date(question.created_at))}</CardDescription>
            </Card>
          ))}
        </div>
    )
}