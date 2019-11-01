'use strict';

(function () {
    const prioritySelect = window.form.querySelector('.priority');
    const statusSelect = window.form.querySelector('.status');
    const searchInput  = document.querySelector('.search__input');
     
    const searchByTitle = function (tasks) {
        return tasks.filter(function(item) {
            return item.title.includes(searchInput.value);
        });
    };
     
    const filterByPriority = function (tasks) {
        if (prioritySelect.value === 'all') {
            return tasks;
        } else {
            return tasks.filter(function(item) {
                return item.priority == prioritySelect.value;
            });
        }
    };

    const filterByStatus = function (tasks) {
        if (statusSelect.value === 'all') {
            return tasks;
        } else {
            return tasks.filter(function(item) {
                return item.status === statusSelect.value;
            });
        }
    };

    const renderFiltered = function (data) {
        window.renderTasks(data);
        window.renderOptions(); 
    };

    window.clearValueFilter = function () {
        searchInput.value = '';
        statusSelect.value = 'all';
        prioritySelect.value = 'all';
    };

    const onSearchInputChange = function () {
        if (statusSelect.value != 'all' && prioritySelect.value != 'all') {
            renderFiltered(searchByTitle(filterByStatus(filterByPriority(window.list))));
        } else if (statusSelect.value != 'all') {
            renderFiltered(searchByTitle(filterByStatus(window.list)));
        } else if (prioritySelect.value != 'all') {
            renderFiltered(searchByTitle(filterByPriority(window.list)));
        } else {
            renderFiltered(searchByTitle(window.list));
        }
    };

    const onStatusInputChange = function () {
        if (searchInput.value != '' && prioritySelect.value != 'all') {
            renderFiltered(filterByStatus(filterByPriority(searchByTitle(window.list)))); 
        } else if (searchInput.value != '') {
            renderFiltered(filterByStatus(searchByTitle(window.list)));
        } else if (prioritySelect.value != 'all') {
            renderFiltered(filterByStatus(filterByPriority(window.list))); 
        } else {
            renderFiltered(filterByStatus(window.list));
        }
    };

    const onPriorityInputChange = function () {
        if (searchInput.value != '' && statusSelect.value != 'all') {
            renderFiltered(filterByPriority(filterByStatus(searchByTitle(window.list)))); 
        } else if (searchInput.value != '') {
            renderFiltered(filterByPriority(searchByTitle(window.list))); 
        } else if (statusSelect.value != 'all') {
            renderFiltered(filterByPriority(filterByStatus(window.list)));
        } else {
            renderFiltered (filterByPriority(window.list));
        }
    }

    searchInput.addEventListener('change', function () {
       onSearchInputChange();
    });

    searchInput.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            onSearchInputChange();
        }
     });

    statusSelect.addEventListener('change', function () {
       onStatusInputChange();
    });


    prioritySelect.addEventListener('change', function () {
        onPriorityInputChange();
    });

})();