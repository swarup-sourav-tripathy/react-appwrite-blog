import React , {useState , useEffect} from "react";
import { service as appwriteService } from "../appwrite/config";
import { Container , PostCard } from "../components";

function AllPosts(){
    const [posts , setPosts] = useState([])
    useEffect(() => {} ,[])
    appwriteService.getPosts([]).then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })

    return(
        <div className="w-full py-8">
            <Container>
               <div className="flex flex-wrap">
                {posts ? posts.map((post) => (
                    <div key={post.$id} className="p-2 md:w-1/4 ">
                        <PostCard post={post} />
                    </div>
                )) : null }
               </div>
            </Container>
        </div>
    )
}

export default AllPosts;