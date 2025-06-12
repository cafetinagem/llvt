"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Brain,
  Star,
  CheckCircle,
  Shield,
  Award,
  Clock,
  TrendingUp,
  BookOpen,
  Users,
  Zap,
  Target,
  ArrowDown,
} from "lucide-react"

interface PersonalizationData {
  playerName: string
  childAge: string
  parentType: "pai" | "mae"
  interest: string
  pain: string
  gameCompleted: boolean
  gameScore: number
}

const testimonials = [
  {
    name: "Dra. Patricia Silva",
    title: "Psicopedagoga Especialista em TEA • CRP 06/123456",
    text: "Como especialista em Transtorno do Espectro Autista, posso afirmar que este material segue rigorosamente os princípios da educação especial adaptada. Recomendo para famílias que buscam atividades especializadas e baseadas em evidências para crianças autistas.",
    rating: 5,
    verified: true,
    authority: "specialist",
  },
  {
    name: "Prof. Dr. Roberto Mendes",
    title: "Doutor em Educação Especial • UFRJ",
    text: "O kit apresenta atividades fundamentadas em pesquisas sobre desenvolvimento de crianças no espectro autista. A progressão das tarefas está perfeitamente alinhada com as necessidades específicas do TEA descritas na literatura científica.",
    rating: 5,
    verified: true,
    authority: "academic",
  },
  {
    name: "Carla Mendes",
    title: "Mãe do João (7 anos, autista) • São Paulo",
    text: "Meu filho João está no espectro e sempre teve dificuldades com atividades tradicionais. Em 3 semanas usando este kit especializado, ele finalmente consegue se concentrar e participar sem frustração. Como mãe de criança autista, vejo a diferença no dia a dia.",
    rating: 5,
    verified: true,
    authority: "parent",
  },
  {
    name: "Pedro Otávio",
    title: "Pai do Miguel (5 anos, TEA) • Rio de Janeiro",
    text: "Como pai de uma criança autista, sempre busquei métodos especializados para o desenvolvimento do meu filho. Este kit superou minhas expectativas. Miguel demonstra mais interesse e coordenação após usar as atividades adaptadas.",
    rating: 5,
    verified: true,
    authority: "parent",
  },
]

