import type { Metadata } from 'next'
import ExternalPapersContent from '@/components/ExternalPapersContent'
import type { ExternalPaper } from '@/lib/papers'
import papersData from '@/data/external-papers.json'

export const metadata: Metadata = {
  title: 'External Papers & Reproductions',
  description: 'Tracking, reviewing, and reproducing important research papers from the broader scientific community. Our commitment to validating existing research.',
  alternates: {
    canonical: '/external-papers/',
  },
}

export default function ExternalPapersPage() {
  const papers = (papersData || []) as ExternalPaper[]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-accent-50"></div>
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              External Papers &amp;
              <span className="text-accent-500 block">Reproductions</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Tracking, reviewing, and reproducing important research papers from the broader scientific community. Our commitment to validating and building upon existing research.
            </p>
          </div>
        </div>
      </section>

      <ExternalPapersContent papers={papers} />
    </div>
  )
}
