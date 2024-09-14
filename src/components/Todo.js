import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import TodoItem from './TodoItem';

export default function Todo() {
    return (
        <dl className="flex flex-col items-center justify-center w-full">
            <TodoItem/>
            <TodoItem/>
            <TodoItem/>
            <TodoItem/>
        </dl>
    )
}