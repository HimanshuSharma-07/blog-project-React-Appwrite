import React from 'react'

function Loader({ className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-8 h-8 border-4 border-background-color/20 border-t-background-color rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader
