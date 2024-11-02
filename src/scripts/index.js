import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openModal, closeModal, addListenerPopup } from "../components/modal.js";

//DOM узлы
const placesList = document.querySelector(".places__list");

//Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard, likeCard, addListenerPopup);
  placesList.append(card);
});

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card"); //добавляем два попата

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button"); //добавляем две кнопки для открытия попапов

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//навешиваем слушателя для попата окна редактирования
buttonEditProfile.addEventListener("click", () => {
  addListenerPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
});

//навешиваем слушателя для попала добавления карточки
buttonAddCard.addEventListener("click", () => {
  addListenerPopup(popupTypeNewCard);
});

//редактирование имени и информации о себе
const form = document.querySelectorAll(".popup__form");
const formEdit = form[0]; //форма в попате для редактирования профиля

const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

formEdit.addEventListener("submit", handleFormSubmit);

//Добавление карточки
const formAddCard = form[1]; //форма в попате для добавления карточки

function addCard(evt) {
  evt.preventDefault();

  const nameMesto = formAddCard.querySelector(".popup__input_type_card-name");
  const linkInput = formAddCard.querySelector(".popup__input_type_url");
  const newObjectCard = {
    name: nameMesto.value,
    link: linkInput.value,
  };
  placesList.prepend(createCard(newObjectCard, deleteCard, likeCard, addListenerPopup));
  nameMesto.value = "";
  linkInput.value = "";
  closeModal(popupTypeNewCard);
}

formAddCard.addEventListener("submit", addCard);