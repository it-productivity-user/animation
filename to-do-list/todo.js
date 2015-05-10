var todoListName = 'todo-list';
var file;
var reader = new FileReader();
reader.onload = function () {
    var fileText = reader.result;
    updateTodoListWith(fileText);
};

function sortAuto(item1, item2) {
    // TODO implement sort function for TODO items
    // for sorting in descending order, return integer n:
    //   * n = 0 if items are equal
    //   * n > 0 if item1 < item2
    //   * n < 0 if item1 > item2
    return 0;
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

