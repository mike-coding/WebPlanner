import mainBG from './natureBG.jpg'
import './App.css';
import Navbar from './components/Navbar';
import Todo from './components/Todo';
import useTasks from './components/UseTasks';

function App() {
  const { tasks, addTask, toggleTaskCompletion } = useTasks();
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${mainBG})` }}/>
      <div className="relative flex-grow flex flex-col h-screen ">
        <Navbar/>
        <div className="flex-grow flex items-center justify-center px-20">
          <Todo storedTasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
