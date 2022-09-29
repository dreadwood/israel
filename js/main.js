'use strict';

(function () {
  var TEL_LENGTH = 11;
  var ESC_KEY = 'Escape';
  var LIVE_SLIDER_TIMING = 4000;

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
  var headerCallbackButton = document.querySelector('.page-header__link');

  var callbackModal = document.querySelector('.modal--callback');
  var callbackModalClose = callbackModal.querySelector('.modal__close');

  var successModal = document.querySelector('.modal--success');
  var successModalClose = successModal.querySelector('.modal__close');
  var successModalButton = successModal.querySelector('.modal__button');

  var promoForm = document.querySelector('.callback-promo__form');
  var promoFormTel = promoForm.querySelector('.input--tel');
  var callbackForm = document.querySelector('.callback__form');
  var callbackFormName = callbackForm.querySelector('.input--name');
  var callbackFormTel = callbackForm.querySelector('.input--tel');
  var modalForm = document.querySelector('.modal__form');
  var modalFormName = modalForm.querySelector('.input--name');
  var modalFormTel = modalForm.querySelector('.input--tel');

  var isEscHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();

      closeModal();

      document.removeEventListener('keydown', isEscHandler);
    }
  };

  var closeModal = function () {
    callbackModal.classList.remove('overlay');
    successModal.classList.remove('overlay');
    document.body.classList.remove('scroll-hidden');

    document.removeEventListener('keydown', isEscHandler);
  };

  var openSuccessModal = function (evt) {
    evt.preventDefault();

    document.body.classList.add('scroll-hidden');

    modalForm.reset();
    promoForm.reset();
    callbackForm.reset();

    successModal.classList.add('overlay');
    document.addEventListener('keydown', isEscHandler);
  };

  var openCallbackModal = function (evt) {
    evt.preventDefault();

    document.body.classList.add('scroll-hidden');
    callbackModal.classList.add('overlay');
    modalFormName.focus();

    document.addEventListener('keydown', isEscHandler);
    modalForm.addEventListener('submit', function (evtSubmit) {
      localStorage.setItem('userName', modalFormName.value);
      localStorage.setItem('userTel', modalFormTel.value);
      openSuccessModal(evtSubmit);
    });
  };

  headerCallbackButton.addEventListener('click', openCallbackModal);

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

  promoForm.addEventListener('submit', function (evt) {
    localStorage.setItem('userTel', promoFormTel.value);
    openSuccessModal(evt);
  });

  callbackForm.addEventListener('submit', function (evt) {
    localStorage.setItem('userName', callbackFormName.value);
    localStorage.setItem('userTel', callbackFormTel.value);
    openSuccessModal(evt);
  });

  // Раздел программы
  var programsSection = document.querySelector('.programs');
  var programButtons = programsSection.querySelectorAll('.list-button__item');
  var programItems = programsSection.querySelectorAll('.programs__item');

  programsSection.classList.remove('programs--no-js');

  var switchItem = function (arrItems, i, classActive) {
    arrItems.forEach(function (item) {
      item.classList.remove(classActive);
    });
    arrItems[i].classList.add(classActive);
  };

  programButtons.forEach(function (button, i) {
    button.addEventListener('click', function () {
      switchItem(programButtons, i, 'list-button__item--active');
      switchItem(programItems, i, 'programs__item--active');
    });
  });

  // Раздел жизнь в Израиле
  var liveSection = document.querySelector('.live');
  var liveSlider = null;

  liveSection.classList.remove('live--no-js');

  var activeSwiper = function () {
    liveSlider = new Swiper('.live__list-wrapper', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 4000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'live__control-item',
        bulletActiveClass: 'live__control-item--active',
      },
    });
  };

  if (window.matchMedia('(max-width: 767px)').matches) {
    activeSwiper();
  }

  window.addEventListener('resize', function () {
    var viewport = document.documentElement.clientWidth;
    if (viewport < 768 && !liveSlider) {
      activeSwiper();
    } else if (viewport >= 768 && liveSlider) {
      liveSlider.destroy();
      liveSlider = null;
    }
  });

  // раздел FAQ
  var faqSection = document.querySelector('.faq');
  var accordionItems = document.querySelectorAll('.accordion__item');
  var accordionButton = document.querySelectorAll('.accordion__button');

  faqSection.classList.remove('faq--no-js');

  accordionButton.forEach(function (button, i) {
    button.addEventListener('click', function () {
      switchItem(accordionItems, i, 'accordion__item--active');
    });
  });

  // раздел отзывы
  var reviewsSection = document.querySelector('.reviews');
  reviewsSection.classList.remove('reviews--no-js');

  var reviewsSlider = new Swiper('.reviews__wrapper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.reviews__counter',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.control__button--next',
      prevEl: '.control__button--prev ',
    },
  });
})();
