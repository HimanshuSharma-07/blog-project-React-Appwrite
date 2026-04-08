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
          transition-all duration-300
          group-hover:border-background-color/20
          group-hover:shadow-xl group-hover:shadow-gray-200/50
          group-hover:-translate-y-1
        "
      >
        {/* Image */}
        <div className="w-full aspect-16/10 overflow-hidden">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col h-45">
          {/* Meta: Author & Date */}
          <div className="flex items-center text-[10px] font-bold uppercase tracking-wider text-gray-400 gap-2 mb-2">
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
              group-hover:text-background-color
              transition-colors duration-200
            "
          >
            {post.title.replace(/&nbsp;/g, ' ')}
          </h2>

          {/* Description Preview */}
          <p className="text-gray-500 text-sm line-clamp-2 mb-auto leading-relaxed">
            {post.content ? post.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ') : "Read the full story..."}
          </p>
          
          <div className="flex items-center text-sm font-semibold text-background-color opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
            Read Story →
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;