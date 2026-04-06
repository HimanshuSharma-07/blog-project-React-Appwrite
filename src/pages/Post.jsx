import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { CircleArrowLeft, Pencil, Trash2 } from "lucide-react";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();


  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);

  // Redirect if not logged in
  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [authStatus, navigate]);

  // Fetch post
  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService.getPost(slug).then((post) => {
      if (post) setPost(post);
      else navigate("/");
    }).finally(() => setLoading(false));
  }, [slug, navigate]);

  // ✅ DERIVED VALUE (no state)
  const isAuthor =
    post &&
    userData &&
    userData.$id &&
    post.userId === userData.$id;

  // Delete post
  const executeDelete = async () => {
    setDeleteLoading(true);
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) return (
    <div className="py-20">
      <Loader />
    </div>
  );

  if (!post) return null;

  return (
    <div className="w-full py-6 bg-gray-50">
      <Container>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-background-color"
        >
          <CircleArrowLeft />
          Back
        </button>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          {/* Title */}
          <div className="mb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 gap-2 shrink-0">
              <span>{post.userName || "Anonymous"}</span>
              <span>•</span>
              <span>
                {new Date(post.$createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="w-full mb-8 relative">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full max-h-120 object-contain bg-gray-100 rounded-xl"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-background-color text-white border-none shadow-sm shadow-black/10">
                    <Pencil size={14} />
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm bg-red-500 text-white border-none shadow-sm shadow-black/10"
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="bg-white px-6 md:px-10 py-8 rounded-xl border border-gray-200 text-gray-800">
            {parse(post.content)}
          </div>
        </div>
      </Container>


      {/* Delete Confirmation Modal via Portal */}
      {showDeleteConfirm && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Post</h3>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to permanently delete this post? This action cannot be undone and will remove the post and its image from the blog.
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleteLoading}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={deleteLoading}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm shadow-red-600/20 disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}