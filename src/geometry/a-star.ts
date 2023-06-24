import { Point } from "./point";

interface GridNode extends Point.Point2 {
  weight: number;
  parent: GridNode | null;
  score: number;
  g: number;
  h: number;
  visited: boolean;
  closed: boolean;
}

const defaultNode: GridNode = {
  x: 0,
  y: 0,
  weight: 0,
  parent: null,
  score: 0,
  g: 0,
  h: 0,
  visited: false,
  closed: false,
};

function getWeightBetweenNodes(node: GridNode, neighbor: GridNode): number {
  if (Point.equal(node, neighbor)) return node.weight;
  return node.weight * 1.41421;
}

function makeParentPath(node: GridNode): Point.Point2[] {
  let curr = node;
  const path = [];
  while (curr.parent) {
    path.unshift({ x: curr.x, y: curr.y });
    curr = curr.parent;
  }
  return path;
}
class BinaryHeap {
  content: GridNode[] = [];

  constructor() {}

  push(element: GridNode) {
    this.content.push(element);
    this.sinkDown(this.content.length - 1);
  }

  pop() {
    const result = this.content[0];
    const end = this.content.pop();

    if (this.content.length > 0 && end) {
      this.content[0] = end;
      this.bubbleUp(0);
    }
    return result;
  }

  length() {
    return this.content.length;
  }

  rescoreElement(node: GridNode) {
    this.sinkDown(this.content.indexOf(node));
  }

  sinkDown(n: number) {
    const element = this.content[n];

    while (n > 0) {
      const parentN = ((n + 1) >> 1) - 1;
      const parent = this.content[parentN];
      if (element.score < parent.score) {
        this.content[parentN] = element;
        this.content[n] = parent;
        n = parentN;
      } else {
        break;
      }
    }
  }

  bubbleUp(n: number) {
    const length = this.content.length;
    const element = this.content[n];
    const elemScore = element.score;

    while (true) {
      const child2N = (n + 1) << 1;
      const child1N = child2N - 1;

      let swap = null;
      let child1Score;

      if (child1N < length) {
        const child1 = this.content[child1N];
        child1Score = child1.score;

        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      if (child2N < length) {
        const child2 = this.content[child2N];
        const child2Score = child2.score;
        if (
          child1Score &&
          child2Score < (swap === null ? elemScore : child1Score)
        ) {
          swap = child2N;
        }
      }

      if (swap !== null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      } else {
        break;
      }
    }
  }
}

export function searchAStar(
  gridIn: (Point.Point2 & { weight?: number })[],
  from: Point.Point2,
  dest: Point.Point2,
  {
    closest,
    diagonal,
  }: {
    closest?: boolean;
    diagonal?: boolean;
  } = {}
): Point.Point2[] {
  const grid: GridNode[] = gridIn.map((pos) => ({
    ...defaultNode,
    x: pos.x,
    y: pos.y,
    weight: pos.weight || 1,
  }));
  const heuristic = diagonal ? heuristics.diagonal : heuristics.manhattan;
  const start = findNode(grid, from.x, from.y);
  const end = findNode(grid, dest.x, dest.y);
  if (!start || !end) throw new Error("Start or End not in grid");
  let closestNode = start;
  start.h = heuristic(start, end);
  const openHeap = new BinaryHeap();
  openHeap.push(start);

  while (openHeap.length() > 0) {
    const currentNode = openHeap.pop();
    if (currentNode === end) {
      return makeParentPath(currentNode);
    }
    currentNode.closed = true;
    const neighbors: GridNode[] = findNeighbors(grid, currentNode, diagonal);
    const il = neighbors.length;
    for (let i = 0; i < il; ++i) {
      const neighbor = neighbors[i];
      if (neighbor.closed || neighbor.weight === 0) {
        continue;
      }
      const gScore =
        currentNode.g + getWeightBetweenNodes(neighbor, currentNode);
      const beenVisited = neighbor.visited;

      if (!beenVisited || gScore < neighbor.g) {
        neighbor.visited = true;
        neighbor.parent = currentNode;
        neighbor.h = neighbor.h || heuristic(neighbor, end);
        neighbor.g = gScore;
        neighbor.score = neighbor.g + neighbor.h;
        if (closest) {
          if (
            neighbor.h < closestNode.h ||
            (neighbor.h === closestNode.h && neighbor.g < closestNode.g)
          ) {
            closestNode = neighbor;
          }
        }

        if (!beenVisited) {
          openHeap.push(neighbor);
        } else {
          openHeap.rescoreElement(neighbor);
        }
      }
    }
  }

  if (closest) {
    return makeParentPath(closestNode);
  }
  return [];
}

const heuristics = {
  manhattan: function (pos0: Point.Point2, pos1: Point.Point2): number {
    const d1 = Math.abs(pos1.x - pos0.x);
    const d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
  },
  diagonal: function (pos0: Point.Point2, pos1: Point.Point2): number {
    const D = 1;
    const D2 = Math.sqrt(2);
    const d1 = Math.abs(pos1.x - pos0.x);
    const d2 = Math.abs(pos1.y - pos0.y);
    return D * (d1 + d2) + (D2 - 2 * D) * Math.min(d1, d2);
  },
};

function findNode<T extends Point.Point2>(
  grid: T[],
  x: number,
  y: number
): T | undefined {
  return grid.find((f) => f.x === x && f.y === y);
}

function findNeighbors<T extends Point.Point2>(
  nodes: T[],
  { x, y }: T,
  diagonal?: boolean
): T[] {
  const neighbors: T[] = [];

  const potentialNeighbors = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ];

  if (diagonal) {
    potentialNeighbors.push(
      { x: x - 1, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y + 1 }
    );
  }
  potentialNeighbors.forEach((neighbor) => {
    const neighborNode = findNode(nodes, neighbor.x, neighbor.y);
    if (neighborNode) {
      neighbors.push(neighborNode);
    }
  });
  return neighbors;
}
