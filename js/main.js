'use strict';

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

var getListItems = function (list) {
  var newListLength = getRandomInt(1, list.length);
  return list.slice(0, newListLength);
};

var getAdItem = function () {
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
      features: getListItems(FEATURES),
      description: getRandomItem(DESCRIPTIONS),
      photos: getListItems(PHOTOS),
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

document.querySelector('.map').classList.remove('map--faded');

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
