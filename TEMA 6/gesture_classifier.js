export default class GestureClassifier {
  constructor() {
    this.gestureIds = [0, 1, 2, 3, 4];
    this.defaultExamples = 0;
  }

  init() {
    this.initializeClassifier();
  }

  async initializeClassifier() {
    this.classifier = knnClassifier.create();
    this.mobilenet = await mobilenet.load();
  }

  addExample(image) {
    if (!this.trainingClass && this.defaultExamples > 50) return;

    const img = tf.browser.fromPixels(image);
    const example = this.mobilenet.infer(img, "conv_preds");

    if (this.trainingClass) {
      this.classifier.addExample(example, this.trainingClass);
      // Update gesture button examples count
      const btn = document.getElementById(this.trainingClass);
      btn.dataset.examples++;
      btn.innerText = `${btn.id}: ${btn.dataset.examples}`;
    } else {
      this.classifier.addExample(example, "default");
      this.defaultExamples++;
    }

    img.dispose();
  }

  async predict(image, grid) {
    if (!this.classifier.getNumClasses()) return;
    const img = tf.browser.fromPixels(image);
    const example = this.mobilenet.infer(img, "conv_preds");
    const result = await this.classifier.predictClass(example);

    const { label, confidences } = result;

    console.log(label, confidences[label]);

    if (confidences[label] === 1 && label !== "default") {
      const btn = document.getElementById(label);
      if (!btn.classList.contains("predicted")) {
        btn.classList.add("predicted");
        grid.addGestureCell(label);
      }
      setTimeout(() => btn.classList.remove("predicted"), 500);
    }

    img.dispose();
  }
}
