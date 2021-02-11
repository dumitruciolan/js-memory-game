const cards = document.querySelectorAll(".memory-card");
[hasFlippedCard, lockBoard] = [false, false];
let firstCard, secondCard;

cards.forEach((card) => card.addEventListener("click", flipCard));

const resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
};

const unflipCards = () => {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
};

const checkForMatch = () => {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
};

function flipCard() {
  if (lockBoard || this === firstCard) return;

  // first click
  this.classList.add("flip");
  if (!hasFlippedCard) return ([hasFlippedCard, firstCard] = [true, this]);

  // second click
  secondCard = this;
  checkForMatch();
}

(shuffle = () => {
  cards.forEach((card) => (card.style.order = Math.floor(Math.random() * 12)));
})();
