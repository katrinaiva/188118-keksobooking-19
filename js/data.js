'use strict';

(function activate() {
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

  window.data = {
    TITLES: TITLES,
    PRICES: PRICES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    TIMES_CHECK: TIMES_CHECK,
    TYPES: TYPES,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    DESCRIPTIONS: DESCRIPTIONS
  };
})();
