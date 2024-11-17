//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
export function createCard(cardData, onDeleteCard, likeCard, handleImageClick, userId) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      onDeleteCard(cardData._id, cardElement);
    });
  } else {
    deleteButton.style.display = "none"
  }

  cardData.likes.some((el) => {
    if (el._id === userId) {
      buttonLike.classList.toggle("card__like-button_is-active");
      }
  })

  buttonLike.addEventListener("click", () => {
    likeCard(cardData, cardLikeNumber, buttonLike)
  });

  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });
  cardLikeNumber.textContent = cardData.likes.length;

  return cardElement;
}