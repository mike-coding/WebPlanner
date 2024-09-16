import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition, Button } from '@headlessui/react';
import TodoItem from './TodoItem';
import useTasks from './UseTasks';

export default function Todo({storedTasks, clearTasks, addTask, toggleTaskCompletion}) {
    return (
        <div className="flex flex-col w-full items-center justify-center backdrop-blur-md rounded-3xl border-0 py-20">
            <p className="font-mono font-bold text-stone-700 text-2xl px-80 py-5"> To-Do Prototype </p>
            <Button className=" w-32 items-center justify-center py-5 shadow-md rounded border rounded-md border-0 bg-stone-100 font-mono font-bold hover:bg-stone-200 px-5 opacity-60" 
            onClick={() => {clearTasks(); }}> Wipe Tasks </Button>
            <dl className="items-center justify-center px-80 py-5">
                <TodoItem addTask={addTask}/>
                {storedTasks.map(task => ( <TodoItem task = {task} /> ))}
            </dl>
        </div>
    )
}