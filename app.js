document.addEventListener("DOMContentLoaded", function () {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");
  let gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;

  function control(e) {
    if (e.code === "Space") {
      if (!isJumping) {
        jump();
      }
    }
  }

  document.addEventListener("keyup", control);

  let position = 0;

  function jump() {
    isJumping = true;
    let count = 0;
    let timeId = setInterval(function () {
      // move dounwn
      if (count === 15) {
        clearInterval(timeId);
        let downTimeId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimeId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          dino.style.bottom = position + "px";
          console.log("going down");
        }, 20);
      }
      // move up
      position += 30;
      count++;
      position = position * gravity;
      dino.style.bottom = position + "px";
    }, 20);
  }

  // generate obstacles
  function generateObstacles() {
    if (!isGameOver) {
      let randomTime = Math.random() * 4000;
      let obstaclePositions = 1000;
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePositions + "px";

      let timeId = setInterval(function () {
        if (obstaclePositions > 0 && obstaclePositions < 60 && position < 60) {
          clearInterval(timeId);
          isGameOver = true;
          alert.innerHTML = "Game Over";
          //remove all children from grid
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
        }
        obstaclePositions -= 10;
        obstacle.style.left = obstaclePositions + "px";
      }, 20);
      setTimeout(generateObstacles, randomTime);
    }
  }
  generateObstacles();
});
