import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-background-color',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 text-sm font-medium border cursor-pointer border-gray-300 
                  ${bgColor} ${textColor} ${className}
                  hover:opacity-90 active:scale-95 transition-all duration-200 rounded-full`}
      {...props}
    >
        {children}
    </button>
  )
}

export default Button 