# Simple chat

To implement a simple chat into our app we'll use [OpenAI API](https://platform.openai.com/playground/chat)

## How to talk with OpenAI API

[OpenAI Docs](https://platform.openai.com/docs/guides/text-generation/chat-completions-api?lang=node.js)

## Crucial mechanisms

Two crucial things to consider when implementing a chat into the app from the technological standpoint:

1. [Streaming](https://sdk.vercel.ai/docs/concepts/streaming)

Important from the UX point of view - generating responses can take time and we need to keep the user interested

2. [Back-pressure & cancellation](https://sdk.vercel.ai/docs/concepts/backpressure-and-cancellation)

This is important from the technological standpoint. We need to be able to handle users closing the tab, getting bored and navigating away etc without generating unnecessary costs. Let's have a look at the example prepared by vercel that describes this issue.
