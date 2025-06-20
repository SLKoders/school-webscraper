"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import Footer from "@/components/ui/footer";
import { User, Code, BrainCircuit } from "lucide-react";
import router from "next/router";

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b">
  {/* Header */}

  {/* About Hero Section */}
  <section className="container py-12 md:py-24">
    <div className="flex flex-col items-center text-center gap-6">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        За EduScraperBG
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        Нашата мисия е да революционираме начина, по който българските ученици достъпват и разбират учебните материали.
      </p>
    </div>
  </section>

  {/* Our Story Section */}
  <section className="container py-12">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Нашата история</h2>
      <div className="space-y-6 text-center">
        <p>
          EduScraperBG е създаден през 2025 г. от екип от български ученици в НПГ по КТС гр. Правец, обединени от общата цел да направят обучението по-достъпно и разбираемо за всички ученици.
        </p>
        <p>
          Разочаровани от сложния език и разпиляната информация в много учебници, решихме да създадем решение, което автоматично събира, анализира и опростява учебното съдържание.
        </p>
        <p>
          Днес нашата платформа помага на хиляди български ученици да разберат по-добре учебните материали и да подобрят своите резултати.
        </p>
      </div>
    </div>
  </section>

  {/* Team Section */}
  <section className="container py-12">
    <h2 className="text-3xl font-bold text-center mb-12">Екипът</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <Card>
        <CardHeader>
          <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <User className="text-black" />
          </div>
          <CardTitle>Педагози</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Опитни учители и методисти, които гарантират качеството и точността на учебните материали.
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Code className="text-black" />
          </div>
          <CardTitle>Разработчици</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Програмисти, които изграждат и поддържат платформата, гарантирайки плавно и безпроблемно изживяване.
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <BrainCircuit className="text-black" />
          </div>
          <CardTitle>AI Специалисти</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Експерти в изкуствения интелект, които обучават моделите за обработка на естествен език специално за учебни цели.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  </section>

  {/* Values Section */}
  <section className="container py-12">
    <h2 className="text-3xl font-bold text-center mb-12">Нашите ценности</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Достъпност</h3>
        <p className="text-muted-foreground">
          Вярваме, че качественото образование трябва да е достъпно за всеки ученик, независимо от неговия социален статус или местоживеене.
        </p>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Качество</h3>
        <p className="text-muted-foreground">
          Поддържаме високи стандарти за точност и достоверност на всички материали в платформата.
        </p>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Иновация</h3>
        <p className="text-muted-foreground">
          Постоянно търсим нови начини да подобрим изживяването на потребителите с помощта на технологиите.
        </p>
      </div>
    </div>
  </section>

  {/* CTA Section */}
  <section className="py-16">
    <div className="container text-center text-white">
      <h2 className="text-3xl font-bold mb-4">Искате да научите повече?</h2>
      <p className="max-w-2xl mx-auto mb-8">
        Свържете се с нашия екип за повече информация или сътрудничество.
      </p>
    </div>
  </section>

  {/* Footer */}
  <Footer></Footer>
</div>
    );
}