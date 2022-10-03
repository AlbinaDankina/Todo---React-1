const Input = ({setNewTask, handleInput, newTask, onAdded}) => (
    <>
        <form className="new-todo-form" onSubmit={(e) => {
            e.preventDefault();
            onAdded(newTask);
            setNewTask('');
        }}>
            <input
                value={newTask}
                id="input"
                type="text"
                className="new-todo"
                placeholder=" Enter your task here"
                autoFocus
                onChange={(e) => handleInput(e)}
            />
            <label htmlFor="input"></label>      
            {/* <>
                 <input type="number" className="new-todo-form__timer" placeholder="Min" autoFocus />
            <input type="number" className="new-todo-form__timer" placeholder="Sec" autoFocus />
            </> */}
        </form>
        {/* <form className="new-todo-form">
            <input type="number" className="new-todo-form__timer" placeholder="Min" autoFocus />
            <input type="number" className="new-todo-form__timer" placeholder="Sec" autoFocus />
        </form> */}
    </>
)
export default Input;
