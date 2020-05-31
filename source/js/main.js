'use strict';

(function () {
  var TEL_LENGTH = 11;
  var ESC_KEY = 'Escape';

  // Валидация телефона
  var inputsTel = document.querySelectorAll('.input--tel');

  var validateTel = function (element) {
    window.iMaskJS(element, {
      min: 110,
      mask: '+7 (000) 000 00 00',
    });
  };

  inputsTel.forEach(function (input) {
    validateTel(input);
  });

  // Фокус на input + валидация
  inputsTel.forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.value !== '') {
        input.classList.add('input--tel-bg');
      } else {
        input.classList.remove('input--tel-bg');
      }

      var inputLength = input.value.replace(/\D+/g, '').length;
      if (inputLength < TEL_LENGTH) {
        input.classList.add('input--invalid');
        input.setCustomValidity('Введите телефонный номер полностью')
      } else {
        input.classList.remove('input--invalid');
        input.classList.add('input--valid');
        input.setCustomValidity('')
      }
    });
  });

  // Модальные окна
  var callbackButton = document.querySelector('.page-header__link');
  var callbackModal = document.querySelector('.modal--callback');
  var callbackModalClose = callbackModal.querySelector('.modal__close');
  var callbackModalInputName = callbackModal.querySelector('.input--name');

  var successModal = document.querySelector('.modal--success');
  var successModalClose = successModal.querySelector('.modal__close');
  var successModalButton = successModal.querySelector('.modal__button');

  var promoForm = document.querySelector('.callback-promo__form');
  var callbackForm = document.querySelector('.callback__form');
  var modalForm = document.querySelector('.modal__form');


  var isEscHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      callbackModal.classList.remove('overlay');
      successModal.classList.remove('overlay');

      document.removeEventListener('keydown', isEscHandler);
    }
  };

  var closeModal = function () {
    callbackModal.classList.remove('overlay');
    successModal.classList.remove('overlay');

    document.removeEventListener('keydown', isEscHandler);
  };

  var openSuccessModal = function (evt) {
    evt.preventDefault();
    closeModal();
    modalForm.reset();
    promoForm.reset();
    callbackForm.reset();

    successModal.classList.add('overlay');
    document.addEventListener('keydown', isEscHandler);
  };

  var openCallbackModal = function (evt) {
    evt.preventDefault();

    callbackModal.classList.add('overlay');
    callbackModalInputName.focus();

    document.addEventListener('keydown', isEscHandler);
    modalForm.addEventListener('submit', openSuccessModal);
  };

  callbackButton.addEventListener('click', openCallbackModal);
  callbackModalClose.addEventListener('click', closeModal);
  callbackModal.addEventListener('click', function (evt) {
    if (evt.target === callbackModal) {
      closeModal();
    }
  });

  successModalButton.addEventListener('click', closeModal);
  successModalClose.addEventListener('click', closeModal);
  successModal.addEventListener('click', function (evt) {
    if (evt.target === successModal) {
      closeModal();
    }
  });

  promoForm.addEventListener('submit', openSuccessModal);
  callbackForm.addEventListener('submit', openSuccessModal);
})();



