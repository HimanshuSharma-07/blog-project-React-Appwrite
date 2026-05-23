import React from "react";

export default function SkeletonPost() {
  return (
    <div className="w-full py-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2">
          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          {/* Title Area Skeleton */}
          <div className="mb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
            <div className="w-3/4 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Image Skeleton */}
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl mb-8 animate-pulse"></div>

          {/* Content Skeleton */}
          <div className="bg-white px-6 md:px-10 py-8 rounded-xl border border-gray-100">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse mt-8"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
