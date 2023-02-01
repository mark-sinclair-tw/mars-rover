import { Instr } from "models";
import { Rover } from "./rover";

describe("Instruction execution", () => {
  it("should rotate 90deg counter-clockwise given `L` instruction", () => {
    const rover = new Rover([0, 0], [1, 0]);

    rover.execute(Instr.L);

    expect(rover.orientation).toEqual([0, 1]);
  });
  it("should rotate 90deg clockwise given `R` instruction", () => {
    const rover = new Rover([0, 0], [-1, 0]);

    rover.execute(Instr.R);

    expect(rover.orientation).toEqual([0, 1]);
  });
  it("should move & update position according current orientation given `M` instruction", () => {
    const rover = new Rover([0, 0], [0, 1]);

    rover.execute(Instr.M);

    expect(rover.position).toEqual([0, 1]);
  });

  it("should execute batched instructions", () => {
    const instructionBatch = [Instr.M, Instr.R, Instr.M, Instr.L];
    const rover = new Rover([0, 0], [0, 1]);

    rover.batchExecute(instructionBatch);

    expect(rover.position).toEqual([1, 1]);
    expect(rover.orientation).toEqual([0, 1]);
  });
});
