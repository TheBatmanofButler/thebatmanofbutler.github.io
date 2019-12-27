const WIDTH = 1000;
const HEIGHT = 500;
let g;

let svg = d3
  .select("#tree")
  .attr("viewBox", "0 0 " + WIDTH + " " + HEIGHT)
  .attr("preserveAspectRatio", "xMidYMid meet");
// .call(responsify);

let getRandomNumberInRange = function(min, max) {
  return Math.random() * (max - min) + min;
};

let degToRad = function(deg) {
  return (deg * Math.PI) / 180;
};

let getCoords = function(x1, y1, length, deg) {
  let rad = degToRad(deg);
  let x2 = x1 + Math.sin(rad) * length;
  let y2 = y1 - Math.cos(rad) * length;

  return { x2, y2 };
};

let generateBinaryTreeHelper = function(x1, y1, length, strokeWidth, deg) {
  let { x2, y2 } = getCoords(x1, y1, length, deg);

  g.append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .style("stroke", "gray")
    .style("stroke-width", strokeWidth);

  if (length > 0 && strokeWidth > 1) {
    let degDelta = getRandomNumberInRange(0, 30);

    generateBinaryTreeHelper(
      x2,
      y2,
      length - 3,
      strokeWidth - 0.4,
      deg - degDelta
    );
    generateBinaryTreeHelper(
      x2,
      y2,
      length - 3,
      strokeWidth - 0.4,
      deg + degDelta
    );
  } else {
    g.append("circle")
      .attr("cx", x2)
      .attr("cy", y2)
      .attr("r", 2)
      .style("fill", "green");
  }
};

let generateBinaryTree = function() {
  let x = WIDTH / 2;
  let y = HEIGHT * (3 / 4);
  let length = 50;
  let strokeWidth = 4.5;
  let deg = getRandomNumberInRange(0, 30);

  if (g) {
    g.remove();
  }
  g = svg.append("g");

  let rootBranch = g
    .append("line")
    .attr("x1", WIDTH / 2)
    .attr("y1", HEIGHT)
    .attr("x2", WIDTH / 2)
    .attr("y2", HEIGHT * (3 / 4))
    .style("stroke", "gray")
    .style("stroke-width", 5);

  generateBinaryTreeHelper(x, y, length, strokeWidth, deg);
  generateBinaryTreeHelper(x, y, length, strokeWidth, -deg);
};

generateBinaryTree();
