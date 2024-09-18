import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition, Button } from '@headlessui/react';
import TodoItem from './TodoItem';
import TodoEntry from './TodoEntry';
import {useTasks} from './TaskContext';

export default function Todo() {
    const {tasks, clearTasks, addTask, toggleTaskCompletion, renameTask, deleteTask} = useTasks();
    return (
        <div className="flex flex-col w-full items-center justify-center">
            <p className="font-mono font-bold text-stone-700 text-2xl  py-5"> To-Do Prototype </p>
            <Button className=" w-32 items-center justify-center py-5 shadow-md rounded border rounded-sm border-0 bg-stone-100 font-mono font-bold opacity-60 hover:opacity-70 px-5 " 
            onClick={() => {clearTasks(); }}> Wipe Tasks </Button>
            <dl className="flex flex-col items-center justify-center w-3/5 py-5">
                <TodoEntry/>
                {Object.values(tasks).filter(task => !task.isCompleted).map(task => (
                    <TodoItem key={task.id} task={task}/>
                ))}
            </dl>
            <hr className="w-1/4 border-t-4 border-white my-4 opacity-40 shadow-3xl" />
            <dl className="flex flex-col items-center justify-center py-5 w-3/5">
                {Object.values(tasks).filter(task => task.isCompleted).map(task => (
                    <TodoItem key={task.id} task={task}/>
                ))}
            </dl>
        </div>
    )
}