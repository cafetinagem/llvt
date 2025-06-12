"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Star, ArrowRight, CheckCircle, Award, Target } from "lucide-react"

interface QuizState {
  currentQuestion: number
  answers: {
    challenge: string | null
    interest: string | null
    pain: string | null
  }
  showFeedback: boolean
  feedbackMessage: string
  feedbackType: "correct" | "incorrect" | "neutral"
  playerName: string
  childAge: string
  parentType: "pai" | "mae"
}

const questions = [
  {
    id: 1,
    type: "challenge",
    title: "Desafio de Percepção Visual",
    question: "Seu filho conseguiria identificar o elemento diferente? (Teste adaptado para crianças no espectro)",
    options: ["◆", "◆", "◆", "◇", "◆", "◆"],
    correctAnswer: "◇",
    feedback: {
      correct: {
        pai: "Excelente! Como pai de uma criança especial, você demonstra a mesma atenção aos detalhes que caracteriza muitas crianças no espectro autista. Nosso kit potencializa essa habilidade natural.",
        mae: "Perfeito! Sua percepção aguçada reflete o olhar atento que toda mãe de criança autista desenvolve. É exatamente essa capacidade que nosso material especializado fortalece.",
      },
      incorrect: {
        pai: "A resposta era o losango vazado. Como pai, você sabe que cada criança no espectro tem seu próprio ritmo e forma de processar informações. Nosso kit respeita essas particularidades.",
        mae: "A resposta era o losango vazado. Como mãe, você compreende que crianças autistas processam informações de forma única. Nosso material é especialmente adaptado para essas necessidades.",
      },
    },
  },
  {
    id: 2,
    type: "interest",
    title: "Prioridades no Desenvolvimento TEA",
    question: "Qual área você considera mais urgente para o desenvolvimento do seu filho autista?",
    options: ["Comunicação e Linguagem", "Coordenação Motora Fina", "Interação Social", "Autonomia e Independência"],
    feedback: {
      neutral: {
        pai: "Escolha muito importante. Como pai de uma criança no espectro, você demonstra compreensão das necessidades específicas do desenvolvimento autista.",
        mae: "Escolha fundamental. Sua intuição materna está alinhada com as prioridades terapêuticas para crianças no espectro autista.",
      },
    },
  },
  {
    id: 3,
    type: "pain",
    title: "Desafios Atuais",
    question: "Como seu filho reage às atividades educacionais tradicionais?",
    options: ["Fica frustrado e abandona rapidamente", "Só se interessa por temas específicos", "Precisa de adaptações constantes"],
    feedback: {
      neutral: {
        pai: "Sua honestidade é valiosa. Reconhecer os desafios específicos do autismo é fundamental para encontrar as estratégias adequadas de aprendizagem.",
        mae: "Obrigado pela sinceridade. Sua experiência como mãe de criança autista nos ajuda a entender como nosso material especializado pode fazer a diferença.",
      },
    },
  },
]

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {
      challenge: null,
      interest: null,
      pain: null,
    },
    showFeedback: false,
    feedbackMessage: "",
    feedbackType: "neutral",
    playerName: "",
    childAge: "",
    parentType: "pai",
  })

  const [showResult, setShowResult] = useState(false)
  const [showNameForm, setShowNameForm] = useState(true)

  const currentQ = questions[quizState.currentQuestion]
  const progress = ((quizState.currentQuestion + 1) / questions.length) * 100

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    const age = formData.get("age") as string
    const parentType = formData.get("parentType") as "pai" | "mae"

    if (name && age && parentType) {
      setQuizState((prev) => ({ ...prev, playerName: name, childAge: age, parentType }))
      setShowNameForm(false)
    }
  }

  const handleAnswer = (answer: string) => {
    const answerKey = currentQ.type as keyof typeof quizState.answers
    const newAnswers = { ...quizState.answers, [answerKey]: answer }

    let feedbackMessage = ""
    let feedbackType: "correct" | "incorrect" | "neutral" = "neutral"

    if (currentQ.type === "challenge") {
      if (answer === currentQ.correctAnswer) {
        feedbackMessage = currentQ.feedback.correct?.[quizState.parentType] || "Excelente!"
        feedbackType = "correct"
      } else {
        feedbackMessage = currentQ.feedback.incorrect?.[quizState.parentType] || currentQ.feedback.correct?.[quizState.parentType] || "Continue tentando!"
        feedbackType = "incorrect"
      }
    } else {
      feedbackMessage = currentQ.feedback.neutral?.[quizState.parentType] || currentQ.feedback.correct?.[quizState.parentType] || "Obrigado pela resposta!"
      feedbackType = "neutral"
    }

    setQuizState({
      ...quizState,
      answers: newAnswers,
      showFeedback: true,
      feedbackMessage,
      feedbackType,
    })
  }

  const nextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        showFeedback: false,
        feedbackMessage: "",
        feedbackType: "neutral",
      })
    } else {
      localStorage.setItem("quizData", JSON.stringify(quizState))
      setShowResult(true)
    }
  }

  const goToMiniGame = () => {
    window.location.href = "/mini-jogo"
  }

  if (showNameForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl border-0 bg-white">
          <CardHeader className="text-center bg-gradient-to-r from-slate-700 to-blue-700 text-white rounded-t-lg">
            <div className="mx-auto mb-4 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-100" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold leading-tight">Avaliação NeuroTEA Avançado™</CardTitle>
            <CardDescription className="text-blue-100 text-base sm:text-lg leading-relaxed">
              Descubra como o Sistema NeuroTEA Avançado™ pode transformar o desenvolvimento do seu filho autista
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleNameSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 leading-tight">Para personalizar o Sistema NeuroTEA™</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Preencha os campos abaixo para começar sua avaliação especializada com o método mais avançado para autismo</p>
                
                {/* Indicador de progresso simples */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-4">
                  <p className="text-sm sm:text-base text-blue-700 font-semibold">
                    🧠 Passo 1 de 4: Perfil NeuroTEA da criança
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Seu primeiro nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ex: Maria, João, Ana..."
                  className="w-full p-4 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg bg-white"
                />
                <p className="text-xs text-slate-500 mt-1">Para personalizar sua experiência</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Você é <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-3">▼ Selecione uma das opções abaixo:</p>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-all group">
                    <input type="radio" name="parentType" value="pai" required className="mr-3" />
                    <span className="text-lg">Pai</span>
                    <div className="ml-auto bg-slate-600 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                      Selecionar
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-all group">
                    <input type="radio" name="parentType" value="mae" required className="mr-3" />
                    <span className="text-lg">Mãe</span>
                    <div className="ml-auto bg-slate-600 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                      Selecionar
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Idade do seu filho <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-3">▼ Clique para abrir as opções:</p>
                <select
                  name="age"
                  required
                  className="w-full p-4 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg bg-white cursor-pointer"
                >
                  <option value="">Selecione a faixa etária</option>
                  <option value="3-5">3 a 5 anos</option>
                  <option value="6-8">6 a 8 anos</option>
                  <option value="9-12">9 a 12 anos</option>
                  <option value="13+">13+ anos</option>
                </select>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-emerald-700 text-center font-medium">
                  ▼ Após preencher todos os campos, clique no botão abaixo para continuar
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-800 hover:to-blue-800 text-white py-4 text-lg relative group"
              >
                <span>Começar Avaliação TEA</span>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-slate-700 text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                  Continuar
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResult) {
    const getPersonalizedMessage = () => {
      const interest = quizState.answers.interest
      const pain = quizState.answers.pain
      const parentType = quizState.parentType

      let message = ""

      if (parentType === "pai") {
        message = `${quizState.playerName}, como pai de uma criança no espectro autista, você demonstrou compreensão excepcional das necessidades especiais. `
        if (interest?.includes("Comunicação")) {
          message +=
            "Seu foco no desenvolvimento da comunicação revela sua compreensão sobre os desafios únicos que crianças autistas enfrentam. "
        } else if (interest?.includes("Coordenação")) {
          message += "Sua preocupação com a coordenação motora mostra visão estratégica para o desenvolvimento integral do seu filho. "
        } else if (interest?.includes("Interação")) {
          message += "Sua priorização da interação social demonstra compreensão profunda das necessidades sociais no espectro. "
        }
        message += "Agora imagine aplicar um método especializado que respeita as particularidades do autismo e potencializa as habilidades naturais."
      } else {
        message = `${quizState.playerName}, sua dedicação como mãe de uma criança autista é inspiradora. `
        if (interest?.includes("Comunicação")) {
          message +=
            "Sua sensibilidade para priorizar a comunicação demonstra o olhar especializado que toda mãe de criança autista desenvolve. "
        } else if (interest?.includes("Coordenação")) {
          message +=
            "Sua percepção sobre a importância da coordenação motora reflete o cuidado maternal especializado em TEA. "
        } else if (interest?.includes("Interação")) {
          message +=
            "Sua preocupação com a interação social mostra compreensão profunda das necessidades do espectro autista. "
        }
        message +=
          "Agora imagine ter em suas mãos um sistema especializado que canaliza esse amor maternal em resultados concretos e adaptados às necessidades do seu filho."
      }

      return message
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-xl border-0 bg-white">
          <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-t-lg">
            <div className="mx-auto mb-4 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-emerald-100" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold leading-tight">Sistema NeuroTEA™ Desbloqueado, {quizState.playerName}</CardTitle>
            <CardDescription className="text-emerald-100 text-base sm:text-lg leading-relaxed">
              Perfil neurológico TEA identificado - Acesso ao método avançado liberado
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-slate-800">Análise Especializada TEA</h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">{getPersonalizedMessage()}</p>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-semibold text-amber-800">Próxima Etapa Desbloqueada</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Você demonstrou compreensão sobre as necessidades especiais do autismo. Agora vamos para uma demonstração prática
                que revelará como funciona nosso método especializado para crianças no espectro.
              </p>
              <div className="flex items-center gap-2 text-sm text-amber-700">
                <Star className="w-4 h-4" />
                <span>Acesso liberado: Demonstração Especializada TEA</span>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={goToMiniGame}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold shadow-lg w-full sm:w-auto rounded-xl touch-manipulation transform hover:scale-105 transition-all duration-300"
              >
                🧠 Começar Avaliação TEA
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-slate-600 mt-3">Sistema NeuroTEA Avançado™ - Demonstração Prática</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white overflow-hidden mx-2 sm:mx-0">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              Questão {quizState.currentQuestion + 1} de {questions.length}
            </Badge>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-200" />
              <span className="text-sm text-blue-100">Avaliação TEA</span>
            </div>
          </div>
          <Progress value={progress} className="mb-4 bg-white/20" />
          <CardTitle className="text-xl font-bold text-center">
            {quizState.parentType === "pai"
              ? `${quizState.playerName}, vamos começar`
              : `${quizState.playerName}, vamos iniciar`}
          </CardTitle>
          <CardDescription className="text-center text-lg text-blue-100">
            Avaliação especializada para {quizState.parentType === "pai" ? "pais" : "mães"} de crianças autistas de{" "}
            {quizState.childAge}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-800">{currentQ.title}</h3>
            <p className="text-base sm:text-lg mb-3 sm:mb-4 text-slate-700 leading-relaxed">{currentQ.question}</p>
            
            {/* Instrução clara para o lead */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-blue-700 font-medium">
                ▼ {currentQ.type === "challenge" ? "Clique no símbolo diferente abaixo:" : "Clique na opção que melhor representa sua situação:"}
              </p>
            </div>
          </div>

          {!quizState.showFeedback ? (
            <div className="space-y-4">
              {currentQ.type === "challenge" ? (
                <div>
                  <div className="flex justify-center gap-6 flex-wrap">
                    {currentQ.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        variant="outline"
                        size="lg"
                        className="text-3xl p-8 hover:bg-blue-50 border-2 hover:border-blue-300 transition-all relative group"
                      >
                        {option}
                        <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                          Selecionar
                        </div>
                      </Button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-slate-500 mt-4">
                    ⚡ Dica: Passe o cursor sobre os símbolos e clique no diferente
                  </p>
                </div>
              ) : (
                <div>
                  <div className="space-y-2 sm:space-y-3">
                    {currentQ.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        variant="outline"
                        className="w-full p-3 sm:p-5 text-left hover:bg-slate-50 border hover:border-slate-300 transition-all relative group min-h-[70px] sm:min-h-[80px]"
                      >
                        <div className="flex items-start w-full gap-3 sm:gap-4">
                          <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
                            <span className="font-bold text-slate-600 text-xs sm:text-base">
                              {String.fromCharCode(65 + index)}
                            </span>
                          </div>
                          <span className="text-sm sm:text-base flex-1 text-left pr-1 text-wrap-optimal">
                            {option}
                          </span>
                        </div>
                        <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-slate-600 text-white text-xs px-2 sm:px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                          Selecionar
                        </div>
                      </Button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-slate-500 mt-4">
                    ▲ Escolha uma das opções acima clicando sobre ela
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className={`p-6 rounded-xl border ${
                  quizState.feedbackType === "correct"
                    ? "bg-emerald-50 border-emerald-200"
                    : quizState.feedbackType === "incorrect"
                      ? "bg-amber-50 border-amber-200"
                      : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  {quizState.feedbackType === "correct" && (
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                  )}
                  {quizState.feedbackType === "incorrect" && (
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-amber-600" />
                    </div>
                  )}
                  {quizState.feedbackType === "neutral" && (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <p className="text-slate-700 leading-relaxed text-lg">{quizState.feedbackMessage}</p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={nextQuestion}
                  size="lg"
                  className="bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-800 hover:to-blue-800 px-12 py-4 text-lg shadow-lg"
                >
                  {quizState.currentQuestion < questions.length - 1 ? "Próxima" : "Resultado"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
