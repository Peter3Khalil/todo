let container = document.querySelector('.container');
let input = document.querySelector('.input');
let add = document.querySelector('.add');
let tasks = document.querySelector('.tasks');
let arrayOfTasks = [];
if(localStorage.data){
    arrayOfTasks = JSON.parse(localStorage.data)
    show();
}

// localStorage.clear();
add.onclick = ()=>{
    if(input.value.trim() !==""){
        const task = {
            id:Date.now(),
            title:input.value,
            completed:false
        }
        arrayOfTasks.push(task);
        localStorage.data = JSON.stringify(arrayOfTasks)
        input.value='';
    }
    show();
}
function show(){
    tasks.innerHTML = ''
    arrayOfTasks.forEach(task=>{

    let taskDiv = document.createElement('div');
    taskDiv.className = "task";
    
    taskDiv.setAttribute('data-id',task.id);
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(task.title));

    let btnsDiv = document.createElement('div');
    btnsDiv.className = 'btns';

    let delBtn = document.createElement("button");
    delBtn.className = 'delete';
    delBtn.type = 'button';
    delBtn.addEventListener('click',()=>delTask(task.id));
    delBtn.appendChild(document.createTextNode('delete'));

    // let checkBox = document.createElement('input');
    // checkBox.className='box';
    // checkBox.type = 'checkbox';
    // checkBox.addEventListener('click',()=>{
    
    //     checkBox.checked = true;
    //     task.completed = true;
    //     arrayOfTasks.map(task=>{
    //         if(checkBox.checked){}
    //     })
    //     console.log(arrayOfTasks)
    //     taskDiv.className += ' done';
    // })
    
    // btnsDiv.append(delBtn,checkBox)
    taskDiv.append(span,delBtn);
    tasks.append(taskDiv)
   });
   //create reset button
   if(arrayOfTasks.length){
    let reset = document.createElement('button');
    reset.className = 'reset';
    reset.type = 'button';
    reset.appendChild(document.createTextNode('Reset'))
    reset.addEventListener('click',()=>del());
    tasks.append(reset)
   }
   
}
function delTask(id){
    arrayOfTasks =  arrayOfTasks.filter(task=>task.id!==id);
    localStorage.data = JSON.stringify(arrayOfTasks);
    show();
}
function del(){
    arrayOfTasks=[];
    localStorage.clear();
    show();
}
