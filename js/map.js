'use strict';

(function () {
  var mapCard = document.querySelector('.map__card');
  var popupClose = document.querySelector('.popup__close');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var fieldsSets = document.querySelectorAll('fieldset');
  var selectors = document.querySelectorAll('select');
  var mapFilters = document.querySelector('.map__filters');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var formSelect = adForm.querySelectorAll('select');
  var filterSelect = mapFilters.querySelectorAll('select');
  var filterFieldset = mapFilters.querySelectorAll('fieldset');

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
  // активация формы и поиск координат
  var toggleStates = function (formElement, isDisabled) {
    for (var i = 0; i < formElement.length; i++) {
      formElement[i].disabled = isDisabled;
    }
  };

  toggleStates(fieldsSets, true);
  toggleStates(selectors, true);

  var changeDomElementState = function () {
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    toggleStates(formFieldset, false);
    toggleStates(formSelect, false);
    toggleStates(filterSelect, false);
    toggleStates(filterFieldset, false);
  };

  var fieldAddress = document.querySelector('#address');
  var mapPinY = parseInt(mapPinMain.style.top, 10);
  var mapPinX = parseInt(mapPinMain.style.left, 10);
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;

  var getCoordinatesPinDisabled = function () {
    var xCenterDisabled = mapPinX + mapPinMainWidth / 2;
    var yCenterDisabled = mapPinY + mapPinMainHeight / 2;
    fieldAddress.value = xCenterDisabled + ', ' + yCenterDisabled;
  };

  getCoordinatesPinDisabled();


  var onActivatePins = function (evt) {
    if (evt.button === 0) {
      window.pin.activate();
      getActivePin();

      mapPinMain.addEventListener('mousedown', function (mouseDownEvt) {
        mouseDownEvt.preventDefault();

        var startCoords = {
          x: mouseDownEvt.clientX,
          y: mouseDownEvt.clientY
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          var activePinMainWidth = (mapPinMainWidth / 2) + 'px';
          var activePinMainHeight = (mapPinMainHeight) + 'px';


          if (mapPinMain.offsetTop > 130 && mapPinMain.offsetTop < 630) {
            mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
          }

          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

          var getCoordinatePinY = function () {
            var mapPinMainActiveY = parseInt(mapPinMain.style.top + activePinMainHeight, 10);
            return mapPinMainActiveY;
          };

          fieldAddress.value = getCoordinatePinY() + 'px' +
            ' , ' + (parseInt((mapPinMain.style.left + activePinMainWidth), 10)) + 'px';
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }

    mapPinMain.removeEventListener('mousedown', onActivatePins);
  };


  var onPinMainMousedown = function (evt) {
    if (evt.button === 0) {
      changeDomElementState();
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
