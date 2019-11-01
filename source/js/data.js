'use strict';

(function () {
    window.list = [];
    window.collectData = function () {
        if (document.querySelector('.resave')) {
            return
        }
        window.title = window.popup.querySelector('.popup-form__input');
        window.description = window.popup.querySelector('.popup-form__textarea');
        window.priority = window.popup.querySelector('.popup-form__select');

        const item = {
            id: window.title.value.replace(/\s/g, ''),
            title: window.title.value,
            description: window.description.value,
            priority: window.priority.value,
            status: 'open',
        }

        window.list.push(item);
    }
})();