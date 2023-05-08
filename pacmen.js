const pacArray = [
  ['./PacMan1.png', './PacMan2.png'],
  ['./PacMan3.png', './PacMan4.png'],
];
let direction = 0;
const pacMen = []; // Array to hold PacMen

// Returns object with random values for use in velocity and positioning
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makeNewPac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  //sets left and top attributes for newImg to value of x, y positions
  newimg.style.left = position.x
  newimg.style.top = position.y

  // add newImg to game
  game.appendChild(newimg);

  // return object details
  return {
    position,
    velocity,
    newimg,
  };
}

  // loop through spawned pacmen, and move them around, bouncing away from walls when collision is detected.
function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x; // reverse x direction
    if (item.velocity.x > 0) {
      // PacMan is moving to the right
      item.newimg.src = pacArray[0][0];
    } else {
      // PacMan is moving to the left
      item.newimg.src = pacArray[1][0];
    }
  }
  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y; // reverse y direction
  }
}

function makeOne() {
  pacMen.push(makeNewPac()); // add a new PacMan
}
