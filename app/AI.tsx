import { ChatCompletionMessageParam } from "ai/prompts";
import { createAI } from "ai/rsc";
import {actions} from './actions'

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: ChatCompletionMessageParam[] = [];
  
  // The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
  const initialUIState: {
    id: number;
    display: React.ReactNode;
  }[] = [];
  
  // AI is a provider you wrap your application with so you can access AI and UI state in your components.
  export const AI = createAI({
    actions,
    // Each state can be any shape of object, but for chat applications
    // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
    initialUIState,
    initialAIState,
  });