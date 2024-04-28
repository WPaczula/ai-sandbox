import { ReactNode } from 'react'

export type Message = {
  id: string
  ui: ReactNode
  createdAt: Date
}
