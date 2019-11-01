'use strict';

(function () {
    window.popup = document.querySelector('.popup');
    window.saveButton = window.popup.querySelector('.button--save');
    window.popupOverlay = document.querySelector('.popup-overlay');
    window.form = document.querySelector('.form');
    const createTask = form.querySelector('.button-create');
    const closeButton = window.popup.querySelector('.button--cansel');

    window.showPopup = function () {
        window.popup.style.display = 'block'; 
        window.popupOverlay.style.display = 'block';
    };

    window.closePopup = function () {
        window.popup.style.display = 'none'; 
        window.popupOverlay.style.display = 'none';
    }


    createTask.addEventListener('click', function(evt) {
        evt.preventDefault();
        window.showPopup();
    });

    closeButton.addEventListener('click', function(evt) {
        evt.preventDefault();
        window.closePopup();
    });

    window.saveButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.collectData();
        window.renderTasks(window.list);
        window.renderOptions();
        window.clearValueFilter();
    });

})();