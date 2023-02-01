import { Instr, Plateau, Rover } from "models";

type Config = {
  plateau: Plateau;
  rovers: Rover[];
  instructions: string[][];
};

const loadConfig = (input: string): Config => {
  const lines = input.split("\n");

  const [widthStr, heightStr] = lines[0].split(" ");
  const [width, height] = [parseInt(widthStr), parseInt(heightStr)];
  const plateau = { width, height };

  const rovers = [];
  const instructionSeries: Instr[][] = [];
  for (let i = 1; i < lines.length; ++i) {
    if (i % 2 == 0) {
      const instrChars = Array.from(lines[i]);
      const instructionSeriesIdx = i / 2 - 1;

      for (const ch of instrChars) {
        switch (ch) {
          case "M": {
            instructionSeries[instructionSeriesIdx].push(Instr.M);
            break;
          }
          case "L": {
            instructionSeries[instructionSeriesIdx].push(Instr.L);
            break;
          }
          case "R": {
            instructionSeries[instructionSeriesIdx].push(Instr.R);
            break;
          }
        }
      }
    } else {
      const [xStr, yStr, orientationStr] = lines[i].split(" ");
      const position: [number, number] = [parseInt(xStr), parseInt(yStr)];
      const orientation = ORIENTATION_MAP[orientationStr];

      rovers.push(new Rover(position, orientation));
      instructionSeries.push([]);
    }
  }

  return {
    plateau,
    rovers,
    instructions: instructionSeries,
  };
};

const ORIENTATION_MAP: Record<string, [number, number]> = {
  N: [0, 1],
  S: [0, -11],
  E: [1, 0],
  W: [-1, 0],
};

export { Config, loadConfig };
