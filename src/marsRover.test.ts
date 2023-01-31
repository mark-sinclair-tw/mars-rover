import { loadConfig } from "./marsRover";

describe("marsRover", () => {
  it.todo("should do something really neat");
});

describe("loadConfig", () => {
  const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

  it("should read plateua dimensions from input", () => {
    const config = loadConfig(input);
    expect(config.plateau.height).toBe(5);
    expect(config.plateau.width).toBe(5);
  });
});
