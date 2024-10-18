// @todo: Темплейт карточки
const cardTemplate=document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList=document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
    const cardElement=cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage=cardElement.querySelector('.card__image');
    cardImage.src=cardData.link;
    cardImage.alt=cardData.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement);
    });
    cardElement.querySelector('.card__title').textContent=cardData.name;
    return cardElement
};

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData)=> { 
    const card=createCard(cardData, deleteCard); 
    placesList.append(card); 
});