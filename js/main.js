'use strict';

function activate() {
  var TITLES = [
    'Уютное гнездышко для молодоженов',
    'Для молодоженов',
    'Атмосферное местечко',
  ];
  var PRICES = [100, 300, 150, 50, 200, 250, 400];
  var ROOMS = [1, 2, 3, 4];
  var GUESTS = [1, 2, 3, 4];
  var TIMES_CHECK = ['12:00', '13:00', '14:00'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var DESCRIPTIONS = [
    'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
    'Превосходные аппартаменты в центре Токио. Аппартаменты полностью укомплектованы техникой и всем необходимым.',
    'Великолепная квартира-студия в центре. Подходит как туристам, так и бизнесменам.',
    'Великолепная квартира в центре. Подходит как туристам, так и бизнесменам.',
  ];

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var getRandomItem = function (properties) {
    return properties[getRandomInt(0, properties.length - 1)];
  };

  var getRandomListItems = function (properties) {
    var newListLength = getRandomInt(1, properties.length);
    return properties.slice(0, newListLength);
  };

  var getAdItem = function (j) {
    return {
      author: {
        avatar: 'img/avatars/user0' + j + '.png',
      },
      offer: {
        title: getRandomItem(TITLES),
        address: '{{location.x}}, {{location.y}}',
        price: getRandomItem(PRICES),
        type: getRandomItem(TYPES),
        rooms: getRandomItem(ROOMS),
        guests: getRandomItem(GUESTS),
        checkin: getRandomItem(TIMES_CHECK),
        checkout: getRandomItem(TIMES_CHECK),
        features: getRandomListItems(FEATURES),
        description: getRandomItem(DESCRIPTIONS),
        photos: getRandomListItems(PHOTOS),
      },
      location: {
        x: getRandomInt(130, 630),
        y: getRandomInt(130, 630),
      }
    };
  };

  var adList = [];

  for (var j = 1; j <= 8; j++) {
    adList.push(getAdItem(j));
  }

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getPinItem = function () {
    var pinItem = pinTemplate.cloneNode(true);
    pinItem.querySelector('img[src]').src = adList[i].author.avatar;
    pinItem.querySelector('img[alt]').alt = 'заголовок объявления';
    var xOffset = pinItem.querySelector('img[width]').width / 2;
    var yOffset = pinItem.querySelector('img[height]').height;
    pinItem.style.left = adList[i].location.x + xOffset + 'px';
    pinItem.style.top = adList[i].location.y + yOffset + 'px';
    return pinItem;
  };

  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    pinFragment.appendChild(getPinItem());
  }

  document.querySelector('.map__pins').appendChild(pinFragment);
}

var fieldsSets = document.querySelectorAll('fieldset');
var selectors = document.querySelectorAll('select');

var toggleStates = function (formElement, isDisabled) {
  for (var i = 0; i < formElement.length; i++) {
    formElement[i].disabled = isDisabled;
  }
};

toggleStates(fieldsSets, true);
toggleStates(selectors, true);

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var formFieldset = adForm.querySelectorAll('fieldset');
var formSelect = adForm.querySelectorAll('select');
var filterSelect = mapFilters.querySelectorAll('select');
var filterFieldset = mapFilters.querySelectorAll('fieldset');

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

var mapDisabled = document.querySelector('.map--faded');

var onActivatePins = function (evt) {
  if (evt.button === 0) {
    activate();
    mapDisabled.removeEventListener('mousedown', onActivatePins);
  }
};

mapDisabled.addEventListener('mousedown', onActivatePins);

var onPinMainMousedown = function (evt) {
  if (evt.button === 0) {
    changeDomElementState();
    getCoordinatesPinActive();
    mapPinMain.removeEventListener('mousedown', onPinMainMousedown);
  }
};

mapPinMain.addEventListener('mousedown', onPinMainMousedown);

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    changeDomElementState();
  }
});

var capacity = adForm.querySelector('#capacity');
var roomNumber = adForm.querySelector('#room_number');
var BORDER_ERROR = '2px dashed red';
var BORDER_DEFAULT = '1px solid #d9d9d3';

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


