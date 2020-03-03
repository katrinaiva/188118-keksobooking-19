'use strict';

(function () {
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
        address: 'location.x, location.y',
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

  window.data = {
    adList: adList
  };
})();
