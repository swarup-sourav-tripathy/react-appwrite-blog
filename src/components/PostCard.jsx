import React from "react";
import { service as appwriteService } from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ post }) {
    // console.log(post,"card");
    
    return (
        <Link to={`/post/${post.$id}`}>
            <div className="w-auto md:w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-xl object-cover w-full h-48 md:h-64"
                    />
                </div>
                <h2 className="text-lg font-bold md:text-xl">
                    {post.tittle}
                </h2>
            </div>
        </Link>
    );
}

export default PostCard;
