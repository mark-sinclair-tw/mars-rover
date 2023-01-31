console.log();

type Plateau = {
  width: number;
  height: number;
};

type Config = {
  plateau: Plateau;
  rovers: Rover[];
  instructions: string[];
};

class Rover {
  position: [number, number];
  orientation: [number, number];

  constructor(position: [number, number], orientation: [number, number]) {
    this.position = position;
    this.orientation = orientation;
  }
}

const run = () => {
  console.log("Welcome to Mars!");
};

run();

const loadConfig = (input: string): Config => {
  const lines = input.split("\n");

  const [widthStr, heightStr] = lines[0].split(/\s+/);
  const [width, height] = [parseInt(widthStr), parseInt(heightStr)];

  return {
    plateau: { width, height },
    rovers: undefined as any,
    instructions: undefined as any,
  };
};

export { Config, loadConfig, Plateau };
