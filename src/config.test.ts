import { ConfigError, loadConfig } from "config";
import { Instr } from "models";

const VALID_INPUT = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

const VALID_INPUT_MOD_2 = `5 5
1 2 NE
MBMB
3 3 SW
lrMlrB`;

describe("loadConfig", () => {
  it("should read plateua dimensions from input", () => {
    const config = loadConfig(VALID_INPUT);
    expect(config.plateau.maxY).toEqual(5);
    expect(config.plateau.maxX).toEqual(5);
  });

  it("should read rovers' initial location from input", () => {
    const config = loadConfig(VALID_INPUT);

    expect(config.rovers).toHaveLength(2);
    expect(config.rovers[0].position).toEqual([1, 2]);
    expect(config.rovers[1].position).toEqual([3, 3]);
  });

  it("should read rovers' initial orientations from input", () => {
    const config = loadConfig(VALID_INPUT);

    expect(config.rovers).toHaveLength(2);
    expect(config.rovers[0].orientation()).toEqual("N");
    expect(config.rovers[1].orientation()).toEqual("E");
  });

  it("should read rovers' initial orientations from input, including diagonals", () => {
    const config = loadConfig(VALID_INPUT_MOD_2);

    expect(config.rovers).toHaveLength(2);
    expect(config.rovers[0].orientation()).toEqual("NE");
    expect(config.rovers[1].orientation()).toEqual("SW");
  });

  it("should read rovers' instructions from input, including 45deg rotations", () => {
    const expectedInstructions = [
      [Instr.M, Instr.B, Instr.M, Instr.B],
      [Instr.l, Instr.r, Instr.M, Instr.l, Instr.r, Instr.B],
    ];
    const config = loadConfig(VALID_INPUT_MOD_2);

    expect(config.instructions).toEqual(expectedInstructions);
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
    const config = loadConfig(VALID_INPUT);

    expect(config.instructions).toEqual(expectedInstructions);
  });

  describe("validation", () => {
    it("should reject inputs with an invalid number of lines", () => {
      const badInput = VALID_INPUT.split("\n").slice(0, 2).join("\n");

      const action = () => console.log(loadConfig(badInput));

      expect(action).toThrow(ConfigError);
    });

    it("should reject unknown instructions", () => {
      const badInput = VALID_INPUT.replace("M", "_");

      const action = () => console.log(loadConfig(badInput));

      expect(action).toThrow(ConfigError);
    });

    it("should reject unknown orientations", () => {
      const badInput = VALID_INPUT.replace("N", "NNE");

      const action = () => console.log(loadConfig(badInput));

      expect(action).toThrow(ConfigError);
    });

    it("should reject invalid rover coordinates", () => {
      const badInput = VALID_INPUT.replaceAll("3", "X");

      const action = () => console.log(loadConfig(badInput));

      expect(action).toThrow(ConfigError);
    });

    it("should reject rover coordinates outside the plateau", () => {
      const badInput = [
        "5 5",
        "6 2 N",
        "LMLMLMLMM",
        "3 3 E",
        "MMRMMRMRRM",
      ].join("\n");

      const action = () => console.log(loadConfig(badInput));

      expect(action).toThrow(ConfigError);
    });

    it("should reject negative rover coordinates", () => {
      const badInput = [
        "5 5",
        "1 2 N",
        "LMLMLMLMM",
        "-1 -3 E",
        "MMRMMRMRRM",
      ].join("\n");

      const action = () => console.log(loadConfig(badInput));

      expect(action).toThrow(ConfigError);
    });
  });
});
