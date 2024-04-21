import { WeatherInfo } from "@/app/api/external/fetchWeather";
import Image from "next/image";

export const WeatherCard = ({ weatherInfo }: {weatherInfo: WeatherInfo}) => {
    return (
      <div className="bg-slate-700 p-4 rounded-10 m-10">
        <h2 className="text-white text-xl">Weather in {weatherInfo.location.name}</h2>
        <p className="text-slate-300">Temperature: {weatherInfo.current.temp_c}*C</p>
        <Image width={25} height={25} src={`https:${weatherInfo.current.condition.icon}`} alt={weatherInfo.current.condition.text} />
      </div>
    );
  }