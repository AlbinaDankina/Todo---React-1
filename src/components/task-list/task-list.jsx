import Task from "../task/task";

const TaskList = ({ taskList }) => {  
 
   let task = taskList.map((task) => {
      return (<Task key={task.id} task={task} />)
   });
   
 return (
    taskList !== [] ? 
       <section className="main">
          <ul className="todo-list">{task}</ul>
       </section>
        : null
   )
   
};

export default TaskList;