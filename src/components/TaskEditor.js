import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function TaskEditor({ task, settingsOpen, setSettingsOpen }) {
  return (
    <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm"/>
        <DialogPanel className="fixed inset-0 z-10 overflow-y-auto flex min-h-full items-center justify-center p-4 sm:p-0">
            <div className="transform overflow-hidden rounded-sm bg-white text-left shadow-xl w-2/5 h-[50vh] opacity-90 transition-all">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    {task.label}
                </DialogTitle>
                <p className="mt-2 text-sm text-gray-500">
                    Eventually there will be task settings here.
                </p>
                </div>
                <div className="bg-white px-4 py-3 flex flex-row-reverse px-6">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setSettingsOpen(false)}>
                    OK but in red
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setSettingsOpen(false)}>
                    OK
                </button>
                </div>
            </div>
        </DialogPanel>
    </Dialog>
  );
}
