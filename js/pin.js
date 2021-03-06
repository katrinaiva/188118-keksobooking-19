'use strict';

(function () {
  function activate() {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinFragment = document.createDocumentFragment();

    var getPinItem = function () {
      var pinItem = pinTemplate.cloneNode(true);
      pinItem.querySelector('img[src]').src = window.data.adList[i].author.avatar;
      pinItem.querySelector('img[alt]').alt = 'заголовок объявления';
      var xOffset = pinItem.querySelector('img[width]').width / 2;
      var yOffset = pinItem.querySelector('img[height]').height;
      pinItem.style.left = window.data.adList[i].location.x + xOffset + 'px';
      pinItem.style.top = window.data.adList[i].location.y + yOffset + 'px';
      return pinItem;
    };

    for (var i = 0; i < 8; i++) {
      pinFragment.appendChild(getPinItem());
    }

    document.querySelector('.map__pins').appendChild(pinFragment);
  }

  window.pin = {
    activate: activate
  };

})();
