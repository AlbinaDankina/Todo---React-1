import { useEffect, useState, useContext } from "react";
import { Context } from "../context/context";


const Task = ({ task }) => { 
    
    const { onDelete, onToggleDone, setUpdatedItem } = useContext(Context);

    const [editedTaskId, setEditedTaskId] = useState(null); // id той таски, которую редактируем
    const [seconds, setSeconds] = useState(0); // высчитываемое время
    const [timerOn, setTimerOn] = useState(false);
    

     useEffect(() => {
        let interval = null; 
          
        if (timerOn && localStorage.getItem('start')) {           
            const start = JSON.parse(localStorage.getItem('start'));
            const timerStart = start[task.id];

            interval = setTimeout(function tick() {
                if (timerStart) setSeconds(seconds + (Math.floor(Date.now() / 1000) - timerStart));
                interval = setTimeout(tick, 10);
            }, 10);
        } else {
            clearTimeout(interval);
         };

         return (() => clearTimeout(interval));     
     }, [timerOn, task.id]);

    return (
        <li key={task.id} className={task.done && editedTaskId === null ? 'completed' : ''}>
            <div className="view">

                <input
                    id={task.id}
                    type="checkbox"
                    className="toggle"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (editedTaskId === null) onToggleDone(task.id)
                    }}
                />   
                <label  className="title" htmlFor={task.id}
                        style={{ textDecoration: task.done && editedTaskId === null ? 'line-through' : 'none' }} >
                            
                    <form className="title" onSubmit={(e) => { e.preventDefault(); setEditedTaskId(null) }} >
                        {editedTaskId !== null ?
                            <input
                                id={task.id}
                                type="text"
                                className="title edited-input"
                                value={task.text}
                                onChange={(e) => setUpdatedItem(e.target.value, task.id)}
                            /> :
                            <span>{task.text}</span>}                
                    </form>
                </label>

                <span className="description" style={editedTaskId !== null ? {opacity: '0' } : {opacity : '1'}}>
                      <button className="icon icon-play" onClick={() => {
                            let start = localStorage.getItem('start');
                            if (!start) localStorage.setItem('start', '{}');
                            let newTimerStart = JSON.parse(localStorage.getItem('start'));
                            newTimerStart[task.id] = Math.floor(Date.now()/1000);
                            localStorage.setItem('start', JSON.stringify(newTimerStart));
                            setTimerOn(true)
                        }} />
                    
                    <button className="icon icon-pause" onClick={() => setTimerOn(false)} />
                    
                    <span className="timer timer-sec">{("0" + Math.floor((seconds/60)%60)).slice(-2)}</span>
                    <span className="timer">{("0" + seconds%60).slice(-2)}</span>
                        
                </span>                     
                
                <button className="icon icon-edit" onClick={() => setEditedTaskId(task.id)} />
                <button className="icon icon-destroy" onClick={() => onDelete(task.id)} />
                
            </div>
        </li>
    )
};

export default Task;
