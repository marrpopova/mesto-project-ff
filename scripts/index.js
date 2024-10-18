// @todo: Темплейт карточки
const cardTemplate=document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList=document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
    const cardElement=cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src=link;
    cardElement.querySelector('.card__image').alt=name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__title').textContent=name;
    return cardElement
};

// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.parentElement.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((element)=> {
    const card=createCard(element.name, element.link, deleteCard);
    placesList.append(card);
});