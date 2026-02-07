'use client'

import { useState } from 'react'
import TypeformEmbed from '@/components/TypeformEmbed'
import type { ExternalPaper } from '@/lib/papers'
import { getResearchAreaColor, getReproductionStatusColor, getPriorityColor } from '@/lib/papers'

type Props = {
  papers: ExternalPaper[]
}

type SortOption = {
  id: string
  label: string
  field: 'publicationYear' | 'title'
  order: 'asc' | 'desc'
}

const SORT_OPTIONS: SortOption[] = [
  { id: 'year-desc', label: 'Year (Newest First)', field: 'publicationYear', order: 'desc' },
  { id: 'year-asc', label: 'Year (Oldest First)', field: 'publicationYear', order: 'asc' },
  { id: 'title-asc', label: 'Title (A-Z)', field: 'title', order: 'asc' },
  { id: 'title-desc', label: 'Title (Z-A)', field: 'title', order: 'desc' },
]

function sortPapers(papers: ExternalPaper[], sortOption: string): ExternalPaper[] {
  const option = SORT_OPTIONS.find((opt) => opt.id === sortOption)
  if (!option) return papers

  return [...papers].sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    if (option.field === 'publicationYear') {
      aValue = a.publicationYear || 0
      bValue = b.publicationYear || 0
    } else {
      aValue = (a.title || '').toLowerCase()
      bValue = (b.title || '').toLowerCase()
    }

    if (option.order === 'desc') {
      return bValue > aValue ? 1 : bValue < aValue ? -1 : 0
    }
    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
  })
}

export default function ExternalPapersContent({ papers }: Props) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState('year-desc')

  // Generate research areas dynamically
  const allAreas = Array.from(
    new Set(
      papers.flatMap((p) =>
        Array.isArray(p.researchArea) ? p.researchArea.filter((a) => a?.trim()) : []
      )
    )
  ).sort()

  const researchAreas = [
    { id: 'all', label: 'All Papers', color: '#718096' },
    ...allAreas.map((area) => ({
      id: area,
      label: area,
      color: getResearchAreaColor(area),
    })),
  ]

  function handleFilterToggle(filterId: string) {
    if (filterId === 'all') {
      setSelectedFilters([])
    } else if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filterId))
    } else {
      setSelectedFilters([...selectedFilters, filterId])
    }
  }

  const filteredPapers =
    selectedFilters.length === 0
      ? papers
      : papers.filter(
          (paper) =>
            paper.researchArea &&
            Array.isArray(paper.researchArea) &&
            selectedFilters.every((filter) => paper.researchArea.includes(filter))
        )

  const sortedPapers = sortPapers(filteredPapers, selectedSort)

  // Stats
  const getReproStatusCount = (status: string) =>
    papers.filter((p) => p.reproductionStatus?.toLowerCase() === status.toLowerCase()).length

  const stats = [
    { label: 'Total Papers', value: papers.length },
    { label: 'Triaged', value: getReproStatusCount('Triaged') },
    { label: 'In Progress', value: getReproStatusCount('In Progress') },
    { label: 'Reproduced', value: getReproStatusCount('Reproduced') },
  ]

  return (
    <>
      {/* Stats */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Papers */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Browse Papers by Research Area</h2>
            <p className="text-slate-600">
              Select one or more research areas to filter papers. Papers must match ALL selected areas.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {researchAreas.map((area) => {
              const isSelected =
                area.id === 'all'
                  ? selectedFilters.length === 0
                  : selectedFilters.includes(area.id)

              return (
                <button
                  key={area.id}
                  onClick={() => handleFilterToggle(area.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    isSelected
                      ? 'text-white border-transparent'
                      : 'text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                  style={isSelected ? { backgroundColor: area.color } : undefined}
                >
                  {area.label}
                  {area.id !== 'all' && selectedFilters.includes(area.id) && ' ✓'}
                </button>
              )
            })}
          </div>

          {/* Sort */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2">
              <label htmlFor="ext-sort-select" className="text-sm text-slate-600">
                Sort by:
              </label>
              <select
                id="ext-sort-select"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-700"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Papers Grid */}
          {sortedPapers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-slate-500 mb-2">No papers found</p>
              <p className="text-slate-400">No papers match the selected filter. Try selecting a different research area.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedPapers.map((paper) => {
                const reproColor = getReproductionStatusColor(paper.reproductionStatus)
                const priColor = getPriorityColor(paper.priority)
                const paperLink = paper.abstractUrl?.trim()
                  || (paper.arxivId?.trim() && paper.arxivId !== '0'
                    ? `https://arxiv.org/abs/${paper.arxivId.replace('arXiv:', '')}`
                    : null)
                  || (paper.doi?.trim() ? `https://doi.org/${paper.doi}` : null)
                const pdfLink = paper.pdfUrl?.trim() || null
                const codeLink = paper.repository?.trim() || null

                return (
                  <div key={paper.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs text-slate-500">
                        {paper.publicationYear || 'Unknown Year'}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span
                        className="text-xs font-medium text-white px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: reproColor }}
                      >
                        Reproduction: {paper.reproductionStatus || 'Unknown'}
                      </span>
                      <span
                        className="text-xs font-medium text-white px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: priColor }}
                      >
                        {paper.priority || 'Unknown'}
                      </span>
                      {Array.isArray(paper.researchArea) &&
                        paper.researchArea.map((area) => (
                          <span
                            key={area}
                            className="text-xs font-medium text-white px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: getResearchAreaColor(area) }}
                          >
                            {area}
                          </span>
                        ))}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {paper.title || 'Untitled Paper'}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">
                      {(paper.authors || []).length > 0
                        ? `By ${paper.authors.join(', ')}`
                        : 'Authors TBD'}
                    </p>
                    {paper.journal && (
                      <p className="text-sm text-slate-500 mb-2">
                        Published in: <strong>{paper.journal}</strong>
                      </p>
                    )}
                    {paper.attributionText && (
                      <p className="text-sm text-slate-500 mb-2">
                        <strong>Citation:</strong> {paper.attributionText}
                      </p>
                    )}
                    {paper.notes && (
                      <p className="text-sm text-slate-500 mb-3">
                        <strong>Notes:</strong> {paper.notes}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {paperLink && (
                        <a
                          href={paperLink}
                          className="text-sm font-medium text-white bg-accent-500 hover:bg-accent-600 px-3 py-1.5 rounded-lg transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Paper
                        </a>
                      )}
                      {pdfLink && (
                        <a
                          href={pdfLink}
                          className="text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          PDF
                        </a>
                      )}
                      {codeLink && (
                        <a
                          href={codeLink}
                          className="text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Code
                        </a>
                      )}
                      {!paperLink && !pdfLink && !codeLink && (
                        <span className="text-sm text-slate-400">
                          Links will be available when processed
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Submit Form */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Suggest Papers for Reproduction</h2>
            <p className="text-slate-600 mb-6">
              Found an interesting paper that should be reproduced? Help us validate and build upon existing research by suggesting papers for our reproduction pipeline.
            </p>
            <TypeformEmbed formId="01K3KYXX0T6VWNG0C3DJB44DWF" />
          </div>
        </div>
      </section>
    </>
  )
}
