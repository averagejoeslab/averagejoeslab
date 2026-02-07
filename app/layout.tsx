import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://averagejoeslab.com'),
  title: {
    template: '%s | Average Joes Lab',
    default: 'Average Joes Lab - Democratizing Research for Citizen Scientists',
  },
  description: 'Open research laboratory for citizen researchers. Democratizing research and empowering ordinary people to contribute to scientific discovery through open science.',
  keywords: 'citizen science, open research, democratized research, research methodology, STEM foundations, AI research, machine learning, open science',
  authors: [{ name: 'Average Joes Lab' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Average Joes Lab - Democratizing Research for Citizen Scientists',
    description: 'Open research laboratory for citizen researchers. Democratizing research and empowering ordinary people to contribute to scientific discovery.',
    url: 'https://averagejoeslab.com',
    siteName: 'Average Joes Lab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Average Joes Lab - Democratizing Research for Citizen Scientists',
    description: 'Open research laboratory for citizen researchers. Democratizing research and empowering ordinary people to contribute to scientific discovery.',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
