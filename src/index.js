import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openPopup, closePopup, closeByOverlay } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  toggleButtonState,
} from "./components/validate.js";
import {
  getInitialCards,
  updateUserInfo,
  addCard,
  updateAvatar,
  getUserInfo,
  deleteCard,
  toggleLikeRequest,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const formEdit = document.forms["edit-profile"];
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const closeButtons = document.querySelectorAll(".popup__close");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
let userId;
const deletePopup = document.querySelector(".popup_type_delete-card");
const deleteConfirmButton = deletePopup.querySelector(".popup__button");
let cardToDelete = null;
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms["edit-avatar"];
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");
const profileAvatar = document.querySelector(".profile__image");

function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

function handleAvatarFormSubmit(evt, avatarInput, avatarPopup, profileAvatar) {
  evt.preventDefault();
  const submitButton = evt.submitter;

  renderLoading(true, submitButton);

  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

function handleDeleteClick(cardElement, cardId) {
  cardToDelete = { element: cardElement, id: cardId };
  openPopup(deletePopup);
}

function handleLikeClick(cardId, likeButton) {
  const method = likeButton.classList.contains("card__like-button_is-active")
    ? "DELETE"
    : "PUT";
  toggleLikeRequest(cardId, method)
    .then((data) => {
      likeButton.classList.toggle("card__like-button_is-active");
      const likeCount = likeButton
        .closest(".card")
        .querySelector(".card__like-count");

      if (data.likes.length > 0) {
        likeCount.textContent = data.likes.length;
        likeCount.classList.remove("card__like-count_hidden");
      } else {
        likeCount.classList.add("card__like-count_hidden");
      }
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;

  renderLoading(true, submitButton);
  updateUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;

  renderLoading(true, submitButton);
  addCard(cardNameInput.value, cardLinkInput.value)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        handleDeleteClick,
        handleLikeClick,
        handleImageClick,
        userId
      );
      placesList.prepend(cardElement);
      addCardForm.reset();
      toggleButtonState(addCardForm, validationConfig);
      closePopup(addCardPopup);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

editButton.addEventListener("click", () => {
  fillProfileForm();
  clearValidation(formEdit, validationConfig);
  toggleButtonState(formEdit, validationConfig);
  openPopup(editPopup);
});
editPopup.addEventListener("click", closeByOverlay);
formEdit.addEventListener("submit", handleFormEditSubmit);
addButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  toggleButtonState(addCardForm, validationConfig);
  openPopup(addCardPopup);
});
addCardPopup.addEventListener("click", closeByOverlay);
imagePopup.addEventListener("click", closeByOverlay);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
deleteConfirmButton.addEventListener("click", () => {
  if (cardToDelete) {
    deleteCard(cardToDelete.id)
      .then(() => {
        cardToDelete.element.remove();
        closePopup(deletePopup);
        cardToDelete = null;
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }
});
profileAvatar.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  toggleButtonState(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

avatarPopup.addEventListener("click", closeByOverlay);

avatarForm.addEventListener("submit", (evt) => {
  handleAvatarFormSubmit(evt, avatarInput, avatarPopup, profileAvatar);
});

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    initialCards.forEach((cardData) => {
      const card = createCard(
        cardData,
        handleDeleteClick,
        handleLikeClick,
        handleImageClick,
        userId
      );
      placesList.append(card);
    });
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });
