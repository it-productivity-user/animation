var todoListName = 'todo-list';
var file;
var reader = new FileReader();
reader.onload = function () {
    var fileText = reader.result;
    updateTodoListWith(fileText);
};

function sortAuto(item1, item2) {
    try {
        console.log("Will calculate priorities of '" + item1.description + "' and '" + item2.description + "'");
        var effPriority1 = calculatePriority(item1);
        var effPriority2 = calculatePriority(item2);
        console.log("Priority of item " + item1.description + " is " + effPriority1);
        console.log("Priority of item " + item2.description + " is " + effPriority2);
        return effPriority2 - effPriority1;
    } catch(e) {
        console.log("ERROR!!!! " + e);
        return 0;
    }

}

function getOrDefault(value, defaultValue) {
    return value !== undefined ? value : defaultValue;
}

function isDone(todoItem) {
    return getOrDefault(todoItem.done, false);
}

function priorityOf(todoItem) {
    return getOrDefault(todoItem.priority, 1);
}

function dueDateOf(todoItem) {
    return getOrDefault(todoItem.dueDate, "1 January 2015 09:00");
}

function isOverdue(todoItem) {
    return Date.parse(dueDateOf(todoItem)) < new Date();
}

function millisToHours(millis) {
    return millis / (1000 * 60 * 60);
}

function calculatePriority(todoItem) {
    var done = isDone(todoItem);
    if (done) {
        return 0;
    }
    var prio = priorityOf(todoItem);
    var dueDateString = dueDateOf(todoItem);
    var dueDate = Date.parse(dueDateString);
    var now = new Date().getTime();
    var lateness = Math.max(0, millisToHours(now - dueDate));
    if (lateness > 0) {
        return 10 * prio + lateness;
    } else {
        return 10 * prio / (0.5 * millisToHours(dueDate - now));
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
    if (typeof(file) != "undefined") {
        reader.readAsText(file);
    } else {
        alert("Please select a JSON file");
    }
}

function updateTodoListWith(fileText) {
    var todoListDiv = document.getElementById(todoListName);
    todoListDiv.innerHTML = "";
    try {
        var jsonList = JSON.parse(fileText);
        jsonList.sort(sortAuto).forEach(function (todoItem) {
            todoListDiv.innerHTML += todoItemAsHtml(todoItem);
        });
    } catch (e) {
        alert(e);
    }
}

function onFileChange(event) {
    file = event.target.files[0];
    updateTodoList();
}

