import { ChatCompletionMessageParam } from 'ai/prompts'
import { createAI } from 'ai/rsc'
import { actions } from './actions'
import { Message } from '@/lib/message'

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: ChatCompletionMessageParam[] = []

// The initial UI state that the client will keep track of.
const initialUIState: Message[] = []

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
  actions,
  initialUIState,
  initialAIState,
})
