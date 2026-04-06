import React, { useEffect, useCallback } from "react";
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

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
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
            userName: userData.name || "Anonymous",
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } finally {
      setLoading(false);
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
    <form
      onSubmit={handleSubmit(submit)}
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
  );
}
