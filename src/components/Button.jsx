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
      className={`px-5 py-2 text-sm font-medium border border-transparent cursor-pointer
                  ${bgColor} ${textColor} ${className}
                  hover:opacity-90 active:opacity-100 transition-opacity duration-200 rounded-lg`}
      {...props}
    >
        {children}
    </button>
  )
}

export default Button 