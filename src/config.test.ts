import { loadConfig } from "config";
import { Instr } from "models";

describe("loadConfig", () => {
  const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

  it("should read plateua dimensions from input", () => {
    const config = loadConfig(input);
    expect(config.plateau.height).toEqual(5);
    expect(config.plateau.width).toEqual(5);
  });

  it("should read rovers' initial location from input", () => {
    const config = loadConfig(input);

    expect(config.rovers).toHaveLength(2);
    expect(config.rovers[0].position).toEqual([1, 2]);
    expect(config.rovers[1].position).toEqual([3, 3]);
  });

  it("should read rovers' initial orientations from input", () => {
    const config = loadConfig(input);

    expect(config.rovers).toHaveLength(2);
    expect(config.rovers[0].orientation).toEqual([0, 1]);
    expect(config.rovers[1].orientation).toEqual([1, 0]);
  });

  it("should read rovers' instructions from input", () => {
    const expectedInstructions = [
      [
        Instr.L,
        Instr.M,
        Instr.L,
        Instr.M,
        Instr.L,
        Instr.M,
        Instr.L,
        Instr.M,
        Instr.M,
      ],
      [
        Instr.M,
        Instr.M,
        Instr.R,
        Instr.M,
        Instr.M,
        Instr.R,
        Instr.M,
        Instr.R,
        Instr.R,
        Instr.M,
      ],
    ];
    const config = loadConfig(input);

    expect(config.instructions).toEqual(expectedInstructions);
  });
});
