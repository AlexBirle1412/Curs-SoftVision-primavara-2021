/*Tema 6 Redați un sunet la un anumit interval de timp, în funcție de câte degete are ridicate utilizatorul 
( minim 0, maxim 5 - sunetul va fi redat la un interval mai scurt sau mai lung).
*/
const synth = new Tone.Synth().toDestination();

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
  }

  showRaisedFingers() {
    let raisedFingers = 0;
    const landmarks = this.landmarks;
    if (landmarks) {
      for (let i = 2; i <= 5; i++) {
        const fingerTip = landmarks[4 * i];
        const fingerDip = landmarks[4 * i - 1];
        if (fingerTip.y < fingerDip.y) {
          raisedFingers++;
        }
      }
      if (landmarks[4].x > landmarks[3].x) {
        raisedFingers++;
      }
    }
    document.getElementById(
      "number-of-fingers"
    ).innerText = `Numarul de degete:${raisedFingers}`;
    return raisedFingers;
  }

  playEffectiveSound(value) {
    setTimeout(() => {
      if (value != 0) synth.triggerAttackRelease("E4", `${value}n`);
      else return;
    }, value * 100);
  }

  playSoundAcoridingToRaisedFingers() {
    let value = this.showRaisedFingers();
    this.playEffectiveSound(value);
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
