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

var br = "<br>";

function getAnalysisResults(text, expression) {
  expression = expression.trim();
  if (expression === '') {
    return noExpressionAnalysis(text);
  } else {
    return expressionAnalysis(text, expression);
  }
}

function expressionAnalysis(text, expression) {
  var lines = text.split('\n');
  var matchingLines = lines.filter(function(t) {
    return t.search(expression) >= 0;
  });
  var containsExpr;
  if (matchingLines.length > 0) {
    containsExpr = "Lines containing expression:<br><ul>";
    matchingLines.forEach(function(item) {
      containsExpr += "<li>" + item + "</li>";
    });
    containsExpr += "</ul>";
  } else {
    containsExpr = "Expression <b>not</b> found.";
  }
  var lineCount = "Number of lines containing the expression: " + matchingLines.length;
  var wordsPerLine = matchingLines.map(function(line) {
    var index = line.search(expression);
    var count = 0;
    while (index >= 0 && index < line.length) {
      index += 1; // do not search again from the previous match
      line = line.substring(index);
      count += 1;
      index = line.search(expression);
    }
    return count;
  });
  var wordCount = "Number of times expression was matched: " +
    wordsPerLine.reduce(function(a, b) {
      return a + b;
    });
  return containsExpr + br + lineCount + br + wordCount;
}

function noExpressionAnalysis(text) {
  var lines = text.split('\n');
  var lineCount = "Number of lines: " + lines.length;
  var words = text.split(/\s/).filter(function(t) {
    return t.trim().length > 0;
  });
  var wordCount = "Number of words: " + words.length;
  return lineCount + br + wordCount;
}

