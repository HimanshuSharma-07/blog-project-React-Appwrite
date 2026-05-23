import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.$id}`} className="group block">
        <div
        className="
          w-full bg-white
          rounded-2xl
          overflow-hidden
          border border-gray-100
          transition-colors duration-300
          hover:border-gray-300
        "
      >
        {/* Image */}
        <div className="w-full aspect-16/10 overflow-hidden bg-gray-50">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col h-45">
          {/* Meta: Author & Date */}
          <div className="flex items-center text-[10px] font-bold uppercase tracking-wider text-gray-500 gap-2 mb-2">
            <span>{post.userName || "Anonymous"}</span>
            <span>•</span>
            <span>
              {new Date(post.$createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h2
            className="
              text-xl font-bold text-gray-900
              leading-snug
              line-clamp-2
              mb-2
              group-hover:text-gray-600
              transition-colors duration-200
            "
          >
            {post.title.replace(/&nbsp;/g, ' ')}
          </h2>

          {/* Description Preview */}
          <p className="text-gray-500 text-sm line-clamp-2 mb-auto leading-relaxed">
            {post.content ? post.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ') : "Read the full story..."}
          </p>
          
          <div className="flex items-center text-sm font-semibold text-gray-900 mt-4 group-hover:text-gray-500 transition-colors duration-200">
            Read Story →
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;