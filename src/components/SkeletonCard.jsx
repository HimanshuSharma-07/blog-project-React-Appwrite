import React from 'react'

function SkeletonCard() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/6"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
