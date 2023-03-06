import { doesPlateauContain, Instr, Plateau } from "models";
import { arraysEqual } from "utils";

export class Rover {
  position: [number, number];
  orientation: [number, number];
  isFallen: boolean;

  constructor(position: [number, number], orientation: [number, number]) {
    this.position = position;
    this.orientation = orientation;
    this.isFallen = false;
  }

  execute = (instr: Instr, { plateau }: Environment) => {
    if (this.isFallen) {
      return;
    }

    switch (instr) {
      case Instr.L: {
        this.orientation = counterClockwise(this.orientation);
        return;
      }
      case Instr.R: {
        this.orientation = clockwise(this.orientation);
        return;
      }
      case Instr.M: {
        this.position[0] += this.orientation[0];
        this.position[1] += this.orientation[1];
        if (!doesPlateauContain(plateau, this.position)) {
          this.isFallen = true;
        }
        return;
      }
      case Instr.B: {
        this.position[0] -= this.orientation[0];
        this.position[1] -= this.orientation[1];
        if (!doesPlateauContain(plateau, this.position)) {
          this.isFallen = true;
        }
        return;
      }
      default: {
        throw new Error(`Unknown instruction: '${instr}'`);
      }
    }
  };

  batchExecute = (instrs: Instr[], env: Environment) => {
    for (const instr of instrs) {
      this.execute(instr, env);
    }
  };
}

export interface Environment {
  plateau: Plateau;
}

// TODO: Either switch more readable if-else chains or switch statements
// or figure out a way to make modular arithmetic not hideous

const clockwise = (orientation: [number, number]): [number, number] => {
  const current = ORIENTATION_CYCLE.findIndex((elem) =>
    arraysEqual(elem, orientation)
  );
  if (current === -1) {
    throw new Error("Unknown orientation");
  }

  const nextIdx = (current + 1) % ORIENTATION_CYCLE.length;
  return ORIENTATION_CYCLE[nextIdx];
};

const counterClockwise = (orientation: [number, number]): [number, number] => {
  const current = ORIENTATION_CYCLE.findIndex((elem) =>
    arraysEqual(elem, orientation)
  );
  if (current === -1) {
    throw new Error(`"Unknown orientation": ${orientation}`);
  }

  const prevCandidate = current - 1;
  const prevIdx =
    prevCandidate < 0
      ? ORIENTATION_CYCLE.length + prevCandidate
      : prevCandidate;

  return ORIENTATION_CYCLE[prevIdx];
};

const ORIENTATION_CYCLE: [number, number][] = [
  [0, 1], // N
  //NE
  [1, 0], // E
  //SE
  [0, -1], // S
  //SW
  [-1, 0], // W
  //NW
];
