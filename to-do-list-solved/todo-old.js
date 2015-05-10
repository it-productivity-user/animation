var todoListName = 'todo-list';
var sortingStrategyButtonName = 'sorting-strategy';
var fileText = '';

function isDone(todoItem) {
    return todoItem.done;
}

function isOverdue(todoItem) {
    var dueDateString = getOrDefault(todoItem.dueDate, new Date());
    return Date.parse(dueDateString) < new Date().getTime();
}

function getOrDefault(value, defaultValue) {
    return value !== undefined ? value : defaultValue;
}

function millisToHours(millis) {
    return millis / (1000 * 60 * 60);
}

function calculatePriority(todoItem) {
    var done = getOrDefault(todoItem.done, false);
    if (done) {
        return 0;
    }
    var prio = getOrDefault(todoItem.priority, 1);
    var dueDateString = getOrDefault(todoItem.dueDate, new Date()); // by default, task is due now!
    var dueDate = Date.parse(dueDateString);
    var now = new Date().getTime();
    var lateness = Math.max(0, millisToHours(now - dueDate));
    if (lateness > 0) {
        return 10 * prio + lateness;
    } else {
        return 10 * prio / (0.5 * millisToHours(dueDate - now));
    }
}

function sortAuto(item1, item2) {
    try {
        console.log("Will calculate priorities of '" + item1.description + "' and '" + item2.description + "'");
        var effPriority1 = calculatePriority(item1);
        var effPriority2 = calculatePriority(item2);
        console.log("Priority of item " + item1.description + " is " + effPriority1);
        console.log("Priority of item " + item2.description + " is " + effPriority2);
        return effPriority1 < effPriority2;
    } catch(e) {
        console.log("ERROR!!!! " + e);
        return 1;
    }
}

function sortByField(item1, item2) {
    var fieldName = document.getElementById('sortByField').value;
    return item1[fieldName] > item2[fieldName];
}

var sortStrategies = {
    'FIRST': sortAuto, 'FIELD': sortByField
}

function selectSortFunction(strategyButtons) {
    for (var i = 0; i < strategyButtons.length; i++) {
        var button = strategyButtons[i];
        if (button.checked) {
            return sortStrategies[button.value];
        }
    }
}

function todoItemAsHtml(todoItem) {
    var classes = "list-item";
    if (isDone(todoItem)) {
        classes += ' done';
    } else if (isOverdue(todoItem)) {
        classes += ' late';
    }
    function fieldValue(key) {
        var value = todoItem[key];
        if (key === 'dueDate') {
            return new Date(value);
        } else {
            return value;
        }
    }
    var result = "<div class='" + classes + "'>";
    for (key in todoItem) {
        result += "<div><b>" + key + ":</b> " + fieldValue(key) + "</div>";
    }
    return result + "</div>";
}

function updateTodoList() {
    var todoListDiv = document.getElementById(todoListName);
    var strategyButtons = document.getElementsByName(sortingStrategyButtonName);
    var sortFunction = selectSortFunction(strategyButtons);
    console.log("using sort function "+sortFunction);
    if (fileText.length === 0) {
        alert("Select a valid JSON file");
        return;
    }
    try {
        var jsonList = JSON.parse(fileText);
        todoListDiv.innerHTML = "";
        jsonList.sort(sortFunction).forEach(function (todoItem) {
            todoListDiv.innerHTML += todoItemAsHtml(todoItem);
        });
    } catch (e) {
        alert(e);
    }
}

function onFileChange(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        fileText = reader.result;
        updateTodoList();
    };
    reader.readAsText(file);
}
