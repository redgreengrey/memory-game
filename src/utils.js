import cardBack from "./assets/cardBack.webp";
import arthur from "./assets/arthur.webp";
import bellatrix from "./assets/bellatrix.webp";
import cedric from "./assets/cedric.webp";
import cho from "./assets/cho.webp";
import draco from "./assets/draco.webp";
import ginny from "./assets/ginny.webp";
import hagrid from "./assets/hagrid.webp";
import harry from "./assets/harry.webp";
import hermione from "./assets/hermione.webp";
import luna from "./assets/luna.webp";
import lupin from "./assets/lupin.webp";
import mcgonagall from "./assets/mcgonagall.webp";
import neville from "./assets/neville.webp";
import ron from "./assets/ron.webp";
import sirius from "./assets/sirius.webp";
import slughorn from "./assets/slughorn.webp";
import snape from "./assets/snape.webp";
import voldemort from "./assets/voldemort.webp";

export const makeCards = () => {
  let id = 0;
  const images = {
    arthur,
    bellatrix,
    cedric,
    cho,
    draco,
    ginny,
    hagrid,
    harry,
    hermione,
    luna,
    lupin,
    mcgonagall,
    neville,
    ron,
    sirius,
    slughorn,
    snape,
    voldemort,
  };

  const cards = Object.keys(images).reduce((cardInfo, img) => {
    const createCard = () => ({
      id: id++,
      name: img,
      cardBack,
      cardFront: images[img],
      flipped: false,
    });
    return [...cardInfo, createCard(), createCard()];
  }, []);
  return shuffle(cards);
};

const shuffle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let randomIdx = Math.floor(Math.random() * arr.length);
    let notRandomCopy = { ...arr[i] };
    let randomCopy = { ...arr[randomIdx] };
    arr[i] = randomCopy;
    arr[randomIdx] = notRandomCopy;
  }
  return arr;
};
