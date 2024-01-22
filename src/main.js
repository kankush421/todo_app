const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

// Getting Data

 async function getTodos(){
    const todoRes = await fetch(apiUrl + '?_limit=10');
    const data = await todoRes.json();
    data.forEach(todo => displayTodo(todo));
}

// Displaying Data to DOM

function displayTodo(data){
const div = document.createElement('div');
div.classList.add('todo');
div.appendChild(document.createTextNode(data.title));
div.setAttribute('data-id',data.id);

if(data.completed){
    div.classList.add('done');
}

document.getElementById('todos').appendChild(div);
}

// Posting Data

async function createTodo(e){
  e.preventDefault();
  const newTodo = {
    title: e.target.firstElementChild.value,
    completed:false,
  };

  const createdTodoRes = await fetch(apiUrl,{

    method: 'POST',
    body: JSON.stringify(newTodo),
    headers:{
        'Content-Type': 'application/json',
    },
    
  });
  const data = await createdTodoRes.json();
   displayTodo(data);
}

const toggleCompleted = (e) =>{
  if(e.target.classList.contains('todo')){
    e.target.classList.toggle('done');
    
    updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
  }    
}

// Updating Data

async function updateTodo(id,completed){
  
    const updatedRes = await fetch(`${apiUrl}/${id}`,{
        method:'PUT',
        body: JSON.stringify({completed}),
        headers:{
            'Content-Type': 'application/json',
        },
    });

      
}

// Deleting Data

async function deleteTodo(e){
    if(e.target.classList.contains('todo')){
        const id = e.target.dataset.id;
        const deleteResponse = await fetch(`${apiUrl}/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
        });
         const data = await deleteResponse.json();
         e.target.remove();
        
    }
    
}

const init = ()=>{
    document.addEventListener('DOMContentLoaded',getTodos);
    document.querySelector('#todo-form').addEventListener('submit',createTodo);
    document.querySelector('#todos').addEventListener('click', toggleCompleted);
    document.querySelector('#todos').addEventListener('dblclick',deleteTodo);
}

init();

