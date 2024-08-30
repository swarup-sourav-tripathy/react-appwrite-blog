import React from "react";
import { service as appwriteService } from "../appwrite/config";
import {Link} from 'react-router-dom'

function PostCard({post}){

    return(
    <Link to={`/post/${post.$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
                <img src={appwriteService.getFilePreview(post.featuredimage)} alt={post.tittle} 
                className="rounded-xl"/>
            </div>
            <h2
            className="text-xl font-bold"
            >{post.tittle}</h2>
        </div>
    </Link>
    )
}

export default PostCard;