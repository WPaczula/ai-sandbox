import { OpenAI } from "openai";
import { getMutableAIState, render } from "ai/rsc";
import { z } from "zod";
import { fetchWeather } from "./api/external/fetchWeather";
import { WeatherCard } from "./components/WeatherCard";
import { AI } from "./AI";
import { ReactNode } from "react";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function Loader() {
  return <div>Loading...</div>;
}

async function submitUserMessage(userInput: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: userInput,
    },
  ]);

  const ui = render({
    model: "gpt-4-0125-preview",
    provider: openai,
    messages: [
      {
        role: "system",
        content:
          "You are an assistant knowing the weather in Poland. If the area is not located in Poland say that you do not know. If there is any question not related to the weather, say you only speak about the weather.",
      },
      ...aiState.get(),
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content,
          },
        ]);
      }

      return <p>{content}</p>;
    },
    tools: {
      get_weather_info: {
        description: "Get the weather in defined location",
        parameters: z
          .object({
            location: z.string().describe("the location"),
          })
          .required(),
        render: async function* ({ location }) {
          // Show a loader on the client while we wait for the response.
          yield <Loader />;

          // Fetch the weather information from an external API.
          try {
            const weatherInfo = await fetchWeather(location);

            aiState.done([
              ...aiState.get(),
              {
                role: "function",
                name: "get_weather_info",
                // Content can be any string to provide context to the LLM in the rest of the conversation.
                content: JSON.stringify(weatherInfo),
              },
            ]);

            // Return weather to the client.
            return <WeatherCard weatherInfo={weatherInfo} />;
          } catch (error) {
            return <p className="text-red-600">Error fetching the weather</p>;
          }
        },
      },
    },
  });

  return {
    id: Date.now(),
    display: ui,
  };
}

export const actions: {
  submitUserMessage: (input: string) => Promise<{id: number, display: ReactNode}>
} = {
  submitUserMessage
}


