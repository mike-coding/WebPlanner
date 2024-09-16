import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import TodoItem from './TodoItem';

export default function Todo({storedTasks}) {
    return (
        <div className="flex flex-col w-full backdrop-blur-md rounded-3xl border-0 py-20">
            <p className="font-mono font-bold text-stone-700 text-2xl px-80 py-5"> To-Do Prototype </p>
            <dl className="items-center justify-center px-80 py-5">
                <TodoItem isEntry={true}/>
                {storedTasks.map(task => ( <TodoItem task = {task} /> ))}
            </dl>
        </div>
    )
}