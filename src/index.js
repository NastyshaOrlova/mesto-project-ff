import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup, closeByOverlay } from "./components/modal.js";
import avatarImage from "./images/avatar.jpg";

document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatarImage})`;

const placesList = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});
// Обработчики форм
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = createCard(newCard, deleteCard);
  placesList.prepend(cardElement);
  addCardForm.reset();
  closePopup(addCardPopup);
}

// Вывод начальных карточек
initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard);
  placesList.append(card);
});

editButton.addEventListener("click", () => {
  fillProfileForm();
  openPopup(editPopup);
});
editPopup.addEventListener("click", closeByOverlay);
formElement.addEventListener("submit", handleFormSubmit);
addButton.addEventListener("click", () => openPopup(addCardPopup));
addCardPopup.addEventListener("click", closeByOverlay);
imagePopup.addEventListener("click", closeByOverlay);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
