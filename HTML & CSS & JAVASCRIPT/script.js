const player0pannel = document.querySelector(".player0");
const player1pannel = document.querySelector(".player1");
const rollbutton = document.querySelector(".rolldice");
const holdbutton = document.querySelector(".hold");
const resetbutton = document.querySelector(".reset");

player0pannel.classList.add("turnstyled");

let currentarr = [[], []];
let toparr = [[], []];
let activeplayer = 0;
let clickroll = [0, 0];
let clickhold = [0, 0];
let final1, final2;
let current_to_top;

function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
let confettiInterval;

const celebrate = function () {
  confettiInterval = setInterval(() => {
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { x: Math.random(), y: Math.random() },
    });
  }, 300);
};

const rollDice = function () {
  const dice1 = document.getElementById("firstdice");
  const dice2 = document.getElementById("seconddice");
  let counter = 0;

  const intervalFunction = function () {
    const random1 = Math.floor(Math.random() * 6) + 1;
    const random2 = Math.floor(Math.random() * 6) + 1;

    dice1.src = `./diceImages/dice ${random1}.png`;
    dice2.src = `./diceImages/dice ${random2}.png`;

    final1 = random1;
    final2 = random2;

    counter++;

    if (counter >= 20) {
      clearInterval(rolling);

      if (final1 === 1 && final2 === 1) {
        currentarr[activeplayer] = [];
        document.querySelector(`.top${activeplayer}`).textContent = 0;
        document.querySelector(`.current${activeplayer}`).textContent = 0;
        clickroll[activeplayer] = 0;
        player0pannel.classList.toggle("turnstyled");
        player1pannel.classList.toggle("turnstyled");
        activeplayer = activeplayer === 0 ? 1 : 0;
      } else if (final1 === 1 || final2 === 1) {
        currentarr[activeplayer] = [];
        document.querySelector(`.current${activeplayer}`).textContent = 0;
        clickroll[activeplayer] = 0;
        player0pannel.classList.toggle("turnstyled");
        player1pannel.classList.toggle("turnstyled");
        activeplayer = activeplayer === 0 ? 1 : 0;
      } else {
        const score = final1 + final2;
        currentarr[activeplayer][clickroll[activeplayer]] = score;
        clickroll[activeplayer]++;
        const total = sum(currentarr[activeplayer]);
        document.querySelector(`.current${activeplayer}`).textContent = total;
        current_to_top = total;
      }
    }
  };

  const rolling = setInterval(intervalFunction, 50);
};

const hold = function () {
  toparr[activeplayer][clickhold[activeplayer]] = current_to_top;
  clickhold[activeplayer]++;
  document.querySelector(`.top${activeplayer}`).textContent = sum(
    toparr[activeplayer]
  );
  const totalScore = sum(toparr[activeplayer]);
  if (totalScore >= 100) {
    celebrate();
  }
  clickroll[activeplayer] = 0;
  currentarr[activeplayer] = [];
  document.querySelector(`.current${activeplayer}`).textContent = 0;
  player0pannel.classList.toggle("turnstyled");
  player1pannel.classList.toggle("turnstyled");
  activeplayer = activeplayer === 0 ? 1 : 0;
};

const reset = function () {
  currentarr = [[], []];
  toparr = [[], []];
  activeplayer = 0;
  clickroll = [0, 0];
  clickhold = [0, 0];
  document.querySelector(".current0").textContent = 0;
  document.querySelector(".current1").textContent = 0;
  document.querySelector(".top0").textContent = 0;
  document.querySelector(".top1").textContent = 0;
  player0pannel.classList.add("turnstyled");
  player1pannel.classList.remove("turnstyled");
};

rollbutton.addEventListener("click", rollDice);
holdbutton.addEventListener("click", hold);
resetbutton.addEventListener("click", reset);
