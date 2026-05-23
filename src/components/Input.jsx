import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    clasName = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className="w-full">
            {label && <label
            className='inline-block mb-1 pl-1 text-sm font-medium text-gray-700' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input 
            type={type} 
            className={`px-3 py-2.5 rounded-lg bg-white text-gray-900 outline-none border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 duration-200 w-full ${clasName}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input