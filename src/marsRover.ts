import * as fs from "fs";
import { Config, loadConfig } from "config";
import { Instr, Plateau, Rover } from "models";

class Driver {
  rovers: Rover[];
  plateau: Plateau;
  instructions: Instr[][];
  constructor(config: Config) {
    this.rovers = config.rovers;
    this.instructions = config.instructions;
    this.plateau = config.plateau;
  }

  run = () => {
    this.rovers.forEach((rover, idx) => {
      rover.batchExecute(this.instructions[idx]);
    });
  };
}

const run = () => {
  console.log("Welcome to Mars!");
  console.log("Reading input");

  const it = fs.readFileSync(process.stdin.fd, "utf-8");
  const config = loadConfig(it);
  const driver = new Driver(config);
  driver.run();

  for (const rover of driver.rovers) {
    process.stdout.write(
      `${rover.position[0]} ${rover.position[1]} ${rover.orientation}\n`
    );
  }
};

run();

export { Driver };
