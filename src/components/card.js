function createCard(
  cardData,
  handleDeleteClick,
  handleLikeClick,
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
    handleLikeClick(cardData._id, likeButton)
  );

  return cardElement;
}

export { createCard };
