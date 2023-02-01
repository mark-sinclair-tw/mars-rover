type Plateau = {
  width: number;
  height: number;
};

enum Instr {
  L = "L",
  R = "R",
  M = "M",
}

class Rover {
  position: [number, number];
  orientation: [number, number];

  constructor(position: [number, number], orientation: [number, number]) {
    this.position = position;
    this.orientation = orientation;
  }
}

export { Rover, Plateau, Instr };
