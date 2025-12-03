export interface Bookmark {
  id: string
  title: string
  url: string
  group: string
  tags?: string[]
  description?: string
  faviconUrl?: string
  createdAt: string
}
