import "./index.css"
import {useState, useEffect} from "react"
import moment from "moment"
const tasks = [
  {
    id: 1,
    task: 'Finish React project',
    status: 'ongoing',
    deadline: '2024-10-01 2:00 PM',
   
  },
  {
    id: 2,
    task: 'Submit report',
    status: 'pending',
    deadline: '2024-09-30 5:00 PM',
   
  },
  {
    id: 3,
    task: 'Call the client',
    status: 'completed',
    deadline: '2024-09-25 11:00 AM',
    
  },
  {
    id: 4,
    task: 'Buy groceries',
    status: 'ongoing',
    deadline: '2024-10-02 3:00 PM',
   
  }
];



function App() {
  const[taskList,setTaskList] = useState(tasks)
  const[taskToEdit,setTaskToEdit] = useState(null)

  function handleEdit(id){
      const task = tasks.find((task) => task.id === id)
      console.log(task)
      if(task){
        setTaskToEdit(task)
      }
      console.log(taskToEdit)
  }
  function handleClickToEdit(updatedTask){
    setTaskList((prevtasks) => prevtasks.map((task) => task.id === updatedTask.id ? updatedTask : task ))
    setTaskToEdit(null)
  }
  
  
  function handleAddTasks (task){
      setTaskList((taskList) => ([...taskList,task]))
  }
  function handleDeleteTask(id){
    setTaskList((curtaskList) => curtaskList.filter((task) => task.id !== id))
  }
  function handleCancelEdit(){
    setTaskToEdit(null)
  }
  return (
   <div className="container">
      <div className="task-container">
        <TaskList tasks={taskList} onDeleteTask={handleDeleteTask} onEditTask={handleEdit}/>
      </div>
    <div className="form-container" >
      <FormAddTask onhandleAddTask={handleAddTasks} taskToEdit={taskToEdit} onhandleEdit={handleClickToEdit} onCancelEdit ={handleCancelEdit}/>
      </div>
    
   </div>
  );
}

export default App;

function TaskList({tasks,onDeleteTask,onEditTask}){
  return(
    <ul className="task-list">
      {tasks.map((task) => <Task taskObj={task} key={task.id} onDeleteTask={onDeleteTask} onEditTask={onEditTask}/>)}
    </ul>
  )

}

function Task({taskObj,onDeleteTask,onEditTask}){
 
  return(
    <li className="tasks">
      <span><h4>{taskObj.task}</h4></span>
      <span>{taskObj.status}</span>
      <span>{taskObj.deadline}</span>
      <Button style={{backgroundColor :"blue"}} className="blue" onClick={() => onEditTask(taskObj.id)}>Edit</Button>
      <Button style={{backgroundColor : "red"}} className="red" onClick={() => onDeleteTask(taskObj.id)}>Delete</Button>
    </li>
  )

}
function Button({children,style,className,onClick,type}){
  return (
    <button style={style} className={className} onClick={onClick} type={type}>{children}</button>
  )
}

function FormAddTask({onhandleAddTask,taskToEdit,onhandleEdit,onCancelEdit}){
  const[task,setTask] = useState("")
  const[status,setStatus] = useState("")
  const[deadline,setDeadline] = useState("")
  
  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setStatus(taskToEdit.status);
      setDeadline(taskToEdit.deadline);
    } else {
      // Clear the form when taskToEdit is null (when you're adding a new task)
      setTask('');
      setStatus('');
      setDeadline('');
    }
  }, [taskToEdit]);

  function handleSubmit(e){
      e.preventDefault()
      
      if(!task || !status) return;
      

      const id = crypto.randomUUID()
      const newTask = {
        id : taskToEdit ? taskToEdit.id : id,
        task,
        status,
        deadline : moment(deadline).format("YYYY-MM-DD hh:mm A")
      }
      if(taskToEdit) {
        onhandleEdit(newTask)
      }
      else {
        onhandleAddTask(newTask)
      }
      
      setTask("")
      setStatus("")
      setDeadline("")
  }
  return (
    <form className="form-content" onSubmit={handleSubmit}>
      <p>Enter task</p>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)}/>

      <p>Status</p>
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>

      <p>Deadline</p>
      <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>

      <Button style={{backgroundColor : "green"}} className="green" type="submit">{taskToEdit ? "save changes" : "Add Task"}</Button>
      <Button type="button" className={taskToEdit ? "cancel-button show" : "cancel-button"} onClick={onCancelEdit}>Cancel</Button>
    </form>
  )
}


