import React, {useEffect, useState} from 'react'
import {Container, PostForm, Loader} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            }).finally(() => setLoading(false))
        } else {
            navigate('/')
        }
    }, [slug, navigate])

  if (loading) return (
    <div className="py-20 flex justify-center">
      <Loader />
    </div>
  );

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} slug={slug} />
        </Container>
    </div>
  ) : null
}

export default EditPost