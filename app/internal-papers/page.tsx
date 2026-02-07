import type { Metadata } from 'next'
import InternalPapersContent from '@/components/InternalPapersContent'
import type { InternalPaper } from '@/lib/papers'
import papersData from '@/data/internal-papers.json'

export const metadata: Metadata = {
  title: 'Internal Research Papers',
  description: 'Original research papers and publications from the Average Joes Lab community, advancing knowledge through democratized science and citizen research.',
  alternates: {
    canonical: '/internal-papers/',
  },
}

export default function InternalPapersPage() {
  const papers = (papersData || []) as InternalPaper[]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-accent-50"></div>
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Internal Research
              <span className="text-accent-500 block">Papers</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Original research papers and publications from the Average Joes Lab community, advancing knowledge through democratized science and citizen research.
            </p>
          </div>
        </div>
      </section>

      <InternalPapersContent papers={papers} />
    </div>
  )
}
