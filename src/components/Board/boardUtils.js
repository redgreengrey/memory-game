export const checkerHasTwo = (compareCards) => {
  return compareCards.length === 2;
};

export const cardAlreadyClicked = (compareCards, card) => {
  return compareCards.length === 1 && compareCards[0].id === card.id;
};

export const checkCards = (compareCards) => {
  return (
    compareCards.length === 2 && compareCards[0].name === compareCards[1].name
  );
};
