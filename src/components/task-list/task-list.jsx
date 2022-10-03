import Task from "../task/task";

const TaskList = ({ taskList }) => {  
 
   let task = taskList.map((t) => {
      return (<Task key={t.id} t={t} />)
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