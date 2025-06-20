import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LayoutDashboard, Search, BookOpen, BrainCircuit, Languages } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b">
      {/* Header */}

      {/* Hero Section */}
      <section className="container py-12 md:py-24">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            EduScraperBG
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Нашата платформа автоматично събира учебни материали от доверени източници,
            опростява ги и ги обяснява с помощта на AI, за да ги направи по-разбираеми за учениците.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Как работи платформата?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LayoutDashboard className="text-black" />
              </div>
              <CardTitle>Събиране на материали</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Автоматично събираме учебно съдържание от одобрени образователни сайтове на български език.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BrainCircuit className="text-black" />
              </div>
              <CardTitle>AI Обработка</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Изкуственият интелект анализира и опростява материалите, правейки ги по-лесни за разбиране.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Languages className="text-black" />
              </div>
              <CardTitle>Ученическо-приятелски език</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Трансформираме сложните термини в ясни обяснения, подходящи за ученици.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Subjects */}
      {/* <section className="container py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Популярни учебни материали</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Литература - Христо Ботев", description: "Анализ на стихотворения и творби" },
            { title: "Математика - Алгебра", description: "Уравнения и неравенства за 8. клас" },
            { title: "История - Възраждане", description: "Ключови личности и събития" },
            { title: "Биология - Човешкото тяло", description: "Анатомия и физиология" },
            { title: "Химия - Периодична таблица", description: "Елементи и химични свойства" },
            { title: "География - България", description: "Релеф, климат и икономика" },
          ].map((subject, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{subject.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{subject.description}</CardDescription>
                <Button variant="link" className="mt-4 px-0 text-blue-600">
                  Виж материала →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Готови ли сте да опитате?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            Регистрирайте се сега и получете достъп до всички функции на платформата.
          </p>
          <Button variant="secondary" size="lg">
            Започнете безплатно
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">EduScraperBG</h3>
            <p className="text-sm text-muted-foreground">
              Интелигентна помощ за българските ученици.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Предмети</h3>
            <ul className="space-y-2 text-sm">
              <li><a className="text-muted-foreground hover:text-foreground">Български език</a></li>
              {/* <li><a href="#" className="text-muted-foreground hover:text-foreground">Математика</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">История</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">География</a></li> */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Ресурси</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Документация</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">zhelezov.krasimir@gmail.com</li>
              <li className="text-muted-foreground">+359 89 561 6921</li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 EduScraperBG. Всички права запазени.</p>
        </div>
      </footer>
    </div>
  );
}