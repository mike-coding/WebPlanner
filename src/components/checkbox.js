import { Checkbox } from '@headlessui/react'
import { useState } from 'react'

export default function CheckBox() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Checkbox
      checked={enabled}
      onChange={setEnabled}
      className="group block size-7 rounded border bg-stone-50 shadow-sm shadow-inner">
      {/* Checkmark icon */}
      <svg className={`stroke-gray-500 ${enabled ? 'opacity-100' : 'opacity-0 group-hover:opacity-25'}`} viewBox="0 0 14 14" fill="none">
        <path d="M 4 4 L 10 10 M 10 4 L 4 10" strokeWidth={3} strokeLinecap="round" strokeLinejoin="square" />
      </svg>
    </Checkbox>
  )
}