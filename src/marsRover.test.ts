import { loadConfig } from "config";
import { Driver } from "marsRover";

describe("marsRover", () => {
  const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

  it("should move rovers to their final positions", () => {
    const config = loadConfig(input);
    const driver = new Driver(config);
    console.log("conf", config);

    driver.run();

    expect(driver.rovers[0].position).toEqual([1, 3]);
    expect(driver.rovers[1].position).toEqual([5, 1]);
  });

  it("should turn rovers to their final orientation", () => {
    const config = loadConfig(input);
    const driver = new Driver(config);

    driver.run();

    expect(driver.rovers[0].orientation).toEqual([0, 1]);
    expect(driver.rovers[1].orientation).toEqual([1, 0]);
  });

  it("should report the position and orientation of rovers", () => {
    const expectedReport = `1 3 N
5 1 E
`;
    const config = loadConfig(input);
    const driver = new Driver(config);

    driver.run();

    expect(driver.report()).toEqual(expectedReport);
  });
});
