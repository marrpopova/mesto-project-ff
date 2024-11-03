import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openModal, closeModal, addListenerPopup } from "../components/modal.js";

//DOM узлы
const placesList = document.querySelector(".places__list");

//Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard, likeCard, handleImageClick);
  placesList.append(card);
});

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup__image");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const popupCaption = document.querySelector(".popup__caption");

//открытие окна для редактирования редактирования
buttonEditProfile.addEventListener("click", () => {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
});

//открытие окна для добавления карточки
buttonAddCard.addEventListener("click", () => {
  openModal(popupTypeNewCard)
});

//функция обработки карточки с фоткой при клике
function handleImageClick(cardData) {
  openModal(popupTypeImage);
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
}

[popupTypeEdit, popupTypeNewCard, popupTypeImage].forEach(addListenerPopup);

//редактирование имени и информации о себе
const profileForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

//Добавление карточки
const cardForm = document.forms["new-place"];
const nameMesto = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newObjectCard = {
    name: nameMesto.value,
    link: linkInput.value,
  };
  placesList.prepend(createCard(newObjectCard, deleteCard, likeCard, handleImageClick));
  cardForm.reset();
  closeModal(popupTypeNewCard);
}

cardForm.addEventListener("submit", handleAddCardFormSubmit);