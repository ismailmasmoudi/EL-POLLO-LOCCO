
let intervalIds = [];
let i = 1;

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

setStoppableInterval(sayHello, 500);
setStoppableInterval(sayGoodbye, 500);


// function stopGame() {
//     //Intervsalle beeneden
//     intervalIds.forEach(clearInterval);
// }

function stopGame() {
    if (world && world.intervalId) {
        clearInterval(world.intervalId);
        world.intervalId = null;
    }
}
function sayHello() {
    console.log("Hallo", i);
    i++;
}

function sayGoodbye() {
    console.log("Goodbye", i);
    i++;
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }