import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import FacebookPixel from "@/components/FacebookPixel"
import UTMify from "@/components/UTMify"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kit Estimulação Cognitiva - Potencialize o Cérebro do seu Filho",
  description:
    "300+ atividades lúdicas para desenvolver atenção, memória, raciocínio lógico e muito mais. Aprendizado divertido para toda a família!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <FacebookPixel />
        <UTMify />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
