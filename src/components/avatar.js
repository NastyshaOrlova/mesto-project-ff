import { closePopup } from "./modal.js";
import { updateAvatar } from "./api.js";

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

  return updateAvatar(avatarInput.value)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

export { handleAvatarFormSubmit };
