import { useEffect, useState } from "react";

const Task = ({ t, onDelete, onToggleDone, setUpdatedItem }) => { 
    
    // id той таски, которую редактируем
    const [editedTaskId, setEditedTaskId] = useState(null); 

    // данные по таймеру для дальнейшего использования в useEffect
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {

                setTime(prevTime => prevTime + 10)
            }, 10);
        } else {
            clearInterval(interval);
        }
        return (() =>  clearInterval(interval));
    }, [timerOn, t.id]);
    
    return (
        <li key={t.id} className={t.done && editedTaskId === null ? 'completed' : ''}>
            <div className="view">
                <input id={t.id} type="checkbox" className="toggle"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (editedTaskId === null) {
                            onToggleDone(t.id)
                        }
                    }}
                />   
                <label
                    className="title"
                    htmlFor={t.id}
                    style={{ textDecoration: t.done && editedTaskId === null ? 'line-through' : 'none' }}
                >
                 
                    <form className="title" onSubmit={(e) => { e.preventDefault(); setEditedTaskId(null) }} >
                        
                        {editedTaskId !== null ?
                            <input
                                id={t.id}
                                type="text"
                                className="title edited-input"
                                value={t.text}
                                onChange={(e) => setUpdatedItem(e.target.value, t.id)}
                            /> :
                            <span>{t.text}</span>}                
                    </form>
                </label>
                
                    <span className="description" style={editedTaskId !== null ? {opacity: '0' } : {opacity : '1'}}>
                    <button className="icon icon-play" onClick={() => setTimerOn(true)} />
                        <button className="icon icon-pause" onClick={() => setTimerOn(false)} />
                    
                        <span className="timer timer-min">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
                        <span className="timer timer-sec">{("0" + Math.floor((time/1000)%60)).slice(-2)} </span>
                        <span className="timer">{("0" + ((time/10)%100)).slice(-2)}</span>
                    </span>                     
                    <button className="icon icon-edit" onClick={() => setEditedTaskId(t.id)} />
                    <button className="icon icon-destroy" onClick={() => onDelete(t.id)} />
                    {/* <span className="description">created X seconds ago</span> */}
                    {/* <button className="icon icon-important" onClick={() => onToggleImportant(t.id)} />*/}
            </div>
        </li>
    )
};

export default Task;
