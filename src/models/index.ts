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

export { Rover, Plateau, Instr };
