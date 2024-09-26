import { PaintingModel } from '@/types/Paintings'

export type ResponsiveData = {
  config: {}
  data: []
  info: {}
  pagination?: PaginationData
}

export type ResponsivePaintingData = {
  config: {}
  data: PaintingModel
  info: {}
  pagination?: PaginationData
}

export type PaginationData = {
  current_page: string
  limit: string
  next_url: string
  offset: string
  total: string
  total_pages: string
}

export const url = 'https://api.artic.edu/api/v1/'
