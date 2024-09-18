import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition, Button } from '@headlessui/react';
import Checkbox from './checkbox';
import { useState } from 'react';
import { Input } from '@headlessui/react';

export default function TodoItem({task, addTask, toggleTaskCompletion}) {
    const [thisTask, setThisTask] = useState({ label: "", isCompleted: false });
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addTask(thisTask.label);
            setThisTask({ ...thisTask, label: "" }); // Reset input after adding
        }};
    if (task)
    {
        return (
            <div className='py-1'>
                <Disclosure>
                    <Button className={`flex flex-row items-center justify-center w-full shadow-md rounded border rounded-sm border-0 bg-stone-100 hover:bg-stone-200 px-5 ${task.isCompleted ? 'opacity-50' : 'opacity-90'}`}>
                        <Checkbox className = "shadow-md" checked={task.isCompleted} onChange={() => toggleTaskCompletion(task)}/> 
                        <span className="flex-1 px-12 py-5 font-mono">{task.label}</span>
                        <DisclosureButton className="bg-transparent rounded border  rounded-md border-0 py-1 font-large ">
                        <svg className={`stroke-stone-400 opacity-100 size-7 hover:stroke-stone-900`} viewBox="0 0 14 14" fill="none">
                            <path d="m 3,4.0135855 c 0.75,0 0.75,1.1358546 0,1.1358546 -0.75,0 -0.75,-1.1358546 0,-1.1358546 m 3.1208007,1.1222691 c -0.75,0 -0.75,-1.1358546 0,-1.1358546 0.75,0 0.75,1.1358546 0,1.1358546 m 3.1411789,0 c -0.75,0 -0.75,-1.1358546 0,-1.1358546 0.7500004,0 0.7500004,1.1358546 0,1.1358546" strokeWidth={1} strokeLinecap="round" strokeLinejoin="square" />
                        </svg>
                        </DisclosureButton>
                    </Button>
                </Disclosure>
            </div>
        )
    }
    else
    {
        return(
            <div className='py-1'>
                <Disclosure>
                    <Button className="flex flex-row items-center justify-center w-full shadow-md rounded border rounded-sm border-0 bg-stone-100 hover:bg-stone-200 px-5 opacity-90">
                        <Button className="bg-transparent rounded border rounded-md border-0 py-1 font-large"
                        onClick={() => {addTask(thisTask.label); setThisTask({...thisTask, label:""})}}>
                            <svg className={`stroke-stone-400 opacity-100 size-7 hover:stroke-stone-900`} viewBox="0 0 14 14" fill="none">
                                <path d="m 3 7 L 11 7 M 7 3 L 7 11" strokeWidth={3} strokeLinecap="square" strokeLinejoin="square" />
                            </svg>
                        </Button>
                        <Input className="flex-1 px-12 py-5 bg-transparent font-mono text-center ui-selected: basis-1/3 outline-none"
                        value={thisTask.label}
                        onChange={e => setThisTask({ ...thisTask, label: e.target.value })}
                        onKeyDown={handleKeyDown}/>
                    </Button>
                </Disclosure>
            </div>
        )
    }
}