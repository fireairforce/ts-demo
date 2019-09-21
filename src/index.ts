import axios, { AxiosResponse } from "axios";
import colors from "colors";
import commander from "commander";
import { key } from "../secret";

const command = commander
  .version("0.1.0")
  .option("-c --city [name]", "Add city name")
  .description("天气预报应用")
  .parse(process.argv);

if (process.argv.slice(3).length === 0) {
  command.outputHelp(colors.red);
  process.exit();
}

interface IWeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: ILife[];
}

interface ILife {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

const URL = `https://restapi.amap.com/v3/weather/weatherInfo`;
const { log } = console;

async function getWeather(city: string) {
  try {
    const url = `${URL}?city=${encodeURI(city)}&key=${key}`;
    const res: AxiosResponse<IWeatherResponse> = await axios.get(url);
    const live = res.data.lives[0];
    log(colors.white(live.reporttime));
    log(colors.blue(`${live.province} ${live.city}`));
    log(colors.green(`${live.weather} ${live.temperature}度`));
  } catch {
    log(colors.red("天气服务出现异常"));
  }
}

getWeather(command.city);

// promise形式
// axios
//   .get(`${URL}?key=${key}&city=${encodeURI(command.city)}`)
//   .then((res: AxiosResponse<IWeatherResponse>) => {
//     //   console.log(res.data.lives[0]);
//     const live = res.data.lives[0];
//     log(colors.white(live.reporttime));
//     log(colors.blue(`${live.province} ${live.city}`));
//     log(colors.green(`${live.weather} ${live.temperature}度`));
//   })
//   .catch(() => {
//     log(colors.red(`天气服务出现异常`));
//   });
// if (!command.city) {
//   command.outputHelp();
// }
// console.log(command.city);
// yarn ts-node src/index.ts
