import AppHeaderName from '../app-header-name';
import NewTaskForm from '../new-task-form';

function AppHeader(info) {
  const { onAdded, onSearchChange } = info;

  return (
    <header className="header">
      <AppHeaderName />
      <NewTaskForm onAdded={onAdded} onSearchChange={onSearchChange} />
    </header>
  );
}

export default AppHeader;
