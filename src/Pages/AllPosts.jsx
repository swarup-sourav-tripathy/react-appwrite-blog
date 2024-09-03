import React, { useState, useEffect } from "react";
import { service as appwriteService } from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useNavigate } from 'react-router-dom'

function AllPosts() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })



    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {
                        (posts && posts.length > 0) ? (posts.map((post) => (
                            <div key={post.$id} className="p-2 md:w-1/4 ">
                                <PostCard post={post} />
                            </div>
                        ))) :
                            (
                                <>
                                    <div className="flex flex-wrap flex-col justify-center items-center">
                                        <h1 className="font-serif font-bold h-4">
                                            🎉 Milestone Alert: Our First Post! 🎉
                                        </h1>
                                        <br />
                                        <br />
                                        <p className="font-sans font-semibold">
                                            "Congratulations on making history! This is the very first post on our app, and we're beyond excited to see it. Thank you for being part of this journey from the beginning. Here’s to many more amazing posts and memories together!"

                                            <br />
                                            <br />

                                            "Click on the button below to add FIRST POST"
                                        </p>
                                        <br />
                                        <button
                                            onClick={() => navigate('/add-post')}
                                            className='inline-block border-2 w-40 border-black px-2 py-2 text-sm md:px-6 md:py-3 duration-200 hover:bg-blue-100 rounded-full'
                                        >
                                            Add Post
                                        </button>
                                    </div>
                                </>
                            )
                    }

                </div>
            </Container>
        </div>
    )
}

export default AllPosts;