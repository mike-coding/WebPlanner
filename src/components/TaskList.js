import { Button } from '@headlessui/react';
import TaskItem from './TaskItem';
import TodoEntry from './TaskEntry';
import { useAppContext } from './AppContext';

export default function TaskList() {
    const {tasks, clearTasks, addTask, toggleTaskCompletion, renameTask, deleteTask} = useAppContext();
    return (
        <div className="flex flex-col w-full items-center justify-center">
            <p className="font-sans font-bold text-stone-700 text-2xl py-5"> To-Do Prototype </p>
            <dl className="flex flex-col items-center justify-center w-full py-5">
                <TodoEntry/>
                {Object.values(tasks).filter(task => !task.isCompleted).map(task => (
                    <TaskItem key={task.id} task={task}/>
                ))}
            </dl>
            <hr className="w-1/4 border-t-4 border-white my-4 opacity-60 shadow-3xl" />
            <dl className="flex flex-col items-center justify-center w-full py-5">
                {Object.values(tasks).filter(task => task.isCompleted).map(task => (
                    <TaskItem key={task.id} task={task}/>
                ))}
            </dl>
        </div>
    )
}