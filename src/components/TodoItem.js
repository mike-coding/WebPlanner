import { Button } from '@headlessui/react';
import Checkbox from './checkbox';
import TaskEditor from './TaskEditor';
import { useState } from 'react';
import { useTasks } from './TaskContext';

export default function TodoItem({task}) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const {addTask, toggleTaskCompletion} = useTasks();
    return (
        <div className='py-1 w-3/5'>
            <Button className={`flex flex-row items-center justify-center w-full shadow-md rounded rounded-sm bg-stone-100 hover:bg-stone-200 px-5 ${task.isCompleted ? 'opacity-50' : 'opacity-90'}`}>
                <Checkbox className = "shadow-md" checked={task.isCompleted} onChange={() => toggleTaskCompletion(task)}/> 
                <span className="flex-1 px-12 py-5 font-mono text-ellipsis overflow-hidden ...">{task.label}</span>
                <Button className="bg-transparent rounded border-0 rounded-md py-1 font-large "
                        onClick={() => setSettingsOpen(true)}>
                <svg className={`stroke-stone-400 opacity-100 size-9 hover:stroke-stone-900 border-0`} viewBox="0 0 14 14" fill="none">
                    <path d="m 5.934,6.0405855 c 0.75,0 0.75,1.1358546 0,1.1358546 -0.75,0 -0.75,-1.1358546 0,-1.1358546 m 3.1208007,1.1222691 c -0.75,0 -0.75,-1.1358546 0,-1.1358546 0.7500003,0 0.7500003,1.1358546 0,1.1358546 m 3.1411783,0 c -0.749999,0 -0.749999,-1.1358546 0,-1.1358546 0.75,0 0.75,1.1358546 0,1.1358546" strokeWidth={1} strokeLinecap="round" strokeLinejoin="square" />
                </svg>
                <TaskEditor task={task} open={settingsOpen} settingsOpen = {settingsOpen} setSettingsOpen={setSettingsOpen}/>
                </Button>
            </Button>
        </div>
    )
}