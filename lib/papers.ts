export type InternalPaper = {
  id: number
  name: string
  abstract: string
  authors: string[]
  doi: string | null
  focusAreas: string[]
  githubRepo: string | null
  notes: string
  publicationDate: string
  status: string
  arxivId: string | null
}

export type ExternalPaper = {
  id: number
  title: string
  doi: string | null
  arxivId: string | null
  authors: string[]
  journal: string
  publicationYear: number
  researchArea: string[]
  reproductionStatus: string
  priority: string
  abstractUrl: string | null
  pdfUrl: string | null
  repository: string | null
  attributionText: string
  notes: string
}

export const focusAreaColors: Record<string, string> = {
  'optimization': '#4299e1',
  'Optimization': '#4299e1',
  'behavioral': '#48bb78',
  'Behavioral': '#48bb78',
  'interpretability': '#ed8936',
  'Interpretability': '#ed8936',
  'security': '#f56565',
  'Security': '#f56565',
  'interoperability': '#9f7aea',
  'Interoperability': '#9f7aea',
  'sota': '#38b2ac',
  'SOTA': '#38b2ac',
  'State of the Art': '#38b2ac',
}

export const statusColors: Record<string, string> = {
  'Published': '#48bb78',
  'In Review': '#ed8936',
  'In Progress': '#4299e1',
  'Proposed': '#718096',
}

export const reproductionStatusColors: Record<string, string> = {
  'Triaged': '#4299e1',
  'In Progress': '#ed8936',
  'Reproduced': '#48bb78',
  'Not Started': '#718096',
  'Completed': '#48bb78',
  'Failed': '#f56565',
  'Not Applicable': '#718096',
}

export const priorityColors: Record<string, string> = {
  'P0': '#f56565',
  'P1': '#ed8936',
  'P2': '#ed8936',
  'P3': '#718096',
}

export const researchAreaColors: Record<string, string> = {
  'Harness Engineering': '#4299e1',
  'Agent Architectures': '#ecc94b',
  'Agent Evaluation': '#9f7aea',
  'Model Efficiency': '#48bb78',
  'Interpretability & Safety': '#f56565',
}

export function getFocusAreaColor(area: string): string {
  return focusAreaColors[area] ?? '#718096'
}

export function getStatusColor(status: string): string {
  return statusColors[status] ?? '#718096'
}

export function getReproductionStatusColor(status: string): string {
  return reproductionStatusColors[status] ?? '#718096'
}

export function getPriorityColor(priority: string): string {
  return priorityColors[priority] ?? '#718096'
}

export function getResearchAreaColor(area: string): string {
  return researchAreaColors[area] ?? '#718096'
}
