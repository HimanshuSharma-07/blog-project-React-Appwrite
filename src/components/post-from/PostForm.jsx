import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { set, useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Confirmation Modal State
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [pendingData, setPendingData] = React.useState(null);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Intercept the react-hook-form submission to show popup
  const handleInterceptSubmit = (data) => {
    setPendingData(data);
    setShowConfirm(true);
  };

  const executeSubmit = async () => {
    if (!pendingData) return;
    const data = pendingData;
    
    setLoading(true);
    setError("");
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image?.[0])
          : null;

        if (file) {
          appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
            // Removed userName here to fix Appwrite schema validation crash
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          } else {
            setError("Failed to create post. Please check your network or database schema.");
          }
        } else {
          setError("Failed to upload image.");
        }
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue, post]);

  return (
    <>
    <form
      onSubmit={handleSubmit(handleInterceptSubmit)}
      className="flex flex-wrap bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8"
    >
      {/* Left: Main Content */}
      <div className="w-full md:w-2/3 md:pr-8">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 ml-2 rounded px-2 py-1 cursor-pointer border hover:border-background-color"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 ml-2 rounded px-2 py-1 cursor-pointer border hover:border-background-color"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <div className="border border-gray-100 p-2 sm:p-4 rounded-xl shadow-sm">
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="w-full md:w-1/3 mt-8 md:mt-0 md:pl-8 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0">
        <div className="pt-6 md:pt-0 space-y-4">
          <Input
            className="
          flex bg-gray-100/10 cursor-pointer px-4 py-2 rounded-3xl border
          cursor
          border-gray-color/10 hover:border-background-color"
            label="Featured Image :"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full border  border-gray-300 p-2">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <Select
            className="
          bg-white
            border border-gray-300
          focus:bg-background-color/10
          focus:border-background-color
            cursor-pointer
  "
            options={["active", "inactive"]}
            label="Status"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
            disabled={loading}
          >
            {loading ? (post ? "Updating..." : "Submitting...") : (post ? "Update" : "Submit")}
          </Button>
        </div>
      </div>
    </form>

      {/* Confirmation Modal via Portal */}
      {showConfirm && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {post ? "Update Post" : "Publish Post"}
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              {post 
                ? "Are you sure you want to update this post with the new details?"
                : "Are you sure you want to publish this new post to the blog?"}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  setError("");
                }}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeSubmit}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-sm shadow-green-600/20 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Yes, proceed"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
