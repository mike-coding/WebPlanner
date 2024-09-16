import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import Checkbox from './checkbox';
import { useState } from 'react';

export default function TodoItem({isEntry=false, task}) {
    if (!isEntry)
    {
        return (
            <div className='py-2'>
                <Disclosure>
                    <DisclosureButton className="flex flex-row items-center justify-center w-full shadow-md rounded border rounded-md border-0 bg-stone-100 hover:bg-stone-200 px-5 opacity-90">
                        <Checkbox className = "shadow-md" checked={task.isCompleted} onChange={() => {}}/> 
                        <span className="flex-1 px-12 py-5">{task.label}</span>
                        <DisclosureButton className="bg-transparent rounded border  rounded-md border-0 py-1 font-large ">
                        <svg className={`stroke-stone-400 opacity-100 size-7 hover:stroke-stone-900`} viewBox="0 0 14 14" fill="none">
                            <path d="m 3,4.0135855 c 0.75,0 0.75,1.1358546 0,1.1358546 -0.75,0 -0.75,-1.1358546 0,-1.1358546 m 3.1208007,1.1222691 c -0.75,0 -0.75,-1.1358546 0,-1.1358546 0.75,0 0.75,1.1358546 0,1.1358546 m 3.1411789,0 c -0.75,0 -0.75,-1.1358546 0,-1.1358546 0.7500004,0 0.7500004,1.1358546 0,1.1358546" strokeWidth={1} strokeLinecap="round" strokeLinejoin="square" />
                        </svg>
                        </DisclosureButton>
                    </DisclosureButton>
                </Disclosure>
            </div>
        )
    }
    else
    {
        return(
            <div className='py-2'>
                <Disclosure>
                    <DisclosureButton className="flex flex-row items-center justify-center w-full shadow-md rounded border rounded-md border-0 bg-stone-100 hover:bg-stone-200 px-5 opacity-90">
                        <DisclosureButton className="bg-transparent rounded border  rounded-md border-0 py-1 font-large ">
                            <svg className={`stroke-stone-400 opacity-100 size-7 hover:stroke-stone-900`} viewBox="0 0 14 14" fill="none">
                                <path d="m 3,4.0135855 c 0.75,0 0.75,1.1358546 0,1.1358546 -0.75,0 -0.75,-1.1358546 0,-1.1358546 m 3.1208007,1.1222691 c -0.75,0 -0.75,-1.1358546 0,-1.1358546 0.75,0 0.75,1.1358546 0,1.1358546 m 3.1411789,0 c -0.75,0 -0.75,-1.1358546 0,-1.1358546 0.7500004,0 0.7500004,1.1358546 0,1.1358546" strokeWidth={1} strokeLinecap="round" strokeLinejoin="square" />
                            </svg>
                        </DisclosureButton>
                        <span className="flex-1 px-12 py-5">"Empty Task!"</span>
                        <DisclosureButton className="bg-transparent rounded border  rounded-md border-0 py-1 font-large ">
                        <svg className={`stroke-stone-400 opacity-100 size-7 hover:stroke-stone-900`} viewBox="0 0 14 14" fill="none">
                            <path d="m 3,4.0135855 c 0.75,0 0.75,1.1358546 0,1.1358546 -0.75,0 -0.75,-1.1358546 0,-1.1358546 m 3.1208007,1.1222691 c -0.75,0 -0.75,-1.1358546 0,-1.1358546 0.75,0 0.75,1.1358546 0,1.1358546 m 3.1411789,0 c -0.75,0 -0.75,-1.1358546 0,-1.1358546 0.7500004,0 0.7500004,1.1358546 0,1.1358546" strokeWidth={1} strokeLinecap="round" strokeLinejoin="square" />
                        </svg>
                        </DisclosureButton>
                    </DisclosureButton>
                </Disclosure>
            </div>
        )
    }

}