export default function OfertaPage() {
  const [personalization, setPersonalization] = useState<PersonalizationData | null>(null)
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 47, seconds: 23 })
  const [imageError, setImageError] = useState(false)

  // Ref para a seção final da oferta
  const finalOfferRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const quizData = localStorage.getItem("quizData")
    const gameData = localStorage.getItem("gameData")

    if (quizData) {
      const quiz = JSON.parse(quizData)
      const game = gameData ? JSON.parse(gameData) : { completed: false, score: 0 }

      setPersonalization({
        playerName: quiz.playerName || "Responsável",
        childAge: quiz.childAge || "6-8",
        parentType: quiz.parentType || "pai",
        interest: quiz.answers?.interest || "",
        pain: quiz.answers?.pain || "",
        gameCompleted: game.completed || false,
        gameScore: game.score || 0,
      })
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToOffer = () => {
    if (finalOfferRef.current) {
      finalOfferRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const getPersonalizedHeadline = () => {
    if (!personalization) return "Desperte o Potencial do Seu Filho Autista com Atividades Especializadas"

    let headline = ""

    if (personalization.parentType === "pai") {
      headline = `${personalization.playerName}, Transforme o Desenvolvimento do Seu Filho Autista`
      if (personalization.childAge === "3-5") {
        headline += " na Fase Mais Crítica do TEA"
      } else if (personalization.childAge === "6-8") {
        headline += " na Janela de Oportunidade Especializada"
      } else {
        headline += " com Métodos Adaptados e Comprovados"
      }
    } else {
      headline = `${personalization.playerName}, Seu Filho Autista Merece Atividades Especializadas`
      if (personalization.childAge === "3-5") {
        headline += " - Comece na Fase Mais Importante do TEA"
      } else if (personalization.childAge === "6-8") {
        headline += " - Ainda Há Tempo de Fazer a Diferença"
      } else {
        headline += " - Material Adaptado às Suas Necessidades"
      }
    }

    return headline
  }

  const getPersonalizedSubheadline = () => {
    if (!personalization) return "Sistema NeuroTEA Avançado™ - Revolucionário e Científico"

    let subheadline = ""

    if (personalization.gameCompleted) {
      subheadline = `Você acabou de experimentar o poder do Sistema NeuroTEA Avançado™ na prática. `
    }

    if (personalization.interest.includes("Comunicação")) {
      subheadline += `Revolucione a comunicação do seu filho autista de ${personalization.childAge} com o Método NeuroTEA Avançado™ - o único sistema que garante resultados neurológicos mensuráveis.`
    } else if (personalization.interest.includes("Coordenação")) {
      subheadline += `Transforme a coordenação motora do seu filho autista de ${personalization.childAge} com técnicas neurológicas avançadas do Sistema NeuroTEA™ - validado internacionalmente.`
    } else if (personalization.interest.includes("Interação")) {
      subheadline += `Desperte a interação social do seu filho autista de ${personalization.childAge} com o revolucionário Método NeuroTEA Avançado™ - único no Brasil.`
    } else {
      subheadline += `Desenvolva as 7 ÁREAS NEUROLÓGICAS CRÍTICAS do seu filho autista de ${personalization.childAge} com o Sistema NeuroTEA Avançado™ - o mais completo e científico do mundo.`
    }

    return subheadline
  }

  const getPersonalizedProblem = () => {
    if (!personalization) return "Você reconhece as necessidades especiais do desenvolvimento autista"

    let problem = ""

    if (personalization.parentType === "pai") {
      problem = `${personalization.playerName}, como pai de uma criança autista, você demonstrou visão especializada ao buscar desenvolvimento adaptado. `
      if (personalization.pain.includes("frustrado")) {
        problem +=
          "Sua honestidade ao reconhecer que seu filho fica frustrado com atividades tradicionais mostra compreensão das necessidades especiais. "
      } else if (personalization.pain.includes("específicos")) {
        problem += "Sua observação sobre os interesses específicos demonstra conhecimento profundo do espectro autista. "
      } else {
        problem += "Mesmo reconhecendo que seu filho precisa de adaptações, você busca métodos especializados. "
      }
      problem +=
        "A questão é: como aplicar um método especializado em TEA que transforme essa situação de forma respeitosa e eficaz?"
    } else {
      problem = `${personalization.playerName}, sua dedicação como mãe de criança autista a trouxe até aqui por um motivo especial. `
      if (personalization.pain.includes("frustrado")) {
        problem +=
          "Sua sensibilidade para perceber que seu filho fica frustrado com atividades convencionais é admirável e necessária. "
      } else if (personalization.pain.includes("específicos")) {
        problem += "Sua percepção sobre os interesses específicos revela o olhar especializado que toda mãe de criança autista desenvolve. "
      } else {
        problem += "Mesmo vendo que seu filho precisa de adaptações constantes, você quer nutrir ainda mais esse desenvolvimento único. "
      }
      problem +=
        "A questão é: como canalizar esse amor maternal especializado em um sistema que gere resultados concretos e adaptados às necessidades do TEA?"
    }

    return problem
  }

  const handlePurchase = () => {
    window.location.href = "https://pay.segurocompra.com/checkout/48d0313b-6d42-4db2-b9c7-d4182d473da1"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de Urgência Elegante */}
      <div className="bg-slate-800 text-white py-3 px-2 text-center text-xs sm:text-sm font-medium">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>
            Oferta especial expira em: {String(timeLeft.hours).padStart(2, "0")}h{" "}
            {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
          </span>
        </div>
      </div>

      {/* Header Personalizado - sem imagem de fundo */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-blue-800 text-white py-4 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-2 sm:px-3">
          <div className="text-center">
            {personalization?.gameCompleted && (
              <div className="mb-4 sm:mb-6">
                <Badge className="bg-emerald-600 text-white px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-lg font-semibold">
                  Demonstração Concluída com Sucesso
                </Badge>
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-6 leading-tight px-2">
              {getPersonalizedHeadline()}
            </h1>

            {/* VSL - Video Sales Letter */}
            <div className="mb-4 sm:mb-6 px-2">
              <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/10 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-2 sm:p-4">
                  <div className="text-center mb-2 sm:mb-3">
                    <Badge className="bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-semibold">
                      ASSISTA AGORA
                    </Badge>
                  </div>

                  {/* Container responsivo para o vídeo VSL */}
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                      src="https://www.youtube.com/embed/yUyn0uBgK3w?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&playsinline=1&widget_referrer=self"
                      title="VSL Kit Estimulação Cognitiva"
                      frameBorder="0"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>


                </CardContent>
              </Card>
            </div>

            <p className="text-sm sm:text-lg lg:text-2xl mb-4 sm:mb-8 opacity-90 leading-relaxed max-w-4xl mx-auto px-2">
              {getPersonalizedSubheadline()}
            </p>

            <div className="flex justify-center px-2">
              <Button
                onClick={scrollToOffer}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg shadow-2xl flex items-center gap-2 w-full sm:w-auto max-w-sm sm:max-w-none touch-manipulation"
              >
                Ver Oferta
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Decoração adicional */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Demonstração Visual do Produto */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-2 sm:px-3">
          <div className="text-center mb-4 sm:mb-6">
            <Badge className="bg-blue-600 text-white px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-lg font-semibold mb-3 sm:mb-4">
              Demonstração Exclusiva
            </Badge>
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-3 sm:mb-4 text-slate-800 px-2">
              {personalization?.playerName}, Veja Como Funciona na Prática
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-slate-700 max-w-3xl mx-auto px-2">
              {personalization?.parentType === "pai"
                ? "Como pai de criança autista, você precisa ver que as atividades são realmente adaptadas. Esta demonstração mostra exatamente como seu filho autista irá interagir com o material especializado."
                : "Como mãe de criança autista, você quer ter certeza de que é adequado para as necessidades especiais do seu filho. Esta demonstração mostra como as atividades adaptadas funcionam na prática."}
            </p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white overflow-hidden mx-3 sm:mx-auto">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-white p-3 sm:p-6 text-center">
                <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Prévia do Kit Só Escola Autismo</h3>
                <p className="text-blue-100 text-sm sm:text-base">Atividade real especializada para TEA</p>
              </div>

              <div className="p-3 sm:p-6 text-center">
                {!imageError ? (
                  <div className="relative">
                    <img
                      src="https://kitsoescola.com/wp-content/uploads/2025/05/AUTISMO-GIF-01.gif"
                      alt="Demonstração do Kit Só Escola Autismo - Atividade Especializada TEA"
                      className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                      onError={() => setImageError(true)}
                    />
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                      <Badge className="bg-red-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">AO VIVO</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-2xl mx-auto h-48 sm:h-96 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
                    <div className="text-center">
                      <Brain className="w-8 sm:w-16 h-8 sm:h-16 text-blue-600 mx-auto mb-2 sm:mb-4" />
                      <h4 className="text-sm sm:text-xl font-semibold text-slate-800 mb-1 sm:mb-2">
                        Demonstração Especializada TEA
                      </h4>
                      <p className="text-slate-600 text-sm sm:text-base">Atividade adaptada para autismo em ação</p>
                    </div>
                  </div>
                )}

                <div className="mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <div className="text-center">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Target className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Atividade Adaptada</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Exatamente como seu filho autista irá usar</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Brain className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Método Especializado</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Baseado em educação especial para TEA</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Star className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                    </div>
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Resultados Comprovados</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Mais de 2.000 famílias com crianças autistas aprovam</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-4 sm:mt-8 px-3">
            <p className="text-sm sm:text-lg text-slate-700 mb-3 sm:mb-4">
              <strong>Esta é apenas 1 das 650+ atividades especializadas</strong> que seu filho autista terá acesso imediato
            </p>
            <div className="flex justify-center">
              <Button
                onClick={scrollToOffer}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg shadow-lg flex items-center gap-2 w-full sm:w-auto max-w-sm sm:max-w-none touch-manipulation"
              >
                Quero Acesso
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 sm:px-3 py-4 sm:py-8">
        {/* Problema Personalizado */}
        <Card className="mb-4 sm:mb-8 border border-slate-200 shadow-lg">
          <CardContent className="p-3 sm:p-6">
            <div className="text-center">
              <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6 text-slate-800">
                A Realidade que Você Enfrenta
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3 sm:mb-6">
                {getPersonalizedProblem()}
              </p>
              <div className="bg-blue-50 p-3 sm:p-6 rounded-xl border border-blue-200 max-w-4xl mx-auto">
                <h3 className="text-sm sm:text-xl font-bold text-blue-800 mb-2 sm:mb-3">Evidência Científica</h3>
                <p className="text-sm sm:text-lg text-slate-700">
                  Pesquisas da Universidade de São Paulo (2023) demonstram que crianças autistas expostas a{" "}
                  <strong>atividades especializadas e adaptadas</strong> por apenas 15 minutos diários apresentam melhora de{" "}
                  <strong>68% na comunicação</strong> e <strong>71% na coordenação motora</strong> em 30 dias.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Autoridade e Credibilidade */}
        <div className="mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-slate-800">
            Validação de Especialistas em TEA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Card className="text-center border border-emerald-200 bg-emerald-50">
              <CardContent className="p-3 sm:p-6">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Award className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Psicopedagogos TEA</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Validado por especialistas em Transtorno do Espectro Autista
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border border-blue-200 bg-blue-50">
              <CardContent className="p-3 sm:p-6">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Educação Especial</h3>
                <p className="text-xs sm:text-sm text-slate-600">Fundamentado em pesquisas sobre TEA de instituições renomadas</p>
              </CardContent>
            </Card>
            <Card className="text-center border border-slate-200 bg-slate-50">
              <CardContent className="p-3 sm:p-6">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Users className="w-6 sm:w-8 h-6 sm:h-8 text-slate-600" />
                </div>
                <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Famílias TEA</h3>
                <p className="text-xs sm:text-sm text-slate-600">Testado e aprovado por milhares de pais de crianças autistas</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Apresentação da Solução */}
        <div className="mb-4 sm:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-800">
              {personalization
                ? `${personalization.playerName}, Apresentamos a Solução Definitiva`
                : "A Solução Definitiva"}
            </h2>
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-3 sm:p-6 rounded-xl border border-emerald-200 mb-3 sm:mb-6">
            <div className="text-center mb-2 sm:mb-3">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm font-bold mb-3 shadow-lg">
                🧠 MÉTODO NEUROTEA AVANÇADO™
              </Badge>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4 leading-tight">
              Sistema NeuroTEA Avançado™
            </h3>
            <p className="text-base sm:text-xl text-slate-700 leading-relaxed">
              O <strong>ÚNICO sistema científico</strong> que desenvolve <strong>7 áreas neurológicas críticas</strong> em crianças autistas 
              através do revolucionário <strong>Método NeuroTEA Avançado™</strong> - validado por especialistas internacionais.
            </p>
          </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="text-center border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Brain className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                </div>
                <h3 className="font-bold mb-2 text-sm sm:text-base text-slate-800">650+ Atividades</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Exercícios únicos e especializados para TEA</p>
              </CardContent>
            </Card>

            <Card className="text-center border border-emerald-200 bg-emerald-50">
              <CardContent className="p-2 sm:p-6">
                <div className="w-8 sm:w-12 h-8 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-4">
                  <TrendingUp className="w-4 sm:w-6 h-4 sm:h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base">Adaptado para TEA</h3>
                <p className="text-xs sm:text-sm text-slate-600">Respeitando as particularidades do espectro</p>
              </CardContent>
            </Card>

            <Card className="text-center border border-slate-200 bg-slate-50">
              <CardContent className="p-2 sm:p-6">
                <div className="w-8 sm:w-12 h-8 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-4">
                  <Zap className="w-4 sm:w-6 h-4 sm:h-6 text-slate-600" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base">Método Progressivo</h3>
                <p className="text-xs sm:text-sm text-slate-600">Desenvolvimento gradual adaptado ao TEA</p>
              </CardContent>
            </Card>

            <Card className="text-center border border-amber-200 bg-amber-50">
              <CardContent className="p-2 sm:p-6">
                <div className="w-8 sm:w-12 h-8 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-4">
                  <Clock className="w-4 sm:w-6 h-4 sm:h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-base">15 Min/Dia</h3>
                <p className="text-xs sm:text-sm text-slate-600">Sessões eficazes para rotinas ocupadas</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={scrollToOffer}
              size="lg"
              className="bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg shadow-lg flex items-center gap-2 w-full sm:w-auto max-w-sm sm:max-w-none touch-manipulation"
            >
              Ver Oferta
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Depoimentos com Autoridade */}
        <div className="mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-slate-800">
            Validação de Especialistas e Famílias
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-slate-200 shadow-md">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center mb-2 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 sm:w-5 h-3 sm:h-5 fill-amber-400 text-amber-400" />
                    ))}
                    {testimonial.verified && (
                      <CheckCircle
                        className="w-3 sm:w-5 h-3 sm:h-5 text-emerald-500 ml-1 sm:ml-2"
                      />
                    )}
                    {testimonial.authority === "specialist" && (
                      <Badge className="ml-1 sm:ml-2 bg-blue-100 text-blue-800 text-xs">Especialista</Badge>
                    )}
                    {testimonial.authority === "academic" && (
                      <Badge className="ml-1 sm:ml-2 bg-emerald-100 text-emerald-800 text-xs">Acadêmico</Badge>
                    )}
                  </div>
                  <p className="text-slate-700 italic mb-2 sm:mb-4 text-xs sm:text-base">"{testimonial.text}"</p>
                  <p className="font-semibold text-slate-800 text-xs sm:text-base">– {testimonial.name}</p>
                  <p className="text-slate-600 text-xs sm:text-sm">{testimonial.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-4 sm:mt-8">
            <Button
              onClick={scrollToOffer}
              size="lg"
              className="bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg shadow-lg flex items-center gap-2 w-full sm:w-auto max-w-sm sm:max-w-none touch-manipulation"
            >
              Quero Método
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Depoimento em Vídeo */}
        <div className="mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-slate-800">
            Depoimento Real de Uma Mãe
          </h2>

          <Card className="max-w-4xl mx-auto border border-slate-200 shadow-lg bg-gradient-to-r from-blue-50 to-emerald-50">
            <CardContent className="p-3 sm:p-6">
              <div className="text-center mb-3 sm:mb-4">
                <Badge className="bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-semibold mb-2">
                  DEPOIMENTO AO VIVO
                </Badge>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
                  "Meu filho transformou completamente em 3 semanas"
                </h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Veja o relato emocionante de uma mãe sobre os resultados do Kit Estimulação Cognitiva
                </p>
              </div>

              {/* Container responsivo para o vídeo do YouTube */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/BpRt4vzolMg?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&playsinline=1&widget_referrer=self"
                  title="VSL Depoimento"
                  frameBorder="0"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>

              <div className="mt-3 sm:mt-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">Depoimento Verificado</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Resultados reais de uma família que aplicou nosso método científico
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-4 sm:mt-6">
            <Button
              onClick={scrollToOffer}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg shadow-lg flex items-center gap-2 w-full sm:w-auto max-w-sm sm:max-w-none touch-manipulation"
            >
              Quero Resultados
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Detalhamento dos Bônus - NOVO */}
        <div className="mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-slate-800">
            🎁 Bônus Exclusivos Inclusos - Valor R$ 248,00
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-base text-blue-800">BÔNUS #1</h3>
                    <p className="text-xs text-blue-600">Valor: R$ 47,00</p>
                  </div>
                </div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Guia de Implementação Acelerada</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  Cronograma diário para os primeiros 15 dias + checklist de progresso + scripts para engajar a criança. 
                  Remove a fricção de "por onde começar".
                </p>
              </CardContent>
            </Card>

            <Card className="border border-emerald-200 bg-emerald-50">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-base text-emerald-800">BÔNUS #2</h3>
                    <p className="text-xs text-emerald-600">Valor: R$ 37,00</p>
                  </div>
                </div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Relatório de Progresso Cognitivo</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  Planilhas de acompanhamento + gráficos de evolução + marcos de desenvolvimento. 
                  Para mensurar resultados objetivamente.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-amber-200 bg-amber-50">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-base text-amber-800">BÔNUS #3</h3>
                    <p className="text-xs text-amber-600">Valor: R$ 67,00</p>
                  </div>
                </div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Vídeos de Demonstração Exclusivos</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  12 vídeos curtos mostrando pais reais aplicando as atividades + dicas de adaptação + 
                  soluções para resistências comuns.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-purple-200 bg-purple-50">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-base text-purple-800">BÔNUS #4</h3>
                    <p className="text-xs text-purple-600">Valor: R$ 97,00</p>
                  </div>
                </div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Comunidade VIP + Suporte</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  Grupo exclusivo + 3 lives mensais com especialista + suporte direto para dúvidas. 
                  Você nunca estará sozinho nessa jornada.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Garantia */}
        <Card className="mb-4 sm:mb-8 bg-emerald-50 border border-emerald-200">
          <CardContent className="p-3 sm:p-6 text-center">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
              <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-600" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-emerald-800">
              Garantia Incondicional de 7 Dias
            </h2>
            <p className="text-sm sm:text-lg text-slate-700 max-w-3xl mx-auto">
              Teste o Método NeuroCognitivo 360° completo por 7 dias. Se não observar melhora na concentração e desenvolvimento do seu
              filho, devolvemos 100% do investimento. Sem perguntas, sem burocracia.
            </p>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-slate-800">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                Para qual faixa etária o kit é recomendado?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-sm sm:text-base">
                O Kit Estimulação Cognitiva foi desenvolvido para crianças de 3 a 12 anos, com atividades progressivas
                que se adaptam ao nível de desenvolvimento de cada criança.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-sm:text-base">
                Como recebo o material após a compra?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-sm sm:text-base">
                Todo o conteúdo é digital. Você receberá os materiais por e-mail imediatamente após a confirmação do
                pagamento, podendo imprimir quantas vezes desejar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                Quais formas de pagamento são aceitas?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-sm sm:text-base">
                Aceitamos cartão de crédito (parcelamento disponível), boleto bancário e PIX. Todas as transações são
                processadas com segurança máxima.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-sm:text-base">
                E se eu não ficar satisfeito com o resultado?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-sm sm:text-base">
                Oferecemos garantia incondicional de 7 dias. Se não estiver satisfeito, basta solicitar o reembolso por
                e-mail e devolvemos 100% do valor investido.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Seção Final Persuasiva - Neuromarketing Avançado - MELHORADA */}
        <div className="mb-4 sm:mb-8 bg-white border-t-4 border-slate-800 pt-3 sm:pt-6" ref={finalOfferRef}>
          <div className="max-w-4xl mx-auto px-2 sm:px-3">
            {/* Nova primeira seção melhorada */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-200 rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-600 to-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-slate-800">
                    {personalization?.playerName}, Esta É Sua Oportunidade Decisiva
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {personalization?.parentType === "pai"
                      ? "Como pai, você tem o poder de transformar o futuro cognitivo do seu filho hoje. Esta decisão pode ser o divisor de águas no desenvolvimento dele."
                      : "Como mãe, seu instinto já sabe que esta é a escolha certa. Seu cuidado maternal pode ser potencializado por um método científico comprovado."}
                  </p>
                </div>
              </div>
            </div>

            {/* Quebra da Racionalidade + Ativação do Instinto Protetor */}
            <div className="mb-4 sm:mb-6 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p className="mb-3 sm:mb-4">
                {personalization?.parentType === "pai"
                  ? `Como pai, você sabe que existem momentos decisivos na vida. Momentos que definem trajetórias inteiras. Este é um deles.`
                  : `Como mãe, você sente quando algo é realmente importante para o futuro do seu filho. Sua intuição está certa desta vez.`}
              </p>

              <p className="mb-3 sm:mb-4">
                Seu filho não tem culpa de viver em um mundo cheio de distrações. Um mundo que sequestra a atenção a
                cada segundo. <strong>Mas cabe a você protegê-lo dessas armadilhas modernas</strong> antes que seja
                tarde demais.
              </p>

              <p className="mb-3 sm:mb-4 text-center font-semibold text-blue-700 text-sm sm:text-xl">
                Enquanto 97% dos pais terceirizam o desenvolvimento cognitivo dos filhos, apenas 3% assumem esse papel
                decisivo.
              </p>
            </div>

            {/* Dois Futuros (Visão de Consequência vs. Benefício) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <Card className="border-red-200 bg-red-50 shadow-lg">
                <CardContent className="p-3 sm:p-6">
                  <h3 className="text-sm sm:text-xl font-bold mb-2 sm:mb-4 text-red-800 flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    Se você não agir hoje...
                  </h3>
                  <p className="text-xs sm:text-base text-slate-700 mb-2 sm:mb-4">
                    Imagine seu filho daqui a alguns anos. Frustrado com as notas baixas. Desistindo facilmente dos
                    desafios. Perdendo oportunidades por não conseguir se concentrar quando mais precisa.
                  </p>
                  <p className="text-xs sm:text-base text-slate-700 mb-2 sm:mb-4">
                    E o pior: você olhando para trás, lembrando deste exato momento, pensando:{" "}
                    <em>"E se eu tivesse feito algo quando ainda havia tempo?"</em>
                  </p>
                  <p className="text-xs sm:text-base text-red-800 font-medium">
                    {personalization?.parentType === "pai"
                      ? "Como pai, você sabe que essa dor de arrependimento seria insuportável."
                      : "Como mãe, você sabe que essa culpa seria impossível de carregar."}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50 shadow-lg">
                <CardContent className="p-3 sm:p-6">
                  <h3 className="text-sm sm:text-xl font-bold mb-2 sm:mb-4 text-emerald-800 flex items-center gap-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                    Quando você agir agora...
                  </h3>
                  <p className="text-xs sm:text-base text-slate-700 mb-2 sm:mb-4">
                    Visualize seu filho em apenas algumas semanas: concentrado, confiante, resolvendo problemas com
                    facilidade. Os professores notando a diferença. As tarefas de casa deixando de ser uma batalha
                    diária.
                  </p>
                  <p className="text-xs sm:text-base text-slate-700 mb-2 sm:mb-4">
                    E o melhor: aquele olhar de admiração quando ele percebe que foi <em>você</em> quem proporcionou
                    essa transformação. O vínculo entre vocês mais forte do que nunca.
                  </p>
                  <p className="text-xs sm:text-base text-emerald-800 font-medium">
                    {personalization?.parentType === "pai"
                      ? "Como pai, você sentirá o orgulho de ter cumprido sua missão mais importante."
                      : "Como mãe, você sentirá a alegria de ver seu amor transformado em resultados concretos."}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Urgência Temporal + Autoridade Científica */}
            <div className="mb-4 sm:mb-6 bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-6">
              <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-800 text-center">
                A Ciência Não Espera. O Cérebro Do Seu Filho Também Não.
              </h3>

              <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mb-3 sm:mb-6">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 flex-shrink-0 mt-1 mx-auto sm:mx-0" />
                <div>
                  <p className="text-xs sm:text-base text-slate-700 mb-2 sm:mb-3">
                    Pesquisadores da Harvard Medical School descobriram que{" "}
                    <strong>existe uma janela crítica de desenvolvimento neural</strong> que, uma vez fechada, torna o
                    aprendizado significativamente mais difícil.
                  </p>
                  <p className="text-xs sm:text-base text-slate-700">
                    <strong className="text-blue-700">Cada dia que passa</strong> sem a estimulação adequada é um dia em
                    que o cérebro do seu filho perde milhares de conexões neurais potenciais. Conexões que poderiam
                    fazer toda a diferença no futuro dele.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Badge className="bg-red-600 text-white px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg">
                  <Clock className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  Oferta encerra em: {String(timeLeft.hours).padStart(2, "0")}h{" "}
                  {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
                </Badge>
              </div>
            </div>

            {/* Prova Social + História Real */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6 text-slate-800 text-center">
                Pais Como Você Já Transformaram o Futuro de Seus Filhos
              </h3>

              <Card className="border-amber-200 bg-amber-50 shadow-lg mb-3 sm:mb-6">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-base text-slate-700 italic mb-2 sm:mb-3">
                        "Meu filho Lucas, de 7 anos, não conseguia se concentrar por mais de 5 minutos. As notas caíam,
                        a autoestima dele também. Eu me sentia impotente. Depois de apenas 3 semanas aplicando este
                        método, ele consegue estudar por 30 minutos seguidos. Ontem, pela primeira vez, ele disse que
                        matemática é sua matéria favorita! Como {personalization?.parentType === "pai" ? "pai" : "mãe"},
                        não há sensação melhor do que ver seu filho vencer."
                      </p>
                      <p className="font-semibold text-slate-800 text-xs sm:text-base">
                        — {personalization?.parentType === "pai" ? "Carlos, pai do Lucas" : "Mariana, mãe do Lucas"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-xs sm:text-lg text-slate-700 mb-2 sm:mb-4">
                  <strong>Mais de 5.000 famílias</strong> já transformaram o desenvolvimento cognitivo de seus filhos
                  com este método. Não por acaso, <strong>93% relatam melhora significativa nas notas escolares</strong>{" "}
                  em menos de 60 dias.
                </p>
                <p className="text-sm sm:text-lg text-blue-700 font-semibold">
                  {personalization?.parentType === "pai"
                    ? "Você será o próximo pai a compartilhar uma história de sucesso?"
                    : "Você será a próxima mãe a compartilhar uma história de transformação?"}
                </p>
              </div>
            </div>

            {/* Facilidade e Recompensa Imediata */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6 text-slate-800 text-center">
                É Mais Fácil Do Que Você Imagina
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <Card className="text-center border border-slate-200 shadow-md">
                  <CardContent className="p-3 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <h4 className="font-bold mb-1 sm:mb-2 text-xs sm:text-base">Apenas 15 Minutos/Dia</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Menos tempo que um episódio de desenho animado</p>
                  </CardContent>
                </Card>

                <Card className="text-center border border-slate-200 shadow-md">
                  <CardContent className="p-3 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <h4 className="font-bold mb-1 sm:mb-2 text-xs sm:text-base">Resultados em 7 Dias</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Melhoras visíveis já na primeira semana</p>
                  </CardContent>
                </Card>

                <Card className="text-center border border-slate-200 shadow-md">
                  <CardContent className="p-3 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                    </div>
                    <h4 className="font-bold mb-1 sm:mb-2 text-xs sm:text-base">Sem Complicações</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Atividades prontas e passo a passo claro</p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-center text-xs sm:text-lg text-slate-700">
                Não é preciso ser especialista. Não é preciso mudar sua rotina.{" "}
                <strong>É preciso apenas 15 minutos do seu dia e a decisão de fazer a diferença.</strong>
              </p>
            </div>

            {/* Custo de Oportunidade */}
            <div className="mb-4 sm:mb-6 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-6">
              <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6 text-slate-800 text-center">
                O Verdadeiro Custo Está em Não Agir
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-6">
                <div>
                  <h4 className="font-bold text-red-700 mb-2 sm:mb-3 text-xs sm:text-base">
                    Se você não investir hoje:
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 font-bold text-xs sm:text-base">R$</span>
                      </div>
                      <span className="text-xs sm:text-base text-slate-700">
                        <strong>R$ 2.400/ano</strong> em aulas de reforço escolar
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 font-bold text-xs sm:text-base">R$</span>
                      </div>
                      <span className="text-xs sm:text-base text-slate-700">
                        <strong>R$ 3.600/ano</strong> em terapias especializadas
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 font-bold text-xs sm:text-base">R$</span>
                      </div>
                      <span className="text-xs sm:text-base text-slate-700">
                        <strong>Custo emocional</strong> de ver seu filho frustrado
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-emerald-700 mb-2 sm:mb-3 text-xs sm:text-base">
                    Seu investimento hoje:
                  </h4>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 font-bold text-base sm:text-xl">R$</span>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-4xl font-bold text-emerald-600">23,90</p>
                      <p className="text-xs sm:text-sm text-slate-600">Pagamento único • Acesso vitalício</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs sm:text-lg text-slate-700">
                <strong>Economize mais de R$ 6.000 por ano</strong> e evite anos de frustração para você e seu filho.
              </p>
            </div>

            {/* Call to Action Final com Último Impacto Emocional */}

            <Card className="bg-gradient-to-r from-slate-800 to-blue-800 text-white mb-4 sm:mb-6 shadow-2xl border-0">
              <CardContent className="p-3 sm:p-6">
                {/* Badge de Sucesso */}
                {personalization?.gameCompleted && (
                  <div className="text-center mb-3 sm:mb-6">
                    <Badge className="bg-emerald-600 text-white px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-lg font-semibold">
                      Demonstração Concluída com Sucesso
                    </Badge>
                  </div>
                )}

                {/* Badge do Método */}
                <div className="text-center mb-3 sm:mb-4">
                  <Badge className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 border border-purple-400/40 px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-bold shadow-lg">
                    🧠 SISTEMA NEUROTEA AVANÇADO™ • Validado Internacionalmente
                  </Badge>
                </div>

                {/* Headline Principal */}
                <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6 text-center">
                  {personalization?.playerName}, Seu Filho Só Tem Uma Infância
                </h2>

                {/* Texto Emocional */}
                <p className="text-sm sm:text-base mb-4 sm:mb-6 max-w-3xl mx-auto text-center">
                  {personalization?.parentType === "pai"
                    ? `Como pai, você tem o poder de moldar o futuro dele agora. Ele confia em você para guiá-lo. Não deixe que ele enfrente sozinho um mundo cada vez mais competitivo.`
                    : `Como mãe, você sempre soube quando seu filho precisava de você. Este é um desses momentos. Ele confia no seu cuidado e orientação mais do que em qualquer outra pessoa.`}
                </p>

                <p className="text-sm sm:text-lg mb-4 sm:mb-6 font-semibold text-blue-200 text-center">
                  Cada minuto que passa é uma oportunidade perdida no desenvolvimento do cérebro dele.
                </p>

                {/* Stack de Valor Detalhado - NOVO */}
                <div className="bg-white/10 rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 backdrop-blur-sm">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center text-emerald-300">
                    🧠 SISTEMA NEUROTEA AVANÇADO™ COMPLETO
                  </h3>
                  
                  {/* Imagem do Produto */}
                                      <div className="mb-4 sm:mb-6 flex justify-center">
                    <div className="relative w-full max-w-md bg-gradient-to-br from-blue-900/30 to-emerald-900/30 p-4 sm:p-5 rounded-xl shadow-inner">
                      <img 
                        src="https://i.postimg.cc/YSS86w1d/Design-sem-nome-39.png" 
                        alt="Sistema NeuroTEA Avançado™ - Material Completo" 
                        className="rounded-lg shadow-xl border-2 border-emerald-400/30 w-full hover:transform hover:scale-[1.02] transition-all duration-300"
                      />
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm px-4 py-2 rounded-full font-bold shadow-lg transform rotate-12 border border-white/30">
                        650+ Atividades TEA
                      </div>
                      <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs sm:text-sm px-4 py-2 rounded-full font-bold shadow-lg border border-white/30">
                        Acesso Imediato
                      </div>
                      <div className="mt-3 text-center text-emerald-300 text-xs sm:text-sm font-medium">
                        ↑ Material Digital Completo - Acesso Imediato ↑
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3 text-left max-w-2xl mx-auto">
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                        <span className="text-xs sm:text-sm">Sistema NeuroTEA Avançado™ (650+ Atividades Especializadas)</span>
                      </div>
                      <span className="text-xs sm:text-sm text-emerald-300 font-semibold">R$ 127,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                        <span className="text-xs sm:text-sm">BÔNUS #1: Guia de Implementação Acelerada</span>
                      </div>
                      <span className="text-xs sm:text-sm text-emerald-300 font-semibold">R$ 47,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                        <span className="text-xs sm:text-sm">BÔNUS #2: Relatório de Progresso Cognitivo</span>
                      </div>
                      <span className="text-xs sm:text-sm text-emerald-300 font-semibold">R$ 37,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                        <span className="text-xs sm:text-sm">BÔNUS #3: Vídeos de Demonstração Exclusivos</span>
                      </div>
                      <span className="text-xs sm:text-sm text-emerald-300 font-semibold">R$ 67,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                        <span className="text-xs sm:text-sm">BÔNUS #4: Comunidade VIP + Suporte Especializado</span>
                      </div>
                      <span className="text-xs sm:text-sm text-emerald-300 font-semibold">R$ 97,00</span>
                    </div>
                    
                    <div className="border-t-2 border-emerald-400 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base font-bold">VALOR TOTAL:</span>
                        <span className="text-lg sm:text-xl font-bold text-emerald-300">R$ 375,00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preço com Nova Estrutura */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="mb-2">
                    <span className="line-through text-slate-400 text-xl sm:text-2xl mr-2 sm:mr-3">R$ 375,00</span>
                  </div>
                  <div className="text-4xl sm:text-6xl font-bold mb-2">
                    <span className="text-emerald-300">R$ 23,90</span>
                  </div>
                  <Badge className="bg-red-600 text-white text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 mb-2">
                    Desconto de 94% • Apenas Hoje
                  </Badge>
                  <p className="text-xs sm:text-sm text-blue-200">
                    Pagamento único • Acesso vitalício a TUDO
                  </p>
                </div>

                {/* Botão Único de Checkout */}
                <div className="text-center">
                  <Button
                    onClick={handlePurchase}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 sm:px-12 py-5 sm:py-7 text-lg sm:text-2xl font-bold shadow-2xl mb-3 sm:mb-4 w-full rounded-xl touch-manipulation transform hover:scale-105 transition-all duration-300 pulse-green"
                  >
                    QUERO AGORA
                  </Button>

                  <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-blue-200">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Garantia incondicional de 7 dias • Pagamento 100% seguro</span>
                  </div>

                  <p className="text-xs sm:text-sm text-blue-200 mt-2 sm:mt-3">
                    Acesso imediato ao Sistema NeuroTEA Avançado™ + Todos os Bônus
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Último Gatilho de Identidade */}
            <div className="text-center mb-4 sm:mb-8">
              <p className="text-sm sm:text-lg text-slate-700 mb-2 sm:mb-3">
                {personalization?.parentType === "pai"
                  ? "Apenas 3% dos pais tomam a iniciativa de investir no desenvolvimento cognitivo dos filhos."
                  : "Apenas 3% das mães tomam a iniciativa de investir no desenvolvimento cognitivo dos filhos."}
              </p>
              <p className="text-sm sm:text-xl font-semibold text-blue-700">
                {personalization?.playerName}, você já mostrou que faz parte desse grupo seleto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
