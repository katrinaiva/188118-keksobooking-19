'use strict';

(function () {
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
        title: getRandomItem(window.data.TITLES),
        address: 'location.x, location.y',
        price: getRandomItem(window.data.PRICES),
        type: getRandomItem(window.data.TYPES),
        rooms: getRandomItem(window.data.ROOMS),
        guests: getRandomItem(window.data.GUESTS),
        checkin: getRandomItem(window.data.TIMES_CHECK),
        checkout: getRandomItem(window.data.TIMES_CHECK),
        features: getRandomListItems(window.data.FEATURES),
        description: getRandomItem(window.data.DESCRIPTIONS),
        photos: getRandomListItems(window.data.PHOTOS),
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

  window.map = {
    adList: adList
  };

})();


