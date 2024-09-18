import mainBG from './natureBG.jpg'
import './App.css';
import Navbar from './components/Navbar';
import Todo from './components/Todo';
import useTasks from './components/UseTasks';

function App() {
  const { tasks, clearTasks, addTask, toggleTaskCompletion } = useTasks();
  return (
    <div className="relative h-screen bg-cover" style={{ backgroundImage: `url(${mainBG})` }}>
      <Navbar />
      <div className="flex items-center justify-center px-20 py-10">
        <div className="w-full h-[85vh] flex flex-col backdrop-blur-xl backdrop-brightness-95 backdrop-saturate-90 backdrop-contrast-90 
                        rounded-md border-0 py-10 shadow-2xl overflow-auto">
          <Todo storedTasks={tasks} clearTasks={clearTasks} addTask={addTask} toggleTaskCompletion={toggleTaskCompletion}/>
        </div>
      </div>
    </div>
  );
}

export default App;
