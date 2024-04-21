'use client'
 
import { ReactNode, useState } from 'react';
import { useUIState, useActions } from "ai/rsc";
import { type AI } from './AI';
 
type Message = {
  id: number
  display: ReactNode
}

export default function Page() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
 
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {
        // View messages in UI state
        messages.map((m: Message) => (
        <div key={m.id} className="whitespace-pre-wrap">
            {m.display}
          </div>
        ))
      }
 
      <form onSubmit={async (e) => {
        e.preventDefault();
 
        // Add user message to UI state
        setMessages((currentMessages: Message[]) => [
          ...currentMessages,
          {
            id: Date.now(),
            display: <div>{inputValue}</div>,
          },
        ]);
 
        // Submit and get response message
        const responseMessage = await submitUserMessage(inputValue);
        setMessages((currentMessages: Message[]) => [
          ...currentMessages,
          responseMessage,
        ]);
 
        setInputValue('');
      }}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border-solid border-2 border-grey-light text-black rounded shadow-xl"
          value={inputValue}
          placeholder="Say something..."
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
        />
      </form>
    </div>
  )
}