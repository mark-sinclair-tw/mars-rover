import { Rover } from "./rover";

type Plateau = {
  width: number;
  height: number;
};

enum Instr {
  L = "L",
  R = "R",
  M = "M",
}

function doesPlateauContain(
  { width, height }: Plateau,
  [x, y]: [number, number]
): boolean {
  return 0 <= x && x <= width && 0 <= y && y <= height;
}

export { Rover, Plateau, Instr, doesPlateauContain };
