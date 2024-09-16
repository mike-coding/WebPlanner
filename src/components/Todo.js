import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition, Button } from '@headlessui/react';
import TodoItem from './TodoItem';
import useTasks from './UseTasks';

export default function Todo({storedTasks, clearTasks, addTask, toggleTaskCompletion}) {
    return (
        <div className="flex flex-col w-full items-center justify-center backdrop-blur-xl backdrop-brightness-95 backdrop-saturate-90 backdrop-contrast-90 rounded-md border-0 py-20 shadow-2xl">
            <p className="font-mono font-bold text-stone-700 text-2xl px-80 py-5"> To-Do Prototype </p>
            <Button className=" w-32 items-center justify-center py-5 shadow-md rounded border rounded-sm border-0 bg-stone-100 font-mono font-bold opacity-60 hover:opacity-70 px-5 " 
            onClick={() => {clearTasks(); }}> Wipe Tasks </Button>
            <dl className="items-center justify-center px-80 py-5">
                <TodoItem isEntry={true} addTask={addTask}/>
                {storedTasks.filter(task => !task.isCompleted).map(task => (
                    <TodoItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} />
                ))}
            </dl>

            {/* Horizontal bar for visual separation */}
            <hr className="w-1/3 border-t-4 border-gray-300 my-4 opacity-70 drop-shadow-3xl" />

            {/* List for completed tasks */}
            <dl className="items-center justify-center px-80 py-5">
                {storedTasks.filter(task => task.isCompleted).map(task => (
                    <TodoItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} />
                ))}
            </dl>
        </div>
    )
}