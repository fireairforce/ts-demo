// console.log(`Hello typescript`);

// console.log("qaq");

// console.log(`hhh`);

import colors from "colors";
import commander from "commander";

const command = commander
  .version("0.1.0")
  .option("-c --city [name]", "Add city name")
  .parse(process.argv);

if (process.argv.slice(3).length === 0) {
  command.outputHelp(colors.red);
  process.exit();
}

// if (!command.city) {
//   command.outputHelp();
// }
// console.log(command.city);
// yarn ts-node src/index.ts -h
