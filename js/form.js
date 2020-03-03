'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var capacity = adForm.querySelector('#capacity');
  var roomNumber = adForm.querySelector('#room_number');
  var BORDER_ERROR = '2px dashed red';
  var BORDER_DEFAULT = '1px solid #d9d9d3';
  var mapPinMain = document.querySelector('.map__pin--main');
  var fieldsSets = document.querySelectorAll('fieldset');
  var selectors = document.querySelectorAll('select');
  var mapFilters = document.querySelector('.map__filters');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var formSelect = adForm.querySelectorAll('select');
  var filterSelect = mapFilters.querySelectorAll('select');
  var filterFieldset = mapFilters.querySelectorAll('fieldset');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeOfHousing = document.querySelector('#type');
  var priceOfHousing = document.querySelector('#price');

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

  var getCoordinatesPinActive = function () {
    var xCenterActive = mapPinX + mapPinMainWidth / 2;
    var yCenterActive = mapPinY + mapPinMainHeight;
    fieldAddress.value = xCenterActive + ', ' + yCenterActive;
  };

  var getCoordinatesPinDisabled = function () {
    var xCenterDisabled = mapPinX + mapPinMainHeight / 2;
    var yCenterDisabled = mapPinY + mapPinMainHeight / 2;
    fieldAddress.value = xCenterDisabled + ', ' + yCenterDisabled;
  };

  getCoordinatesPinDisabled();

  var checkValue = function () {
    if (+capacity.value > +roomNumber.value) {
      capacity.setCustomValidity('количество гостей, должно быть не больше ' + roomNumber.value);
      capacity.style.border = BORDER_ERROR;
    } else if (+roomNumber.value === 100 && +capacity.value !== 0) {
      capacity.setCustomValidity('доступно только - не для гостей');
      capacity.style.border = BORDER_ERROR;
    } else if (+roomNumber.value !== 100 && +capacity.value === 0) {
      capacity.setCustomValidity('доступно только для 100 комнат');
      capacity.style.border = BORDER_ERROR;
    } else {
      capacity.setCustomValidity('');
      capacity.style.border = BORDER_DEFAULT;
    }
  };

  capacity.addEventListener('change', function () {
    checkValue();
  });
  roomNumber.addEventListener('change', function () {
    checkValue();
  });

  timeIn.addEventListener('change', function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });

  timeOut.addEventListener('change', function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

  var getPriceValue = function (priceValue) {
    priceOfHousing.value = priceValue;
    priceOfHousing.min = priceValue;
    priceOfHousing.placeholder = priceValue;
  };

  getPriceValue('выберете тип жилья');

  typeOfHousing.addEventListener('change', function () {
    var typeOfHousingValue = typeOfHousing.value;
    switch (typeOfHousingValue) {
      case 'house':
        getPriceValue('5000');
        break;
      case 'bungalo':
        getPriceValue('0');
        break;
      case 'flat':
        getPriceValue('1000');
        break;
      case 'palace':
        getPriceValue('10000');
        break;
      default:
        getPriceValue('нет подходящих значений');
    }
  });

  window.form = {
    changeDomElementState: changeDomElementState,
    getCoordinatesPinActive: getCoordinatesPinActive
  };
})();
