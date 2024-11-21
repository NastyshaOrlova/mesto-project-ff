import "./pages/index.css";
import { initialCards } from "./cards.js";
import avatarImage from "./images/avatar.jpg";

document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatarImage})`;

// @todo: Темплейт карточки/Получение щаблона
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы/Получение элементов страницы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard);
  placesList.append(card);
});
