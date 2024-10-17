import { Button } from '@headlessui/react';
import { useState } from 'react';
import { Input } from '@headlessui/react';
import { useAppContext } from './AppContext';

export default function TaskEntry() {
    const [thisTask, setThisTask] = useState({ label: "", isCompleted: false});
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addTask(thisTask.label);
            setThisTask({ ...thisTask, label: "" }); // Reset input after adding
        }};
    const {addTask} = useAppContext();
    return(
        <div className='py-1 w-4/5'>
            <Button className="flex flex-row items-center justify-center w-full shadow-md rounded border rounded-sm border-0 bg-white hover:bg-stone-100 px-8 opacity-90">
                <Button className="bg-transparent rounded border rounded-md border-0 py-1 font-large"
                onClick={() => {addTask(thisTask.label); setThisTask({...thisTask, label:""})}}>
                    <svg className={`stroke-stone-400 opacity-100 size-7 hover:stroke-stone-900`} viewBox="0 0 14 14" fill="none">
                        <path d="m 3 7 L 11 7 M 7 3 L 7 11" strokeWidth={3} strokeLinecap="square" strokeLinejoin="square" />
                    </svg>
                </Button>
                <Input className="flex-1 px-12 py-5 bg-transparent font-sans text-center ui-selected: basis-1/3 outline-none"
                value={thisTask.label}
                onChange={e => setThisTask({ ...thisTask, label: e.target.value })}
                onKeyDown={handleKeyDown}
                autoComplete="off"/>
            </Button>
        </div>
    )
}