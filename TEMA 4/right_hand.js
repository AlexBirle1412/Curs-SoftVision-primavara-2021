export default class RightHand {
  constructor(grid) {
    this.grid = grid;
  }

  isCellPressed(cell) {
    const clientRect = cell.getBoundingClientRect();
    const indexFingerX = this.indexFingerTip.x * 780 + 20;
    const indexFingerY = this.indexFingerTip.y * 439 + 20;
    const cellX = clientRect.x;
    const cellY = clientRect.y;
    if (cell.classList.contains("recently-activated-by-touch")) return;
    return (
      indexFingerX > cellX &&
      indexFingerX < clientRect.right &&
      indexFingerY > cellY &&
      indexFingerY < clientRect.bottom
    );
  }

  updateLandmarks(landmarks) {
    this.landmarks = landmarks;
    console.log("!!" + this.landmarks);
  }

  calculateDistance(first, second) {
    let { x: x1, y: y1 } = first;
    let { x: x2, y: y2 } = second;
    let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return distance;
  }

  numberOfFingers() {
    let i = 1;
    let result = 0;
    console.log("IN NUMBER OF FINGERS");
    while (i <= 5) {
      if (
        this.landmarks &&
        this.landmarks[4 * i] &&
        this.landmarks[4 * i - 3]
      ) {
        let distance = this.calculateDistance(
          this.landmarks[4 * i],
          this.landmarks[4 * i - 3]
        );
        if (distance > 0.5) {
          result++;
          console.log("E OK");
        }
      }
      i++;
    }
    return result;
  }

  showNumberofFingers() {
    document.getElementById("number-of-fingers").textContent =
      this.numberOfFingers();
  }

  draw(ctx) {
    this.indexFingerTip = this.landmarks && this.landmarks[8];
    if (this.indexFingerTip) {
      const isPressed = this.indexFingerTip.z < -0.1;
      ctx.beginPath();
      ctx.fillStyle = isPressed ? "green" : "orange";
      ctx.arc(
        this.indexFingerTip.x * 780,
        this.indexFingerTip.y * 439,
        10,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();

      if (isPressed) {
        this.grid.cells.forEach((cell) => {
          if (this.isCellPressed(cell)) {
            this.grid.toggleCellState(cell);
            cell.classList.add("recently-activated-by-touch");
            setTimeout(() => {
              cell.classList.remove("recently-activated-by-touch");
            }, 400);
          }
        });
      }
    }
  }
}
