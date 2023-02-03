import * as fs from "fs";
import { Config, loadConfig, ORIENTATION_MAP } from "config";
import { Instr, Plateau, Rover } from "models";
import { arraysEqual } from "models/rover";

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

  report = (): string => {
    let reportStr = "";

    for (const rover of this.rovers) {
      const orientationName = Object.keys(ORIENTATION_MAP).find((key) =>
        arraysEqual(ORIENTATION_MAP[key], rover.orientation)
      );
      reportStr += `${rover.position[0]} ${rover.position[1]} ${orientationName}\n`;
    }

    return reportStr;
  };
}

const run = () => {
  console.log("Welcome to Mars!");
  console.log("Reading input");

  const input = fs.readFileSync(process.stdin.fd, "utf-8");
  const config = loadConfig(input);
  const driver = new Driver(config);

  driver.run();

  process.stdout.write(driver.report());
};

if (require.main === module) {
  run();
}

export { Driver };
