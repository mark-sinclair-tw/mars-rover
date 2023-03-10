import { Orientation } from "config";
import { Direction, doesPlateauContain, Instr, Plateau } from "models";

export class Rover {
  position: [number, number];
  private direction: Direction;
  isFallen: boolean;

  constructor(position: [number, number], orientation: Orientation) {
    this.position = position;
    this.direction = new Direction(orientation);
    this.isFallen = false;
  }

  execute = (instr: Instr, { plateau }: Environment) => {
    if (this.isFallen) {
      return;
    }

    switch (instr) {
      case Instr.L: {
        this.direction.turnLeft90();
        return;
      }
      case Instr.R: {
        this.direction.turnRight90();
        return;
      }
      case Instr.M: {
        const orientation = this.direction.toVector();
        this.position[0] += orientation[0];
        this.position[1] += orientation[1];

        if (!doesPlateauContain(plateau, this.position)) {
          this.isFallen = true;
        }
        return;
      }
      case Instr.B: {
        const orientation = this.direction.toVector();
        this.position[0] -= orientation[0];
        this.position[1] -= orientation[1];

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

  public orientation(): Orientation {
    return this.direction.orientation;
  }
}

export interface Environment {
  plateau: Plateau;
}

// Note: Module 4: collisions can cause chain reactions
// - what happens when collisions chain
// - what happens when pushed rovers hit rocks
