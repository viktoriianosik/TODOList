'use strict';

(function () {

    window.transferToDone = function (task) {
        task.classList.add('list-item--done');
        task.querySelector('.list-item__button').classList.add('list-item__button--done');
    };

    const closeOptions = function () {
        const options = document.querySelector('.popup-options');
        const targetTask = options.closest('.list-item');
        const listItemButton = document.querySelector('.list-item__button');
        targetTask.querySelector('.popup-options').remove();
        listItemButton.removeEventListener('click', closeOptions);
    }

    window.subscriptionOnCloseOptions = function () {
        const isPopupOptions = !!document.querySelector('.popup-options');
        const listItemButton = document.querySelector('.list-item__button');
        if (isPopupOptions) {
            listItemButton.addEventListener('click', closeOptions);
        };
    }


    window.openOptions = function(el) {
        const isPopupOptions = !!document.querySelector('.popup-options');
        const options = document.querySelector('#options').content.querySelector('.popup-options');

        if (isPopupOptions) {
            return
        }

        window.popupOptions = options.cloneNode(true);
        el.after(window.popupOptions);
    };

    const onDeleteButtonClick = function (evt) {
        const targetTask =  evt.target.closest('.list-item');
        const targetAttribute = targetTask.getAttribute('data-id');
        window.list = window.list.filter(function (item) {
            return item.id !== targetAttribute;
        });
        targetTask.remove();
    };

    const onDoneButtonClick = function (evt) {
        const targetTask =  evt.target.closest('.list-item');
        const targetAttribute = targetTask.getAttribute('data-id');
        window.list.forEach(function (item) {
            if (item.id == targetAttribute) {
                item.status = 'done';
            }
        });
        transferToDone(targetTask);
        targetTask.querySelector('.popup-options').remove();
    };

    const onEditButtonClick = function (evt) {
        const targetEditTask =  evt.target.closest('.list-item');
        const targetTitle = targetEditTask.querySelector('.list-item__title');
        const targetDescription = targetEditTask.querySelector('.list-item__description');
        const targetPriority = targetEditTask.querySelector('.list-item__priority');

        targetEditTask.querySelector('.popup-options').remove();
        window.showPopup();
        window.popup.classList.add('resave');

        window.title.value = targetTitle.innerHTML;
        window.description.value = targetDescription.innerHTML;
        window.priority.value = targetPriority.innerHTML;

        const resaveTask = function() {
            if (document.querySelector('.resave')) {
                const targetAttribute = targetEditTask.getAttribute('data-id');
                window.list.forEach(function (item) {
                    if (item.id == targetAttribute) {
                        item.title = window.title.value;
                        item.description = window.description.value;
                        item.priority = window.priority.value;
                    }
                });

                targetTitle.innerHTML = window.title.value ;
                targetDescription.innerHTML = window.description.value;
                targetPriority.innerHTML = window.priority.value;

                window.closePopup();
                window.clearInput();

                window.popup.classList.remove('resave');
            } 
            window.saveButton.removeEventListener('click', resaveTask);
        }
        window.saveButton.addEventListener('click', resaveTask);
    }

    window.subscriptionOnDeleteTask = function () {
        const deleteButton = document.querySelector('.option-item__button--delete');
        deleteButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            onDeleteButtonClick(evt);
        });
    };

    window.subscriptionOnDoneTask = function () {
        const doneButton = document.querySelector('.option-item__button--done');
        doneButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            onDoneButtonClick(evt);
        });
    };
    window.subscriptionOnEditTask = function () {
        const editButton = document.querySelector('.option-item__button--edit');
        editButton.addEventListener('click', function (evt) {
            onEditButtonClick(evt)
        });
    };

})();