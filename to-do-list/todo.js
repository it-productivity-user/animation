var todoListName = 'todo-list';
var sortingStrategyButtonName = 'sorting-strategy';
var fileText = '';

function sortAuto(item1, item2) {
    // TODO implement auto sort function for TODO items
    return true;
}

function sortByField(item1, item2) {
    var fieldName = document.getElementById('sortByField').value
    // TODO implement sort by fieldName
    return true;
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
    // TODO add other classes to the todoItem depending on its state
    var classes = "list-item";
    var result = "<div class='" + classes + "'>";
    for (key in todoItem) {
        result += "<div><b>" + key + ":</b> " + todoItem[key] + "</div>";
    }
    return result + "</div>";
}

function updateTodoList() {
    var todoListDiv = document.getElementById(todoListName);
    var strategyButtons = document.getElementsByName(sortingStrategyButtonName);
    var sortFunction = selectSortFunction(strategyButtons);
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
