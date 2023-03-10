import { Orientation } from "config";

export class Direction {
  private static CYCLE: Orientation[] = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
  ];
  private static MAP: Record<Orientation, [number, number]> = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0],
    NW: [-1, 1],
    NE: [1, 1],
    SE: [1, -1],
    SW: [-1, -1],
  };

  orientation: Orientation;

  constructor(orientation: Orientation) {
    this.orientation = orientation;
  }

  public turnLeft90() {
    this.turn(-2);
  }

  public turnLeft45() {
    this.turn(-1);
  }

  public turnRight90() {
    this.turn(2);
  }

  public turnRight45() {
    this.turn(1);
  }

  public toVector(): [number, number] {
    return Direction.MAP[this.orientation];
  }

  private turn(amount: Turn) {
    const cycleLength = Direction.CYCLE.length;
    const rawIndex = Direction.CYCLE.indexOf(this.orientation) + amount;

    const nextIdx = ((rawIndex % cycleLength) + cycleLength) % cycleLength;

    this.orientation = Direction.CYCLE[nextIdx];
  }
}
export type Turn = -1 | 1 | -2 | 2;
