import { Rover } from "./rover";

type Plateau = {
  maxX: number;
  maxY: number;
};

enum Instr {
  L = "L",
  R = "R",
  M = "M",
  B = "B",
  l = "l",
  r = "r",
}

function doesPlateauContain(
  { maxX, maxY }: Plateau,
  [x, y]: [number, number]
): boolean {
  return 0 <= x && x <= maxX && 0 <= y && y <= maxY;
}

export { Rover, Plateau, Instr, doesPlateauContain };
