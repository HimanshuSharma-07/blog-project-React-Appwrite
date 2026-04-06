import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard, SkeletonCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false))
    }, [])

  return (
    <div className="w-full py-6 bg-gray-50">
      <Container>
        <div
          className="
            flex flex-wrap -mx-3
          "
        >
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="px-3 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <SkeletonCard />
              </div>
            ))
          ) : posts.length === 0 ? (
            <div className="w-full text-center py-10">
               <p className="text-gray-500">No active posts found.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.$id}
                className="px-3 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                {post.status === "active" ? <PostCard post={post} /> : null}
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts