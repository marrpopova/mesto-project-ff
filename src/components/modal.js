//Открытие и закрытие модального окна
const handleEscKeyUp = (event) => {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
};

//функция открытия окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  popup.addEventListener("keydown", handleEscKeyUp);
}

//функция закрытия окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("keydown", handleEscKeyUp);
}

//функция чтобы добавить слушателя для попата
export function addListenerPopup(popup) {
  openModal(popup);
  const buttonClosePopup = popup.querySelector(".popup__close");
  buttonClosePopup.addEventListener("click", () => {
    closeModal(popup);
  });

  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
}