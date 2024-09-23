// App.js
import mainBG from './natureBG.jpg';
import './App.css';
import { useState } from 'react';
import Drawer from './components/Drawer'; // Updated import
import TaskList from './components/TaskList';

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
      <div className="flex items-center justify-center px-20 py-10">
        <div
          className="w-full h-[90vh] flex flex-col backdrop-blur-xl backdrop-brightness-120 backdrop-saturate-60 backdrop-contrast-70 
                        rounded-md border-0 py-10 shadow-2xl overflow-auto"
        >
          <TaskList />
          {/* <Calendar /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
