import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Globe, Award, Users } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  const values = [
    {
      icon: BookOpen,
      title: 'Accessibility First',
      description: 'Research should be accessible to anyone with curiosity and dedication, regardless of their educational background or institutional affiliation.',
    },
    {
      icon: Globe,
      title: 'Open by Default',
      description: 'All our research, methodologies, and findings are open-source and freely available to the global community.',
    },
    {
      icon: Award,
      title: 'Merit-Based',
      description: 'We evaluate ideas and contributions based on their quality and potential impact, not on the credentials of their authors.',
    },
    {
      icon: Users,
      title: 'Collaborative Spirit',
      description: 'The best research happens when diverse minds work together, bringing different perspectives and experiences to complex problems.',
    },
  ]

  return (
    <div className="bg-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Average Joes Lab',
          url: 'https://averagejoeslab.com',
          logo: 'https://averagejoeslab.com/images/ajlabs-logo-light.png',
          description: 'Open research laboratory for citizen researchers. Democratizing research and empowering ordinary people to contribute to scientific discovery.',
          sameAs: [
            'https://github.com/averagejoeslab',
            'https://discord.gg/7gzZMAPuGr',
          ],
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-accent-50"></div>
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Average Joes Lab
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Democratizing research for citizen scientists. We empower ordinary people to do extraordinary things in the world of science through open collaboration, accessible tools, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn/research-engineering/getting-started/" className="btn-primary text-lg px-8 py-4">
                Start Research Path
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://discord.gg/7gzZMAPuGr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Mission &amp; Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our mission is to empower ordinary people to do extraordinary things in the world of science. We provide the tools, resources, and community support needed to explore new ideas, validate them through rigorous methods, and contribute to the advancement of human knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-accent-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-700">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a complete beginner or an experienced researcher, there&apos;s a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/learn/research-engineering/getting-started/" className="inline-flex items-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
              Start Learning Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/internal-papers/" className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Browse Papers
            </Link>
            <a
              href="https://discord.gg/7gzZMAPuGr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
