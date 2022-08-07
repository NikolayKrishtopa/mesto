const config = {
    editProfileButtonSelector: '.profile__edit-button',
    addCardButtonSelector: '.navigation__add-place-button',
    editUserNameInputSelector: '.popup__field_type_user-name',
    editUserDescrInputSelector: '.popup__field_type_user-description',
    pageSelector: '.page',
    loadingPopupSelector: '.popup_type_page-loading',
    pageActiveSelector: 'page_shown',
    cardTemplateSelector: '#place-card-template',
    cardTitleSelector: '.place-card__title',
    cardPictureSelector: '.place-card__photo',
    cardSelector: '.place-card',
    cardsSectionSelector: '.place-cards',
    likeButtonSelector: 'place-card__like-button',
    removeButtonSelector: '.place-card__remove-button',
    photoPopupSelector: '.popup_type_picture-full-screen',
    addingCardPopupSelector: '.popup_type_add-card',
    confirmPopupSelector: '.popup_type_confirm',
    editProfilePopupSelector: '.popup_type_edit-profile',
    editAvatarPopupSelector: '.popup_type_edit-avatar',
    popupSelector: 'popup',
    popupTitleSelector: '.popup__title',
    popupPhotoSelector: '.popup__photo',
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    confirmButtonSelector: '.popup__submit-button_type_confirm',
    cancelButtonSelector: '.popup__submit-button_type_cancel',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__field_state_error',
    errorClass: 'popup__input-error_active',
    userNameSelector: '.profile__name',
    userInfoSelector: '.profile__description',
    avatarSelector: '.profile__avatar',
    likeCounterSelector: '.place-card__like-counter',
    editAvatarButtonSelector: '.profile__edit-avatar-button',
    apiData: {
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
      headers: {
        authorization: '59ab5595-8f8e-4f6b-87ff-7a2c739ded7b',
        'Content-Type': 'application/json'
      }
    }
  }

  export default config