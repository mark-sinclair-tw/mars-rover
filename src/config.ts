import { Instr, Plateau, Rover } from "models";

const loadConfig = (input: string): Config => {
  const lines = input.split("\n");
  validateLines(lines);

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
      const rover = parseRover(plateau, lines[i]);

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

type Config = {
  plateau: Plateau;
  rovers: Rover[];
  instructions: Instr[][];
};

class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ConfigError.name;
  }
}

const ORIENTATIONS = ["N", "S", "E", "W"] as const;
type Orientation = (typeof ORIENTATIONS)[number];
const ORIENTATION_MAP: Record<Orientation, [number, number]> = {
  N: [0, 1],
  S: [0, -1],
  E: [1, 0],
  W: [-1, 0],
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
      default: {
        throw new ConfigError(`Unknown Instuction '${ch}'`);
      }
    }
  }

  return instructionBatch;
};

const parseRover = (plateau: Plateau, line: string): Rover => {
  const [xStr, yStr, orientationStr] = line.split(" ");

  const position: [number, number] = [parseInt(xStr), parseInt(yStr)];
  validatePosition(position, plateau, [xStr, yStr]);

  if (!validateOrientation(orientationStr)) {
    throw new ConfigError(`Unknown orientation '${orientationStr}'`);
  }
  const orientation = ORIENTATION_MAP[orientationStr];

  return new Rover(position, orientation);
};

function validatePosition(
  position: [number, number],
  plateau: Plateau,
  [xStr, yStr]: [string, string]
) {
  if (isNaN(position[0]) || isNaN(position[1])) {
    throw new ConfigError(`Invalid rover coordinates: (${xStr}, ${yStr})`);
  }
  if (position[0] < 0 || position[1] < 0) {
    throw new ConfigError(`Negative rover coordinates: (${xStr}, ${yStr})`);
  }
  if (position[0] > plateau.width || position[1] > plateau.height) {
    throw new ConfigError(
      `Out-of-bounds rover coordinates: (${xStr}, ${yStr})`
    );
  }
}

function validateLines(lines: string[]) {
  if ((lines.length - 1) % 2) {
    throw new ConfigError("Invalid number of lines");
  }
}

function validateOrientation(str: string): str is Orientation {
  return !!ORIENTATIONS.find((orientation) => orientation === str);
}

export {
  Config,
  loadConfig,
  Orientation,
  ORIENTATIONS,
  ORIENTATION_MAP,
  ConfigError,
};
