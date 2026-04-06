import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container, PostCard, SkeletonCard } from "../components";
import { Search, PenLine } from "lucide-react";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = post.title?.toLowerCase().includes(query);
    const matchesContent = post.content?.toLowerCase().includes(query);
    return matchesTitle || matchesContent;
  });

  return (
    <div className="w-full py-8 md:py-12 bg-gray-50 min-h-screen">
      <Container>
        {/* Header & Search */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all the stories you've written.</p>
          </div>
          
          <div className="relative w-full md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-background-color/50 focus:border-background-color transition-colors sm:text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          {loading ? (
            // Loading Skeletons
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="px-3 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <SkeletonCard />
              </div>
            ))
          ) : posts.length === 0 ? (
            // Absolute Empty State (No posts exist)
            <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
               <div className="bg-gray-100 p-4 rounded-full mb-4">
                 <PenLine className="w-8 h-8 text-gray-400" />
               </div>
               <h3 className="text-lg font-semibold text-gray-900 mb-1">You haven’t written any posts yet</h3>
               <p className="text-gray-500 max-w-sm mb-6">Head over to the editor and start crafting your first story.</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            // Search Empty State
            <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No matches found</h3>
              <p className="text-gray-500">None of your posts match "{searchQuery}".</p>
            </div>
          ) : (
            // Results Map
            filteredPosts.map((post) => (
              <div
                key={post.$id}
                className="px-3 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;