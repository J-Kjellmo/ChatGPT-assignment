function addItems() {
  var item = document.createElement('div');
  var list = document.getElementById('itemList');
  var input = document.getElementById('input');
  
  var hasSpecialCharacter = /[\W_]/.test(input.value);

  if (input.value == '' || hasSpecialCharacter) {
    input.value = 'Invalid!'

    setTimeout(function() {
      input.value = '';
    }, 1000);
  }
  else {
    var newInput = input.value.replace(/\s+/g, '');

    item.innerHTML = `<p>${input.value}</p><button type="click" class="buttons" id="remove" onclick="filter(${newInput})">&#x2716</button>`
    item.id = `${newInput}`;
    item.classList.add("item")
    
    list.appendChild(item);
  
    saveItems(newInput, input.value);
  
    input.value = '';
  }
}

function saveItems(item, name) {
  var items = JSON.parse(localStorage.getItem('items')) || [];
  var names = JSON.parse(localStorage.getItem('names')) || [];

  console.log(name);

  items.push(item);
  names.push(name);

  localStorage.setItem('items', JSON.stringify(items));
  localStorage.setItem('names', JSON.stringify(names));

  console.log(toLocaleString);
}

function loadItems() {
  var items = JSON.parse(localStorage.getItem('items')) || [];
  var names = JSON.parse(localStorage.getItem('names')) || [];
  var itemList = document.getElementById('itemList');
  var i = 0;

  items.forEach(function (item) {
    var listItem = document.createElement('div')
    var newItem = item.replace(/\s+/g, '');

    listItem.innerHTML = `<p>${names[i]}</p><button type="click" class="buttons" id="remove" onclick="filter(${newItem})">&#x2716</button>`;
    listItem.id = `${newItem}`;
    listItem.classList.add("item");

    itemList.appendChild(listItem);
    i++;
  });
}

function filter(id) {
  var item = document.getElementById(id);
  var storage = JSON.parse(localStorage.getItem('items')) || [];
  var names = JSON.parse(localStorage.getItem('names')) || [];

  if (isNaN(id)) {
    var index = storage.indexOf(id.id);
  }
  else {
    var index = storage.indexOf(id.toString());
  }

  storage.splice(index, 1);
  names.splice(index, 1);

  localStorage.setItem('items', JSON.stringify(storage));
  localStorage.setItem('names', JSON.stringify(names));

  document.getElementById('itemList').innerHTML = '';
  loadItems();
}

window.onload = function() {
  loadItems();
  console.log(localStorage);
  // localStorage.clear();
  
  var input = document.getElementById('input');

  input.addEventListener('keypress', function(event) {

  if (event.key === 'Enter') {
    addItems();
  }
  });
}
