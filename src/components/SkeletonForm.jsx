import React from "react";

export default function SkeletonForm() {
  return (
    <div className="w-full flex flex-wrap bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 animate-pulse">
      {/* Left Content */}
      <div className="w-full md:w-2/3 md:pr-8">
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="border border-gray-100 p-2 sm:p-4 rounded-xl shadow-sm">
          <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded w-full"></div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/3 mt-8 md:mt-0 md:pl-8 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 space-y-4">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full rounded-3xl"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-full rounded-full mt-4"></div>
      </div>
    </div>
  );
}
