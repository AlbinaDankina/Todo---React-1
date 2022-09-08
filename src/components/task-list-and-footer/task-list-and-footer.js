import TaskList from '../task-list/task-list';
import Footer from '../footer';

function TaskListAndFooter(data) {
  const {
    onDeleted,
    onToggleDone,
    onToggleImportant,
    todoCount,
    todoLeft,
    filter,
    onFilterChange,
    onDeleteDone,
    checkedId,
  } = data;
  return (
    <section className="main">
      <TaskList
        items={data}
        onDeleted={(id) => onDeleted(id)}
        onToggleDone={onToggleDone}
        onToggleImportant={onToggleImportant}
        checkedId={checkedId}
      />
      <Footer
        todoCount={todoCount}
        todoLeft={todoLeft}
        filter={filter}
        onFilterChange={onFilterChange}
        onDeleteDone={onDeleteDone}
      />
    </section>
  );
}

export default TaskListAndFooter;
