"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Trophy, ArrowRight, RotateCcw, Timer, Star, Target, Award, TrendingUp } from "lucide-react"

const memoryCards = [
  { id: 1, symbol: "●", matched: false },
  { id: 2, symbol: "●", matched: false },
  { id: 3, symbol: "■", matched: false },
  { id: 4, symbol: "■", matched: false },
  { id: 5, symbol: "▲", matched: false },
  { id: 6, symbol: "▲", matched: false },
  { id: 7, symbol: "◆", matched: false },
  { id: 8, symbol: "◆", matched: false },
]

interface GameState {
  cards: typeof memoryCards
  flippedCards: number[]
  matchedPairs: number
  moves: number
  gameCompleted: boolean
  timeLeft: number
  gameStarted: boolean
  score: number
  streak: number
}

interface QuizData {
  playerName: string
  childAge: string
  parentType: "pai" | "mae"
  answers: {
    interest: string | null
    pain: string | null
  }
}

export default function MiniJogo() {
  const [gameState, setGameState] = useState<GameState>({
    cards: [...memoryCards].sort(() => Math.random() - 0.5),
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    gameCompleted: false,
    timeLeft: 90,
    gameStarted: false,
    score: 0,
    streak: 0,
  })

  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem("quizData")
    if (savedData) {
      const data = JSON.parse(savedData)
      setQuizData(data)
    }
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState.gameStarted && gameState.timeLeft > 0 && !gameState.gameCompleted) {
      timer = setTimeout(() => {
        setGameState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }))
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [gameState.timeLeft, gameState.gameStarted, gameState.gameCompleted])

  const startGame = () => {
    setGameState((prev) => ({ ...prev, gameStarted: true }))
  }

  const resetGame = () => {
    setGameState({
      cards: [...memoryCards].sort(() => Math.random() - 0.5),
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      gameCompleted: false,
      timeLeft: 90,
      gameStarted: false,
      score: 0,
      streak: 0,
    })
    setShowCelebration(false)
  }

  const handleCardClick = (index: number) => {
    if (!gameState.gameStarted || gameState.gameCompleted) return
    if (gameState.flippedCards.length === 2) return
    if (gameState.flippedCards.includes(index)) return
    if (gameState.cards[index].matched) return

    const newFlippedCards = [...gameState.flippedCards, index]
    setGameState((prev) => ({ ...prev, flippedCards: newFlippedCards }))

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards
      const newMoves = gameState.moves + 1

      if (gameState.cards[first].symbol === gameState.cards[second].symbol) {
        const newStreak = gameState.streak + 1
        const bonusPoints = newStreak * 50
        const timeBonus = Math.max(0, gameState.timeLeft - 30) * 2
        const newScore = gameState.score + 100 + bonusPoints + timeBonus

        const newCards = gameState.cards.map((card, i) =>
          i === first || i === second ? { ...card, matched: true } : card,
        )
        const newMatchedPairs = gameState.matchedPairs + 1
        const gameCompleted = newMatchedPairs === 4

        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 1500)

        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            cards: newCards,
            flippedCards: [],
            matchedPairs: newMatchedPairs,
            moves: newMoves,
            gameCompleted,
            score: newScore,
            streak: newStreak,
          }))
        }, 1000)
      } else {
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            flippedCards: [],
            moves: newMoves,
            streak: 0,
          }))
        }, 1000)
      }
    }
  }

  const goToOffer = () => {
    const gameData = {
      completed: gameState.gameCompleted,
      score: gameState.score,
      moves: gameState.moves,
      timeLeft: gameState.timeLeft,
    }
    localStorage.setItem("gameData", JSON.stringify(gameData))
    window.location.href = "/oferta"
  }

  const getPersonalizedIntro = () => {
    if (!quizData) return "Prepare-se para a demonstração especializada"

    let message = ""

    if (quizData.parentType === "pai") {
      message = `${quizData.playerName}, como pai de uma criança autista, você entende a importância de métodos especializados. `
      if (quizData.answers.interest?.includes("Comunicação")) {
        message += "Esta demonstração mostrará exatamente como desenvolver habilidades cognitivas que apoiam a comunicação."
      } else if (quizData.answers.interest?.includes("Coordenação")) {
        message += "Esta demonstração revelará como treinar coordenação e foco através de exercícios adaptados para TEA."
      } else if (quizData.answers.interest?.includes("Interação")) {
        message += "Esta demonstração exemplifica como atividades estruturadas podem melhorar a interação social."
      } else {
        message += "Esta demonstração exemplifica como atividades adaptadas geram resultados extraordinários em crianças no espectro."
      }
    } else {
      message = `${quizData.playerName}, sua dedicação como mãe de criança autista será fundamental aqui. `
      if (quizData.answers.interest?.includes("Comunicação")) {
        message += "Esta demonstração mostrará como nutrir as habilidades comunicativas do seu filho de forma especializada."
      } else if (quizData.answers.interest?.includes("Coordenação")) {
        message += "Esta demonstração revelará como cultivar a coordenação através de métodos adaptados para TEA."
      } else if (quizData.answers.interest?.includes("Interação")) {
        message += "Esta demonstração exemplifica como o cuidado maternal pode ser canalizado em desenvolvimento social real."
      } else {
        message += "Esta demonstração exemplifica como o amor maternal pode ser direcionado através de métodos especializados em autismo."
      }
    }

    return message
  }

  if (gameState.gameCompleted) {
    const getPersonalizedSuccess = () => {
      if (!quizData) return "Excelente desempenho!"

      let message = ""

      if (quizData.parentType === "pai") {
        message = `${quizData.playerName}, como pai de uma criança autista, você demonstrou excelência. `
        if (gameState.score > 400) {
          message += "Sua performance excepcional reflete a dedicação especializada que você tem com o desenvolvimento do seu filho no espectro. "
        } else {
          message += "Seu desempenho sólido mostra o comprometimento paterno com métodos adaptados e resultados concretos. "
        }
        message += `Agora imagine seu filho autista de ${quizData.childAge} desenvolvendo essas mesmas capacidades através de atividades especialmente adaptadas para TEA.`
      } else {
        message = `${quizData.playerName}, sua dedicação como mãe de criança autista brilhou aqui. `
        if (gameState.score > 400) {
          message += "Sua performance extraordinária demonstra a sensibilidade especializada que toda mãe de criança autista desenvolve. "
        } else {
          message += "Seu desempenho cuidadoso reflete o olhar atento e especializado que caracteriza mães de crianças no espectro. "
        }
        message += `Agora imagine canalizar esse cuidado em um método especializado que desenvolve seu filho autista de ${quizData.childAge} de forma estruturada e adaptada às suas necessidades.`
      }

      return message
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-xl border-0 bg-white">
          <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-slate-700 text-white rounded-t-lg">
            <div className="mx-auto mb-4 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-emerald-200" />
            </div>
            <CardTitle className="text-2xl font-bold">Demonstração TEA Concluída, {quizData?.playerName}</CardTitle>
            <CardDescription className="text-emerald-100 text-lg">
              Capacidades especializadas validadas com sucesso
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4 rounded-xl text-center border border-blue-100">
                <div className="text-2xl font-bold text-blue-700">{gameState.score}</div>
                <div className="text-sm text-slate-600">Pontos Conquistados</div>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-slate-50 p-4 rounded-xl text-center border border-emerald-100">
                <div className="text-2xl font-bold text-emerald-700">{gameState.moves}</div>
                <div className="text-sm text-slate-600">Movimentos</div>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-slate-50 p-4 rounded-xl text-center border border-amber-100">
                <div className="text-2xl font-bold text-amber-700">{gameState.timeLeft}s</div>
                <div className="text-sm text-slate-600">Tempo Restante</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-slate-600" />
                <h3 className="text-xl font-semibold text-slate-800">Análise de Performance</h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg mb-4">{getPersonalizedSuccess()}</p>
              <div className="flex items-center gap-2 text-slate-600">
                <Star className="w-5 h-5" />
                <span className="font-medium">Acesso liberado: Kit Especializado para Autismo</span>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Habilidades Demonstradas</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700">Memória de Trabalho</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700">Atenção Seletiva</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700">Funções Executivas</span>
                </div>
              </div>
              <p className="mt-4 text-blue-800 font-medium">
                Estas são exatamente as capacidades que nosso kit especializado desenvolve em crianças autistas de forma adaptada e sistemática.
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={goToOffer}
                size="lg"
                className="bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-800 hover:to-blue-800 text-white px-12 py-4 text-xl shadow-lg"
              >
                Ver Kit TEA
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              <p className="text-sm text-slate-600 mt-3">Acesso exclusivo ao kit especializado em autismo</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-xl border-0 bg-white">
          <CardHeader className="text-center bg-gradient-to-r from-slate-700 to-blue-700 text-white rounded-t-lg">
            <div className="mx-auto mb-4 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-200" />
            </div>
            <CardTitle className="text-2xl font-bold">Demonstração Especializada TEA</CardTitle>
            <CardDescription className="text-blue-100 text-lg">{getPersonalizedIntro()}</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                <Target className="w-6 h-6" />
                Como Jogar
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-slate-700 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Clique nas cartas</h4>
                    <p className="text-sm">Toque em duas cartas para virá-las</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Encontre os pares</h4>
                    <p className="text-sm">Símbolos iguais formam um par</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Complete todos</h4>
                    <p className="text-sm">Encontre os 4 pares para vencer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Seja rápido</h4>
                    <p className="text-sm">Menos tempo = mais pontos</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-amber-800 font-medium text-center">
                  💡 Dica: Memorize a posição dos símbolos para encontrar os pares mais rapidamente!
                </p>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-800">Fundamento Científico</h3>
              </div>
              <p className="text-slate-700">
                Este exercício faz parte do revolucionário <strong>Sistema NeuroTEA Avançado™</strong>, desenvolvido com base em 
                neuroplasticidade avançada para TEA. Cada par encontrado fortalece conexões neurais específicas relacionadas à 
                <strong>memória</strong>, <strong>atenção</strong> e <strong>processamento visual</strong> - capacidades fundamentais 
                para crianças no espectro autista.
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-800 hover:to-blue-800 text-white px-12 py-4 text-xl shadow-lg"
              >
                Começar
              </Button>
              <p className="text-sm text-slate-600 mt-3">Sistema NeuroTEA Avançado™ - Validado Internacionalmente</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 shadow-lg bg-white">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-slate-700 text-white">
                  <Timer className="w-4 h-4 mr-1" />
                  {gameState.timeLeft}s
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2 border-2">
                  Pontos: {gameState.score}
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2 border-2">
                  Pares: {gameState.matchedPairs}/4
                </Badge>
              </div>
              <Button onClick={resetGame} variant="outline" size="sm" className="border-2">
                <RotateCcw className="w-4 h-4 mr-1" />
                Reiniciar
              </Button>
            </div>

            {gameState.streak > 1 && (
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg px-4 py-2">
                  Sequência de {gameState.streak} acertos consecutivos
                </Badge>
              </div>
            )}
          </CardHeader>
        </Card>

        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-2xl">
              Excelente! +{100 + gameState.streak * 50} pontos
            </div>
          </div>
        )}

        <Card className="shadow-xl bg-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
              {gameState.cards.map((card, index) => (
                <Button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`aspect-square text-4xl p-0 border-2 transition-all duration-300 ${
                    gameState.flippedCards.includes(index) || card.matched
                      ? "bg-gradient-to-br from-white to-blue-50 border-blue-300 text-slate-800 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 shadow-lg"
                      : "bg-gradient-to-br from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 text-slate-600 border-slate-400 shadow-md hover:shadow-lg"
                  }`}
                  disabled={gameState.flippedCards.includes(index) || card.matched}
                >
                  {gameState.flippedCards.includes(index) || card.matched ? card.symbol : "?"}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {gameState.timeLeft === 0 && !gameState.gameCompleted && (
          <Card className="mt-6 shadow-xl border-2 border-amber-200 bg-white">
            <CardContent className="text-center p-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Timer className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-amber-700">Tempo Concluído</h3>
              <p className="text-lg text-slate-700 mb-6">
                {quizData?.playerName}, você conseguiu {gameState.matchedPairs} pares e conquistou {gameState.score}{" "}
                pontos. O importante é exercitar essas capacidades.
              </p>
              <p className="text-slate-600 mb-6">
                Nosso método completo desenvolve essas habilidades de forma gradual e sistemática, respeitando o ritmo
                de cada criança.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={goToOffer}
                  size="lg"
                  className="bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-800 hover:to-blue-800 text-white px-8 py-3"
                >
                  Ver Método <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button onClick={resetGame} variant="outline" size="lg" className="px-8 py-3 border-2">
                  <RotateCcw className="mr-2 w-5 h-5" />
                  Tentar Novamente
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
