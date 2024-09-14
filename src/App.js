import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import TodoItem from './components/TodoItem';
import Todo from './components/Todo';

function App() {
  return (
    <div className="flex-grow flex flex-col min-h-screen bg-stone-50"
         style={{
          backgroundImage: `url(./natureBG.png)`, // using the imported logo
          backgroundSize: 'cover',         // Cover the entire screen
          backgroundPosition: 'center',    // Center the background image
         }}>
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-20">
        <Todo>
          <TodoItem/> 
        </Todo>
      </div>
    </div>
  );
}

export default App;
