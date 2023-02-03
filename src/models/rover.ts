import { Instr } from "models";

class Rover {
  position: [number, number];
  orientation: [number, number];

  constructor(position: [number, number], orientation: [number, number]) {
    this.position = position;
    this.orientation = orientation;
  }

  execute = (instr: Instr) => {
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
        return;
      }
      default: {
        throw new Error(`Unknown instruction: '${instr}'`);
      }
    }
  };

  batchExecute = (instrs: Instr[]) => {
    for (const instr of instrs) {
      this.execute(instr);
    }
  };
}

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
  [1, 0], // E
  [0, -1], // S
  [-1, 0], // W
];

function arraysEqual<T>(left: T[], right: T[]) {
  if (left === right) return true;
  if (left == null || right == null) return false;
  if (left.length !== right.length) return false;

  for (let i = 0; i < left.length; ++i) {
    if (left[i] !== right[i]) return false;
  }
  return true;
}

export { Rover, arraysEqual };
