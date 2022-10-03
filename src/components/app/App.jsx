import Input from "../input/input";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";
import { useState } from "react";

const App = () => {
  
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState(''); // то, что вбивается в инпут >> содержимое таски
  const [taskId, setTaskId] = useState(1); // уникальные id для каждой таски
  const [filter, setFilter] = useState(''); // фильтр для кнопок all , done, active

  const handleInput = (e) => {
    setNewTask(e.target.value);
  };

  const onAdded = (text) => {
    if (newTask !== '') {
      const newItem = {
        text,
        important: false,
        done: false,
        id: taskId
      };
      setTaskId(taskId + 1);  
      setTaskList([...taskList, newItem]);
    };
  };

  const onDelete = (id) => {
    setTaskList( taskList.filter(t => t.id !== id))
  };

  // const onToggleImportant = (id) => { 
  //   // скопируем имеющийся массов тасок - в новый
  //   const newTaskList = [...taskList];
    
  //   // найти в имеющемся массиве тасок ту, у которой необходимо сменить состояние на важное
  //   const newItem = taskList.findIndex((t) => t.id === id);
    
  //   // сменим в найденной таске состояние важности
  //   newTaskList[newItem] = {
  //     ...newTaskList[newItem],
  //     important:true
  //   }

  //   setTaskList(newTaskList);
  // };

  const onToggleDone = (id) => { 
    // найти в имеющемся массиве тасок индекс той, у которой необходимо сменить состояние на важное
    const oldItemIdx = taskList.findIndex((t) => t.id === id);
  
    // скопируем имеющийся массов тасок - в новый
    const newTaskList = [...taskList];

    // сменим в найденной таске состояние важности
    newTaskList[oldItemIdx] = {
      ...newTaskList[oldItemIdx],
      done: !newTaskList[oldItemIdx].done
    }

    setTaskList(newTaskList);
  };
   
  const onFilterChange = (filterBtnName) => {
    setFilter(filterBtnName);
  }

  const showFiltered = (todolist, filter) => {
      switch (filter) {
      case 'all':
        return todolist;
      case 'active':
        return todolist.filter((t) => !t.done);
      case 'completed':
        return todolist.filter((t) => t.done);
      default:
        return todolist;
    }
  }

 
  const onDeleteDone = () => {
    const newTaskList = taskList.filter((t) => !t.done);
    setTaskList(newTaskList);
  };  

  // подсчет к-ва оставшихся тасок
  const tasksLeft = taskList.length - taskList.filter((t) => t.done).length;
  
  // изменение содержимого таски после редактирования
  const setUpdatedItem = (text, id) => { 
    const newTaskList = [...taskList].map((t) => {
      if (t.id === id) {
        t.text = text;
      };
      return t;
    });
    setTaskList(newTaskList);
  };
 
  return (
    <div className="todoapp">

      <header className="header">
        <h1>todos</h1>
        <Input
          handleInput={handleInput}
          setNewTask={setNewTask}
          onAdded={onAdded}
          newTask={newTask}
        />
      </header>
      
      <TaskList
        taskList={showFiltered(taskList, filter)}
        onDelete={onDelete}
        // onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
        setUpdatedItem={setUpdatedItem}
      />
      <Footer
        onFilterChange={onFilterChange}
        onDeleteDone={onDeleteDone}
        tasksLeft={tasksLeft}
      />
    </div>
  );
};

export default App;