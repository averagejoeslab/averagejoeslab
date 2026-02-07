import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FlaskConical, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learning Paths',
  description: 'Comprehensive learning paths for research engineering and STEM foundations. Start your research journey with step-by-step guides from beginner to advanced.',
  alternates: {
    canonical: '/learn/',
  },
}

export default function LearnPage() {
  const paths = [
    {
      icon: FlaskConical,
      title: 'Research Engineering',
      description: 'Learn the universal 10-step research methodology. Follow Frank Rosenblatt\'s historic 1958 perceptron research journey to master the complete research cycle.',
      href: '/learn/research-engineering/getting-started/',
      items: [
        'Getting Started with Research Engineering',
        'The Universal Research Process (10 Steps)',
        'The Perceptron Research Example',
      ],
    },
    {
      icon: GraduationCap,
      title: 'STEM Foundations',
      description: 'Just-in-time learning resources covering Pre-K through graduate-level mathematics, science, and programming to support your research journey.',
      href: '/learn/foundations/getting-started/',
      items: [
        'Stage 0-3: Early through Secondary Foundations',
        'Stage 4-6: College through Advanced Topics',
        'Resources & Tools',
      ],
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-accent-50"></div>
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Learning
              <span className="text-accent-500 block">Paths</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Two complementary paths to guide your research journey. Start with the Research Engineering path and use the STEM Foundations for just-in-time learning support.
            </p>
          </div>
        </div>
      </section>

      {/* Paths Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paths.map((path) => (
              <div
                key={path.title}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <path.icon className="h-6 w-6 text-accent-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{path.title}</h2>
                <p className="text-slate-600 mb-6">{path.description}</p>
                <ul className="space-y-2 mb-6">
                  {path.items.map((item) => (
                    <li key={item} className="flex items-center text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={path.href}
                  className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium transition-colors"
                >
                  Start Learning
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
