//Creați un progress bar folosind animatii CSS, acesta trebuie să se încarce de la 0 la 100.
//Creați un cronometru, adăugați posibilitatea ca utilizatorul să îl poată reseta, opri, porni.

//Ex. 1
function showPercentage() {
  let i = 0;
  if (i == 0) {
    i = 1;
    let width = 1;
    let id = setInterval(frame, 30);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.innerHTML = width + "%";
        //console.log(width);
      }
    }
  }
}

function showDiagram() {
  document.getElementById("extDiv").classList.remove("hide");
  showPercentage();
  setTimeout(() => {
    document.getElementById("extDiv").classList.add("hide");
  }, 3000);
}

const myBtn = document.getElementById("myBtn");
myBtn.addEventListener("click", showDiagram);

const elem = document.getElementById("myBar");

//Ex. 2

const timer = document.getElementById("timer");

var hr = 0;
var min = 0;
var sec = 0;
var stopTime = true;

function startTimer() {
  console.log("Stiu ca se poate mai bine cu CSS-ul la acest exercitiu :) ");
  if (stopTime == true) {
    stopTime = false;
    timerCycle();
  }
}
function stopTimer() {
  if (stopTime == false) {
    stopTime = true;
  }
}

function resetTimer() {
  timer.innerHTML = "00:00:00";
  stopTime = true;
  hr = 0;
  sec = 0;
  min = 0;
}

function timerCycle() {
  if (stopTime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }
    if (hr < 10 || hr == 0) {
      hr = "0" + hr;
    }

    timer.innerHTML = hr + ":" + min + ":" + sec;

    setTimeout(timerCycle, 1000);
  }
}
