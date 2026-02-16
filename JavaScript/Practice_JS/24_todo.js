let input = document.querySelector('#input-box');
let listContainer = document.querySelector('#list-container');

function AddTask(){
    if(input.value === ''){
        alert('You must write something!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = input.value;

        let delBtn = document.createElement('span');
        delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        delBtn.className = 'close';
        delBtn.onclick = function(){
            deleteTask(li);
        }
        li.appendChild(delBtn);  

        listContainer.append(li)
    }
    input.value = '';
    saveData();
}

// listContainer.addEventListener('click',function(e){
//     if(e.target.tagName === 'li'){{
//         e.target.classList.toggle('checked');
//     }
//     }
// },false);

function deleteTask(taskItem){
    taskItem.remove();
    saveData();
}

// localStorage is a web storage object that allows you to save key-value pairs in a web browser with no expiration date.

// setItem('data2', listContainer.innerHTML) is a method call on localStorage that sets a key-value pair.

// 'data2' is the key under which the data will be stored.
// listContainer.innerHTML is the value being stored.

function saveData(){
    localStorage.setItem('data2', listContainer.innerHTML);
}

// his function retrieves previously saved data from localStorage and displays it in the listContainer element.

// localStorage.getItem('data2') retrieves the value stored under the key 'data2' from localStorage.

function showTask(){
    listContainer.innerHTML = localStorage.getItem('data2');
}

showTask();


{/* <i class="fa-solid fa-xmark"></i> */}
{/* <i class="fa-solid fa-bolt"></i> */}