'use strict';

var price = [100, 300, 150, 50, 200, 250, 400];
var rooms = [1, 2, 3, 4];
var guests = [1, 2, 3, 4];
var timeCheck = ['12:00', '13:00', '14:00'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getAvatarImgList = function () {
  var avatarImgList = [];
  for (var i = 1; i <= 8; i++) {
    avatarImgList.push('img/avatars/userget0' + i + '.png');
  }
  return avatarImgList;
};

var getRandomItem = function (RandomItem) {
  return Math.floor(Math.random() * RandomItem.length);
};

var getProperties = function (properties) {
  return properties[getRandomItem(properties)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getListItems = function (list) {
  var newListLength = getRandomNumber(1, list.length);
  var newList = list.slice(0, newListLength);
  return newList;
};

var getAdItem = function (j) {
  return {
    author: {
      avatar: getAvatarImgList()[j],
    },
    offer: {
      title: 'заголовок предложения',
      address: '{{location.x}}, {{location.y}}',
      price: getProperties(price),
      type: getProperties(type),
      rooms: getProperties(rooms),
      guests: getProperties(guests),
      checkin: getProperties(timeCheck),
      checkout: getProperties(timeCheck),
      features: getListItems(features),
      description: 'строка с описанием',
      photos: getListItems(photos),
    },
    location: {
      x: getRandomNumber(130, 630),
      y: getRandomNumber(130, 630),
    }
  };
};

var adList = [];

for (var j = 0; j < 8; j++) {
  adList.push(getAdItem(j));
}

document.querySelector('.map').classList.remove('map--faded');

