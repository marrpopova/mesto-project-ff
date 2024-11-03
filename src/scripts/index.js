import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard, handleImageClick } from "../components/card.js";
import { openModal, closeModal, addListenerPopup } from "../components/modal.js";

//DOM узлы
const placesList = document.querySelector(".places__list");

//Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard, likeCard, handleImageClick);
  placesList.append(card);
});

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card"); //добавляем два попата

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button"); //добавляем две кнопки для открытия попапов

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//открытие окна для редактирования редактирования
buttonEditProfile.addEventListener("click", () => {
  openModal(popupTypeEdit);
  addListenerPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
});

//открытие окна для добавления карточки
buttonAddCard.addEventListener("click", () => {
  openModal(popupTypeNewCard)
  addListenerPopup(popupTypeNewCard);
});

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