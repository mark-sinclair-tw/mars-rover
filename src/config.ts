import { Instr, Plateau, Rover } from "models";

type Config = {
  plateau: Plateau;
  rovers: Rover[];
  instructions: Instr[][];
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
      const instructionSeriesIdx = i / 2 - 1;
      instructionSeries[instructionSeriesIdx] = parseInstructions(lines[i]);
    } else {
      const rover = parseRover(lines[i]);

      rovers.push(rover);
      instructionSeries.push([]);
    }
  }

  return {
    plateau,
    rovers,
    instructions: instructionSeries,
  };
};

const parseInstructions = (line: string): Instr[] => {
  const instructionBatch = [];
  const instrChars = Array.from(line);

  for (const ch of instrChars) {
    switch (ch) {
      case "M": {
        instructionBatch.push(Instr.M);
        break;
      }
      case "L": {
        instructionBatch.push(Instr.L);
        break;
      }
      case "R": {
        instructionBatch.push(Instr.R);
        break;
      }
    }
  }

  return instructionBatch;
};

const parseRover = (line: string): Rover => {
  const [xStr, yStr, orientationStr] = line.split(" ");
  const position: [number, number] = [parseInt(xStr), parseInt(yStr)];
  const orientation = ORIENTATION_MAP[orientationStr];

  return new Rover(position, orientation);
};

const ORIENTATION_MAP: Record<string, [number, number]> = {
  N: [0, 1],
  S: [0, -1],
  E: [1, 0],
  W: [-1, 0],
};

export { Config, loadConfig };
