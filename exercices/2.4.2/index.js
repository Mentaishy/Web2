const divRed = document.querySelector(".red");
const divOrange = document.querySelector(".orange");
const divGreen = document.querySelector(".green");

const red = 'red';
const orange = 'orange';
const green = 'green';
const white = '';

const myIntervalId = 2000;


start();

function start() {
    myIntervalId = setInterval(runColor, 2000);
}

function runColor() {
    clockHolder.innerText = time;
}

function stopColor() {
    if (myIntervalId) {
      clearInterval(myIntervalId);
      myIntervalId = undefined;
    } else startClock();
  }