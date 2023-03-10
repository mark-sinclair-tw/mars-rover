import { Instr } from "models";
import { Environment, Rover } from "./rover";

const ENVIRONMENT: Environment = {
  plateau: { maxX: 10, maxY: 10 },
};

describe("Instruction execution", () => {
  it("should rotate 90deg counter-clockwise given `L` instruction", () => {
    const rover = new Rover([0, 0], "E");

    rover.execute(Instr.L, ENVIRONMENT);

    expect(rover.orientation()).toEqual("N");

    rover.execute(Instr.L, ENVIRONMENT);

    expect(rover.orientation()).toEqual("W");
  });
  it("should rotate 90deg clockwise given `R` instruction", () => {
    const rover = new Rover([0, 0], "W");

    rover.execute(Instr.R, ENVIRONMENT);

    expect(rover.orientation()).toEqual("N");

    rover.execute(Instr.R, ENVIRONMENT);

    expect(rover.orientation()).toEqual("E");
  });
  it("should move & update position according current orientation given `M` instruction", () => {
    const rover = new Rover([0, 0], "N");

    rover.execute(Instr.M, ENVIRONMENT);
    rover.execute(Instr.M, ENVIRONMENT);
    rover.execute(Instr.M, ENVIRONMENT);
    rover.execute(Instr.M, ENVIRONMENT);

    expect(rover.position).toEqual([0, 4]);
  });

  it("should remain in original place given `M` then `B` instruction", () => {
    const rover = new Rover([0, 0], "N");

    rover.execute(Instr.M, ENVIRONMENT);
    rover.execute(Instr.M, ENVIRONMENT);
    rover.execute(Instr.B, ENVIRONMENT);
    rover.execute(Instr.B, ENVIRONMENT);

    expect(rover.position).toEqual([0, 0]);
  });

  it("should execute batched instructions", () => {
    const instructionBatch = [Instr.M, Instr.R, Instr.M, Instr.L];
    const rover = new Rover([0, 0], "N");

    rover.batchExecute(instructionBatch, ENVIRONMENT);

    expect(rover.position).toEqual([1, 1]);
    expect(rover.orientation()).toEqual("N");
  });

  it("should detect when a rover falls off the plateau forwards", () => {
    const rover = new Rover([0, 0], "N");
    const plateau = { maxX: 0, maxY: 0 };

    rover.execute(Instr.M, { plateau });

    expect(rover.isFallen).toBe(true);
  });

  it("should detect when a rover falls off the plateau backwards", () => {
    const rover = new Rover([0, 0], "N");
    const plateau = { maxX: 0, maxY: 0 };

    rover.execute(Instr.B, { plateau });

    expect(rover.isFallen).toBe(true);
  });

  it("should stop moving when it falls off the plateau", () => {
    const rover = new Rover([0, 0], "N");
    const plateau = { maxX: 0, maxY: 0 };
    rover.execute(Instr.M, { plateau });
    const fallPosition = [...rover.position];

    rover.execute(Instr.M, { plateau });

    expect(rover.position).toStrictEqual(fallPosition);
  });

  it("should stop turning when it falls off the plateau", () => {
    const rover = new Rover([0, 0], "N");
    const plateau = { maxX: 0, maxY: 0 };
    rover.execute(Instr.M, { plateau });

    rover.execute(Instr.L, { plateau });

    expect(rover.orientation()).toStrictEqual("N");
  });
});
