import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useTasks } from './TaskContext';
import { Input } from '@headlessui/react';

export default function TaskEditor({ task, settingsOpen, setSettingsOpen }) {
    const { deleteTask, renameTask } = useTasks();
    return (
        <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm" />
            <DialogPanel className="fixed inset-0 z-10 overflow-y-auto flex min-h-full items-center justify-center p-4 sm:p-0">
                <div className="transform overflow-hidden rounded-sm bg-white text-left shadow-xl w-2/5 h-[50vh] opacity-80 transition-all flex flex-col">
                    <Input className="font-mono font-bold text-stone-700 text-2xl py-5 px-6 flex-shrink-0 ui-selected: outline-none"
                            value={task.label}
                            onChange={e => renameTask(task,e.target.value)}/>
                    <hr className=" flex w-full border-t-4 border-stone-300 my-2 opacity-70 shadow-3xl" />
                    <p className="mt-2 text-sm text-gray-500 px-6 flex-grow">
                        Eventually there will be task settings here.
                    </p>
                    <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-5">
                        <button
                            type="button"
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                            onClick={() => { deleteTask(task); setSettingsOpen(false); }}>
                            Delete Task
                        </button>
                        <button
                            type="button"
                            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => setSettingsOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    );
}
