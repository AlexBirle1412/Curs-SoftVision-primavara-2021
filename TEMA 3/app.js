import { Grid } from "./grid.js";
import HandDetection from "./hand_detection.js";

export default class App {
  init() {
    this.initializeGrid();
    this.initializeMediaPipe();
  }

  initializeGrid() {
    this.grid = new Grid({
      rootId: "grid-container",
      noOfRows: 5,
      noOfCells: 5,
      rowClass: "grid-row",
      cellClass: "grid-cell",
    });

    this.grid.init();
  }

  initializeMediaPipe() {
    const handDetection = new HandDetection(this.grid);
    handDetection.init();
  }
}
