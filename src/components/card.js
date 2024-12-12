function createCard(
  cardData,
  handleDeleteClick,
  likeCard,
  handleImageClick,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      handleDeleteClick(cardElement, cardData._id)
    );
  }

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (cardData.likes.length > 0) {
    likeCount.textContent = cardData.likes.length;
    likeCount.classList.remove("card__like-count_hidden");
  } else {
    likeCount.classList.add("card__like-count_hidden");
  }

  cardImage.addEventListener("click", () => handleImageClick(cardData));
  likeButton.addEventListener("click", () =>
    likeCard(likeButton, cardData._id)
  );
  return cardElement;
}

function deleteCard(cardElement, cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-29/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "b6d14234-5726-490a-87eb-f980b45c2dd9",
    },
  }).then((res) => {
    if (res.ok) {
      cardElement.remove();
    }
  });
}

function likeCard(likeButton, cardId) {
  const method = likeButton.classList.contains("card__like-button_is-active")
    ? "DELETE"
    : "PUT";

  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-29/cards/likes/${cardId}`,
    {
      method: method,
      headers: {
        authorization: "b6d14234-5726-490a-87eb-f980b45c2dd9",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
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
    });
}

export { createCard, deleteCard, likeCard };
