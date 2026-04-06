import { Container, Button, SkeletonCard } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService.getPosts([]).then((res) => {
      if (res) setPosts(res.documents);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full bg-gray-50">
      <Container>

        {/* ================= HERO ================= */}
        <section className="py-16 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Life in Words
          </h1>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Thoughts, stories, and ideas — written simply, shared honestly.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button
              onClick={() => navigate("/all-posts")}
              className="px-6 py-2"
            >
              Read Blogs
            </Button>

            {authStatus && (
              <Button
                onClick={() => navigate("/add-post")}
                className="px-6 py-2 bg-gray-900 text-gray-800 border border-gray-00 hover:bg-gray-900/100"
              >
                Write a Post
              </Button>
            )}
          </div>
        </section>

        {/* ================= LATEST POSTS ================= */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Latest Posts
            </h2>
            <Link
              to="/all-posts"
              className="text-sm font-medium text-background-color hover:underline"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-gray-500 text-sm">No posts yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </div>
          )}
        </section>


        {/* ================= ABOUT ================= */}
        <section className="py-14 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Why Life in Words?
          </h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            This is a space to share honest thoughts, lessons, and ideas —
            without noise, without pressure. Just words that matter.
          </p>
        </section>

        {/* ================= CTA ================= */}
        {!authStatus && (
          <section className="py-14 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              Join Life in Words
            </h3>
            <p className="mt-2 text-gray-600">
              Create an account and start writing today.
            </p>

            <Button
              onClick={() => navigate("/signup")}
              className="mt-6 px-8 py-2"
            >
              Create Account
            </Button>
          </section>
        )}

      </Container>
    </div>
  );
}

export default Home;