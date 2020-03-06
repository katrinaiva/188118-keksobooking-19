'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var KEY_ESCAPE = 'Escape';
  var LEFT_BTN_MOUSE = 0;
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
  var mapPinsWrap = document.querySelector('.map__pins');
  // управляет карточкой объявления
  popupClose.addEventListener('click', function () {
    mapCard.classList.add('popup');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === KEY_ESCAPE) {
      mapCard.classList.add('popup');
    }
  });

  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === KEY_ENTER) {
      mapCard.classList.add('popup');
    }
  });
  // активация карточки и пина
  var getActivePin = function () {
    var mapPins = document.querySelectorAll('.map__pin');

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
    if (evt.button === LEFT_BTN_MOUSE) {
      window.pin.activate();
      getActivePin();

      mapPinMain.addEventListener('mousedown', function (mouseDownEvt) {
        mouseDownEvt.preventDefault();

        var startCoords = {
          x: mouseDownEvt.clientX,
          y: mouseDownEvt.clientY
        };

        var getCoordinates = function (mouseEvent) {
          var activePinMainWidth = mapPinMainWidth / 2;
          var activePinMainHeight = mapPinMainHeight + 'px';
          var borderlineXLeft = mapPinsWrap.offsetLeft;
          var borderlineXRight = borderlineXLeft + mapPinsWrap.offsetWidth;
          var borderlineX = mapPinMain.offsetLeft;
          var borderlineY = mapPinMain.offsetTop;

          var shift = {
            x: startCoords.x - mouseEvent.clientX,
            y: startCoords.y - mouseEvent.clientY
          };

          startCoords = {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY
          };

          if (borderlineY < 130) {
            borderlineY = 130;
          }

          if (borderlineY > 630) {
            borderlineY = 630;
          }

          if (borderlineX < borderlineXLeft) {
            borderlineX = borderlineXLeft;
          }

          if (borderlineX > borderlineXRight - activePinMainWidth) {
            borderlineX = borderlineXRight - activePinMainWidth;
          }

          mapPinMain.style.top = (borderlineY - shift.y) + 'px';
          mapPinMain.style.left = (borderlineX - shift.x) + 'px';

          var getCoordinatePinY = function () {
            var coordinatePinActiveY = (parseInt(mapPinMain.style.top, 10) + parseInt(activePinMainHeight, 10)) + 'px';
            return coordinatePinActiveY;
          };

          var getCoordinatePinX = function () {
            var coordinatePinActiveX = parseInt(mapPinMain.style.left, 10) + 'px';
            return coordinatePinActiveX;
          };

          fieldAddress.value = getCoordinatePinY() + ' , ' + getCoordinatePinX();
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          getCoordinates(moveEvt);
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          getCoordinates(upEvt);

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
    if (evt.button === LEFT_BTN_MOUSE) {
      changeDomElementState();
      mapPinMain.removeEventListener('mousedown', onPinMainMousedown);
    }
  };

  mapPinMain.addEventListener('mousedown', onActivatePins);
  mapPinMain.addEventListener('mousedown', onPinMainMousedown);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === KEY_ENTER) {
      window.form.changeDomElementState();
    }
  });
})();
