'use strict';

(function () {
    const task = document.querySelector('#task').content.querySelector('.list-item');

    window.clearInput = function () {
        window.title.value = '';
        window.description.value = '';
        window.priority.value = 'high';
    };

    window.renderTask = function (item) {
        window.newTask = task.cloneNode(true);

        const newTitle = window.newTask.querySelector('.list-item__title');
        const newDescription = window.newTask.querySelector('.list-item__description');
        const newPriority = window.newTask.querySelector('.list-item__priority');

        newTitle.innerHTML = item.title;
        newDescription.innerHTML = item.description;
        newPriority.innerHTML = item.priority;
        window.newTask.setAttribute('data-id', item.id);

        if (item.status == 'done') {
            window.transferToDone(window.newTask);
        }
        
        window.clearInput();
        return newTask;
    };

    window.renderTasks = function (data) {
        if (document.querySelector('.resave')) {
            return
        }
        const taskList = document.querySelector('.task-list');
        taskList.innerHTML = '';

        for (var i = 0; i < data.length; i++) {
            taskList.appendChild(window.renderTask(data[i]));
        }

        window.closePopup();
    }

    window.renderOptions = function () {
        const listItemButtons = document.querySelectorAll('.list-item__button');
        listItemButtons.forEach(function (el) {
            el.addEventListener('click', function () {
                console.log('111');
                window.openOptions(el);
                window.subscriptionOnCloseOptions();
                window.subscriptionOnDeleteTask();
                window.subscriptionOnDoneTask();
                window.subscriptionOnEditTask();
            });
        });
    };
    
})();