'use client'

import { Chat } from '@/components/chat'
import { useChat } from 'ai/react'

function Page() {
  const { messages, handleInputChange, input, handleSubmit } = useChat()

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <Chat
        inputValue={input}
        onInputChange={handleInputChange}
        messages={messages.map((m) => ({
          createdAt: m.createdAt || new Date(),
          id: m.id,
          ui: m.content,
        }))}
      />
    </form>
  )
}

export default Page
