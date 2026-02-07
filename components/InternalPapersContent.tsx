'use client'

import { useState } from 'react'
import TypeformEmbed from '@/components/TypeformEmbed'
import type { InternalPaper } from '@/lib/papers'
import { getFocusAreaColor, getStatusColor } from '@/lib/papers'

type Props = {
  papers: InternalPaper[]
}

type SortOption = {
  id: string
  label: string
  field: 'publicationDate' | 'name'
  order: 'asc' | 'desc'
}

const SORT_OPTIONS: SortOption[] = [
  { id: 'date-desc', label: 'Date (Newest First)', field: 'publicationDate', order: 'desc' },
  { id: 'date-asc', label: 'Date (Oldest First)', field: 'publicationDate', order: 'asc' },
  { id: 'title-asc', label: 'Title (A-Z)', field: 'name', order: 'asc' },
  { id: 'title-desc', label: 'Title (Z-A)', field: 'name', order: 'desc' },
]

function sortPapers(papers: InternalPaper[], sortOption: string): InternalPaper[] {
  const option = SORT_OPTIONS.find((opt) => opt.id === sortOption)
  if (!option) return papers

  return [...papers].sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    if (option.field === 'publicationDate') {
      aValue = a.publicationDate ? new Date(a.publicationDate).getTime() : 0
      bValue = b.publicationDate ? new Date(b.publicationDate).getTime() : 0
    } else {
      aValue = (a.name || '').toLowerCase()
      bValue = (b.name || '').toLowerCase()
    }

    if (option.order === 'desc') {
      return bValue > aValue ? 1 : bValue < aValue ? -1 : 0
    }
    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
  })
}

export default function InternalPapersContent({ papers }: Props) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState('date-desc')

  // Generate focus areas dynamically
  const allFocusAreas = Array.from(
    new Set(papers.flatMap((p) => p.focusAreas || []))
  ).sort()

  const focusAreas = [
    { id: 'all', label: 'All Papers', color: '#718096' },
    ...allFocusAreas.map((area) => ({
      id: area,
      label: area,
      color: getFocusAreaColor(area),
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

  // Filter: papers must have ALL selected focus areas
  const filteredPapers =
    selectedFilters.length === 0
      ? papers
      : papers.filter((paper) =>
          selectedFilters.every((filter) => paper.focusAreas?.includes(filter))
        )

  const sortedPapers = sortPapers(filteredPapers, selectedSort)

  // Stats
  const getStatusCount = (status: string) =>
    papers.filter((p) => p.status?.toLowerCase() === status.toLowerCase()).length

  const stats = [
    { label: 'Total Papers', value: papers.length },
    { label: 'Proposed', value: getStatusCount('Proposed') },
    { label: 'In Progress', value: getStatusCount('In Progress') },
    { label: 'Published', value: getStatusCount('Published') },
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
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Browse Research by Focus Area</h2>
            <p className="text-slate-600">
              Select one or more focus areas to filter papers. Papers must match ALL selected areas.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {focusAreas.map((area) => {
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
              <label htmlFor="sort-select" className="text-sm text-slate-600">
                Sort by:
              </label>
              <select
                id="sort-select"
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
              <p className="text-slate-400">No papers match the selected filter. Try selecting a different focus area.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedPapers.map((paper) => {
                const statusColor = getStatusColor(paper.status)
                const paperLink = paper.arxivId
                  ? `https://arxiv.org/abs/${paper.arxivId.replace('arXiv:', '')}`
                  : paper.doi
                    ? `https://doi.org/${paper.doi}`
                    : null
                const codeLink = paper.githubRepo?.trim() || null

                return (
                  <div key={paper.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className="text-xs font-medium text-white px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: statusColor }}
                      >
                        {paper.status || 'Unknown'}
                      </span>
                      <span className="text-xs text-slate-500">
                        {paper.publicationDate
                          ? new Date(paper.publicationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Date not available'}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(paper.focusAreas || []).map((area) => (
                        <span
                          key={area}
                          className="text-xs font-medium text-white px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: getFocusAreaColor(area) }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {paper.name || 'Untitled Paper'}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">
                      {(paper.authors || []).length > 0
                        ? `By ${paper.authors.join(', ')}`
                        : 'Authors TBD'}
                    </p>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-3">
                      {paper.abstract || 'No abstract available.'}
                    </p>
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
                      {!paperLink && !codeLink && (
                        <span className="text-sm text-slate-400">
                          Links will be available when published
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
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Submit a Novel Paper Idea</h2>
            <p className="text-slate-600 mb-6">
              Have an innovative research idea? Share it with the Average Joes Lab community! We welcome novel concepts that advance open science and democratize research.
            </p>
            <TypeformEmbed formId="01K3KW7AJ1PZ6EPKVZ11NPJCA5" />
          </div>
        </div>
      </section>
    </>
  )
}
