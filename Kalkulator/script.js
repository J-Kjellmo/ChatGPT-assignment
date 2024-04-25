function generateButtons(numButtons, buttonProperties) {
    var container = document.getElementById('bottomCalc');

    container.innerHTML = '';

    for (var i = 0; i < numButtons; i++) {
        var button = document.createElement('button');

        button.id = buttonProperties[i].id;
        button.className = buttonProperties[i].class;
        button.textContent = buttonProperties[i].text; 

        container.appendChild(button);
    }

    var buttons = document.getElementsByClassName('calcButton');

    for (var j = 0; j < numButtons; j++) {
      var button = buttons[j];
      
      if (button.id == 'c') {
        button.addEventListener('click', clearEquation);
      }
      else if (button.id == '=') {
        button.addEventListener('click', solveMath);
      }
      else if (button.id == '<') {
        button.addEventListener('click', backSpace);
      }
      else {
        button.addEventListener('click', addInputElement);
      }
    }
}

function addInputElement(event) {
  var target = event.target.id;
  var container = document.getElementById('calcText');

  container.value += target; 
}

function solveMath() {
  var equation = document.getElementById('calcText').value;
  var equated = eval(equation);

  document.getElementById('calcText').value = equated;
}

function clearEquation() {
  document.getElementById('calcText').value = '';
}

function backSpace() {
  document.getElementById('calcText').value = document.getElementById('calcText').value.substring(0, document.getElementById('calcText').value.length - 1);
  
}

var buttonProperties = [
    { id: '7', class: 'calcButton', text: '7' },
    { id: '8', class: 'calcButton', text: '8' },
    { id: '9', class: 'calcButton', text: '9' },
    { id: '<', class: 'calcButton', text: '<' },
    { id: 'c', class: 'calcButton', text: 'c' },

    { id: '4', class: 'calcButton', text: '4' },
    { id: '5', class: 'calcButton', text: '5' },
    { id: '6', class: 'calcButton', text: '6' },
    { id: '+', class: 'calcButton', text: '+' },
    { id: '-', class: 'calcButton', text: '-' },

    { id: '1', class: 'calcButton', text: '1' }, 
    { id: '2', class: 'calcButton', text: '2' }, 
    { id: '3', class: 'calcButton', text: '3' },
    { id: '*', class: 'calcButton', text: '*' },
    { id: '/', class: 'calcButton', text: '/' },


    { id: '0', class: 'calcButton', text: '0' },
    { id: '.', class: 'calcButton', text: '.' },
    { id: '=', class: 'calcButton eq', text: '=' },
    { id: '(', class: 'calcButton', text: '(' },
    { id: ')', class: 'calcButton', text: ')' },
]
generateButtons(buttonProperties.length, buttonProperties);
