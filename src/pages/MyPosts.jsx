import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container, PostCard, SkeletonCard } from "../components";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);

      if (!user) return;

      const result = await appwriteService.getPosts([]);
      if (result) {
        const myPosts = result.documents.filter(
          (post) => post.userId === user.$id
        );
        setPosts(myPosts);
      }
    };

    fetchData().finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full py-6 bg-gray-50">
      <Container>
        <div className="flex flex-wrap -mx-3">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="px-3 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <SkeletonCard />
              </div>
            ))
          ) : posts.length === 0 ? (
            <div className="w-full text-center py-10">
              <p className="text-gray-500">You haven’t created any posts yet.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.$id}
                className="px-3 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <PostCard post={post} />
              </div>
            ))
          )}

          {currentUser && posts.length === 0 && (
            <p className="text-gray-500 text-center w-full">
              You haven’t created any posts yet.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;