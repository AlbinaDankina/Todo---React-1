
const Footer = ({onFilterChange, onDeleteDone, tasksLeft}) => { 
   
    const btnNames = ['all', 'active', 'completed'];
  
    return (
        <footer className="footer">
            <span className="todo-count">{tasksLeft} items left</span>
            <ul className="filters">
                <li>
                    <button key={btnNames[0]} onClick={() => onFilterChange(btnNames[0])} type="button">All</button>
                </li> 
                <li>
                    <button key={btnNames[1]} onClick={() => onFilterChange(btnNames[1])} type="button">Active</button>
                </li>
                <li>
                    <button key={btnNames[2]} onClick={() => onFilterChange(btnNames[2])} type="button">Completed</button>
                </li>
            </ul>
            <button className="clear-completed" onClick={onDeleteDone}>Clear completed</button>
        </footer>
    );
};

export default Footer;

 