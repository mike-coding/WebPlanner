// App.js
import mainBG from './assets/BGs/natureBG.jpg';
import './App.css';
import { useState } from 'react';
import Drawer from './components/Drawer'; // Updated import
import TaskList from './components/task/TaskList';
import Calendar from './components/Calendar'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div
      className="relative h-screen bg-cover"
      style={{ backgroundImage: `url(${mainBG})` }}
    >
      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />

      {/* Main Content */}
      <div className="flex items-center justify-center px-10 py-10 h-full">
        <div
          className="w-full h-full flex flex-row backdrop-blur-xl backdrop-brightness-120 backdrop-saturate-60 backdrop-contrast-70 
                        rounded-md border-0 shadow-2xl overflow-hidden"
        >
          {/* TaskList */}
          <div className="w-2/5 h-full overflow-auto">
            <TaskList />
          </div>

          {/* Calendar */}
          <div className="w-3/5 h-full overflow-auto">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
