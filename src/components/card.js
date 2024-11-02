const popupTypeImage = document.querySelector(".popup_type_image");

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, addListenerPopup) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const buttonLike = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    deleteCard(cardElement);
  });

  buttonLike.addEventListener("click", () => {
    likeCard(buttonLike);
  });

  cardImage.addEventListener("click", () => {
    addListenerPopup(popupTypeImage);
    document.querySelector(".popup__image").src = cardData.link;
    document.querySelector(".popup__caption").textContent = cardData.name;
  });

  return cardElement;
}

//Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

//функция лайка
export function likeCard(item) {
  if (!item.classList.contains("card__like-button_is-active")) {
    item.classList.add("card__like-button_is-active");
  } else {
    item.classList.remove("card__like-button_is-active");
  }
}
