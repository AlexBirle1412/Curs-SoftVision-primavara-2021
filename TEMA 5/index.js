const synth = new Tone.Synth().toDestination();

const answers = ["Croatia", "Germania", "Franta"];
const corrrectAnswer = answers[2];
const container = document.getElementById("container");
const question = document.createElement("div");
question.textContent =
  "Care echipa a castigat ultima cupa mondiala la fotbal ?";
question.classList.add("question");
container.appendChild(question);

const answerOuterDiv = document.createElement("div");
answerOuterDiv.id = "answerOuterDiv";
answerOuterDiv.classList.add("answerOuterDiv");
container.appendChild(answerOuterDiv);

for (let i = 0; i < 3; i++) {
  const answer = document.createElement("div");
  answer.textContent = answers[i];
  answer.addEventListener("click", processAnswer);
  answer.classList.add("answer");
  answerOuterDiv.appendChild(answer);
}

function restartGame() {
  let arr = Array.from(
    document.getElementById("answerOuterDiv").getElementsByTagName("*")
  );
  arr.forEach((element) => {
    //console.log(element);
    element.classList = "";
    element.classList.add("answer");
  });
}

function processAnswer(e) {
  e.preventDefault();
  //console.log(e.target.classList);
  if (e.target.innerText == corrrectAnswer) {
    e.target.classList = "";
    e.target.classList.add("correctAnswer");
    setTimeout(restartGame, 1000);
    synth.triggerAttackRelease("C4", "2n");
  } else {
    e.target.classList = "";
    e.target.classList.add("wrongAnswer");
    setTimeout(restartGame, 1000);
    synth.triggerAttackRelease("E6", "2n");
  }
}
