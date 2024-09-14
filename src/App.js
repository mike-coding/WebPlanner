import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import TodoItem from './components/TodoItem';

function App() {
  return (
    <div className="flex-grow flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <TodoItem />
      </div>
    </div>
  );
}

export default App;
