'use strict';

(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  var convertOfferType = function (indexType) {
    switch (window.data.adList[indexType].offer.type) {
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
    var cardPhoto = cardItem.querySelector('.popup__photo');
    var cardPhotos = cardItem.querySelector('.popup__photos');
    var cardPhotosFragment = document.createDocumentFragment();

    function getCardPhoto(k) {
      var cardPhotoClone = cardPhoto.cloneNode(true);
      cardPhotoClone.src = window.data.adList[1].offer.photos[k];
      return cardPhotoClone;
    }

    for (var k = 0; k < window.data.adList[1].offer.photos.length; k++) {
      cardPhotosFragment.appendChild(getCardPhoto(k));
    }
    cardPhotos.appendChild(cardPhotosFragment);

    var cardPhotosNew = cardPhotos.querySelectorAll('.popup__photo');

    cardPhotos.removeChild(cardPhotosNew[0]);

    cardItem.querySelector('.popup__title').textContent = window.data.adList[1].offer.title;
    cardItem.querySelector('.popup__text--address').textContent = window.data.adList[1].offer.address;
    cardItem.querySelector('.popup__text--price').textContent = window.data.adList[1].offer.price + '₽/ночь';
    cardItem.querySelector('.popup__type').textContent = convertOfferType(1);
    cardItem.querySelector('.popup__text--capacity').textContent = window.data.adList[1].offer.rooms + ' комнаты для ' + window.data.adList[1].offer.rooms + ' гостей';
    cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.data.adList[1].offer.checkin + ' выезд до ' + window.data.adList[1].offer.checkout;
    cardItem.querySelector('.popup__features').textContent = window.data.adList[1].offer.features;
    cardItem.querySelector('.popup__description').textContent = window.data.adList[1].offer.description;
    cardItem.querySelector('.popup__avatar').src = window.data.adList[1].author.avatar;
    return cardItem;
  };

  document.querySelector('.map').insertBefore(getCardItem(), mapFiltersContainer);
})();


