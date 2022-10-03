import Task from "../task/task";

const TaskList = ({ taskList, onDelete, onToggleDone, setUpdatedItem}) => {  
 
   let task = taskList.map((t) => {
      return (
         <Task 
            key={t.id}
            t={t}
            onDelete={onDelete}
            onToggleDone={onToggleDone}
            setUpdatedItem={setUpdatedItem}
         />
   )});
   
 return (
    taskList !== [] ? 
       <section className="main">
          <ul className="todo-list">{task}</ul>
       </section>
        : null
   )
   
};

export default TaskList;