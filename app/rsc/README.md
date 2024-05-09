# Generative UI

Some models like GPT-3.5+ are able to call functions instead of returning text. Vercel's ai library uses this to stream react components instead of text.

Let's go to their docs to understand how we can generate UI using [ai sdk](https://sdk.vercel.ai/docs/concepts/ai-rsc)

## AI state vs UI state

AI state is the whole context of the conversation. It contains messages with the role of each "person" speaking. There are 4 roles:
1. system - initial persona creation etc.
2. user - user message
3. asistant - responses of the AI
4. function - results of the function/tool call (you'll see an example with the weather)

UI state is what we show on the UI - visible messages (user and asistant role) which are streamed to the UI.
