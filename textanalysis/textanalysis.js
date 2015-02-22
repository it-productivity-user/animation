console.log("Hello");

function analysis() {
  console.log("Analysis");
  var results = document.getElementById("results");
  var input = document.getElementById("text-input");
  var expr = document.getElementById("expression");
  results.innerHTML = getAnalysisResults(input.value, expr.value);
  results.style.backgroundColor = "#9F9";
}

function onChanges() {
  var results = document.getElementById("results");
  results.style.backgroundColor = "#FAF";
}

// TODO implement this
function getAnalysisResults(text, expression) {
  var indexOfExpr = text.search(expression);
  if (indexOfExpr >= 0) {
    return "The text contains the expression!";
  } else {
    return "Expression <b>not</b> found.";
  }
}

