import { Button } from '@headlessui/react';
import Checkbox from './checkbox';
import TaskEditor from './TaskEditor';
import { useState } from 'react';
import { useAppContext } from './AppContext';

export default function TaskItem({task}) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    return (
        <div className='py-1 w-4/5' 
        onMouseEnter={() => {if (!settingsOpen) setHovered(true)}}
        onMouseLeave={() => {setHovered(false); setConfirmingDeletion(false)}} 
        onClick={() => {if (!confirmingDeletion) {setSettingsOpen(true); setHovered(false)} else setConfirmingDeletion(false)}}>
            <Button className={`flex flex-row items-center justify-center w-full shadow-md rounded rounded-sm bg-white hover:bg-stone-100 px-5 ${task.isCompleted ? 'opacity-50' : 'opacity-90'}`}>
                {(confirmingDeletion && hovered)? 
                    <ConfirmDeleteTaskBody task={task} /> :
                    <StandardTaskBody task={task} hovered={hovered} settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} setConfirmingDeletion={setConfirmingDeletion} />}
            </Button>
        </div>
    )
}

function ConfirmDeleteTaskBody({task}){
    const {deleteTask} = useAppContext();
    return (
        <div className="flex flex-row items-center justify-between w-full ">
            <span className="flex-2 font-sans font-bold text-center ">Confirm Delete:</span>
            <span className="flex-2 text-center py-5 text-ellipsis overflow-hidden ...">{task.label}</span>
            <Button className={`bg-red-700 font-sans font-medium text-center rounded px-6 rounded-md py-2 text-sm text-white`}
                    onClick={() => deleteTask(task)}>
                Delete Task
            </Button>
        </div>
    )
}

function StandardTaskBody({task, hovered, settingsOpen,setSettingsOpen,setConfirmingDeletion}){
    const {toggleTaskCompletion, deleteTask} = useAppContext();
    return(
        <div className="flex flex-row items-center justify-center w-full">
            <div className="px-3"><Checkbox className = "shadow-md" checked={task.isCompleted} onChange={() => toggleTaskCompletion(task)}/> </div>
            <span className="flex-1 px-12 py-5 font-sans text-ellipsis overflow-hidden ...">{task.label}</span>
            <Button className={`bg-transparent rounded rounded-md py-1 px-3 font-large ${hovered? 'opacity-100' : 'opacity-0'}`}
                    onClick={(event) => {setConfirmingDeletion(true); event.stopPropagation();}}>
            <svg className={`stroke-stone-400 opacity-100 size-7 border-0`} viewBox="-2 -4 50 50" fill="#a8a29e"
                onMouseEnter={(e) => e.currentTarget.setAttribute('fill', '#57534e')}
                onMouseLeave={(e) => e.currentTarget.setAttribute('fill', '#a8a29e')}>
                <path d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2
                        s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2
                        S37.438,5.668,36.335,5.668z M14.168,35.67c0,0.828-0.672,1.5-1.5-1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
                        s1.5,0.672,1.5,1.5V35.67z M22.168,35.67c0,0.828-0.672,1.5-1.5-1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
                        s1.5,0.672,1.5,1.5V35.67z M25.168,5.668h-9V3h9V5.668z M30.168,35.67c0,0.828-0.672,1.5-1.5-1.5s-1.5-0.672-1.5-1.5v-21
                        c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z" strokeWidth={1} strokeLinecap="round" strokeLinejoin="square" />
            </svg>
            <TaskEditor task={task} open={settingsOpen} settingsOpen = {settingsOpen} setSettingsOpen={setSettingsOpen}/>
            </Button>
        </div>
    )
}