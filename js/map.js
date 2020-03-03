'use strict';

(function () {
  var mapCard = document.querySelector('.map__card');
  var popupClose = document.querySelector('.popup__close');
  var mapPinMain = document.querySelector('.map__pin--main');

  // управляет карточкой объявления
  popupClose.addEventListener('click', function () {
    mapCard.classList.add('popup');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') { // TODO
      mapCard.classList.add('popup');
    }
  });

  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') { // TODO
      mapCard.classList.add('popup');
    }
  });
  // активация карточки и пина
  var getActivePin = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    var mapPinsWrap = document.querySelector('.map__pins');

    var mapPinClick = function (mapPinItem) {
      mapPinItem.addEventListener('click', function () {
        var mapPinActive = mapPinsWrap.querySelector('.map__pin--active');
        if (mapPinActive) {
          mapPinActive.classList.remove('map__pin--active');
          mapCard.classList.add('popup');
        }
        mapPinItem.classList.add('map__pin--active');
        mapCard.classList.remove('popup');
      });
    };

    for (var i = 1; i < mapPins.length; i++) {
      mapPinClick(mapPins[i]);
    }
  };

  var onActivatePins = function (evt) {
    if (evt.button === 0) {
      window.pin.activate();
      getActivePin();
    }

    mapPinMain.removeEventListener('mousedown', onActivatePins);
  };

  var onPinMainMousedown = function (evt) {
    if (evt.button === 0) {
      window.form.changeDomElementState();
      window.form.getCoordinatesPinActive();
      mapPinMain.removeEventListener('mousedown', onPinMainMousedown);
    }
  };

  mapPinMain.addEventListener('mousedown', onActivatePins);
  mapPinMain.addEventListener('mousedown', onPinMainMousedown);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') { // TODO key in to utils.js
      window.form.changeDomElementState();
    }
  });
})();
