export type WeatherInfo = {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    is_day: boolean;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export const fetchWeather = async (query: string) => {
  if (query === 'Warsaw') {
    throw new Error('BOOM')
  }
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(
      query
    )}&lang=en-US&key=${encodeURIComponent(process.env.WEATHER_API_KEY!)}`,
    {
        headers: {
            accept: 'application/json'
        }
    }
  );

  return response.json() as Promise<WeatherInfo>;
};
