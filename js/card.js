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
    avatarImgList.push('img/avatars/user0' + i + '.png');
  }
  return avatarImgList;
};

var getRandomItem = function (RandomItem) {
  return Math.floor(Math.random() * RandomItem.length);
};

var getProperties = function (properties) {
  return properties[getRandomItem(properties)];
};

var getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getListItems = function (list) {
  var newListLength = getRandomIntInclusive(1, list.length);
  return list.slice(0, newListLength);
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
      x: getRandomIntInclusive(130, 630),
      y: getRandomIntInclusive(130, 630),
    }
  };
};

var adList = [];

for (var j = 0; j < 8; j++) {
  adList.push(getAdItem(j));
}

document.querySelector('.map').classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getPinItem = function (i) {
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
  pinFragment.appendChild(getPinItem(i));
}

document.querySelector('.map__pins').appendChild(pinFragment);

var cardFragment = document.createDocumentFragment();

var templateCard = document.querySelector('#card').content.querySelector('.map__card');

var convertOfferType = function (ij) {
  switch (adList[ij].offer.type) {
    case 'house':
      return 'Дом';
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'palace':
      return 'Дворец';
    default:
      return 'нет такого типа';
  }
};

var getCardItem = function () {
  var cardItem = templateCard.cloneNode(true);
  var cardImg = cardItem.querySelector('.popup__photo');
  var cardDivImg = cardItem.querySelector('.popup__photos');
  function getCardImg(k) {
    cardImg.src = adList[1].offer.photos[k];
    return cardImg;
  }
  for (var k = 0; k < adList[1].offer.photos.length; k++) {
    //console.log(getCardImg(k));
    var cloneCardImg = cardImg.cloneNode(true);
    cloneCardImg = getCardImg(k);
    cardDivImg.appendChild(cloneCardImg);
    // console.log(cardDivImg);
  }

  cardItem.querySelector('.popup__title').textContent = adList[1].offer.title;
  cardItem.querySelector('.popup__text--address').textContent = adList[1].offer.address;
  cardItem.querySelector('.popup__text--price').textContent = adList[1].offer.price + '₽/ночь';
  cardItem.querySelector('.popup__type').textContent = convertOfferType(1);
  cardItem.querySelector('.popup__text--capacity').textContent = adList[1].offer.rooms + ' комнаты для ' + adList[1].offer.rooms + ' гостей';
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + adList[1].offer.checkin + ' выезд до ' + adList[1].offer.checkout;
  cardItem.querySelector('.popup__features').textContent = adList[1].offer.features;
  cardItem.querySelector('.popup__description').textContent = adList[1].offer.description;
  //cardItem.querySelector('.popup__photos').push(photosSrc);
  cardItem.querySelector('.popup__avatar').src = adList[1].author.avatar;
  return cardItem;
};

cardFragment.appendChild(getCardItem());

document.querySelector('.map__pins').appendChild(cardFragment);
