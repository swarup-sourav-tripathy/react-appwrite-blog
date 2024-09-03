import React, { useEffect, useState } from "react";
import { service as appwriteService } from "../appwrite/config";
import { Container, PostCard } from "../components";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { Link } from "react-router-dom"


function Home() {
    const [posts, setPosts] = useState([])
    const items = [
        {
            src: "/pexels-hatice-baran-153179658-17683947.jpg",
            alt: "post1",
            tittle: "Fresh air"
        },
        {
            src: "/free-photo-of-pine-tree-branches-with-cones-covered-in-snow-in-winter.jpeg",
            alt: "post2",
            tittle: "Winter"
        },
        {
            src: "/pexels-hugo-silva-1095125615-27893289.jpg",
            alt: "post3",
            tittle: "Ocean"
        },
        {
            src: "/pexels-necip-duman-3299706-26562785.jpg",
            alt: "post7",
            tittle: "Exploring"
        },
        {
            src: "/pexels-raymond-petrik-1448389535-27405284.jpg",
            alt: "post4",
            tittle: "Coffee"
        },
        {
            src: "/pexels-diogo-miranda-2044514-20703786.jpg",
            alt: "post5",
            tittle: "Diwali"
        },
        {
            src: "/pexels-emareynares-18387848.jpg",
            alt: "post6",
            tittle: "Mountain"
        }
    ]

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">

                                <Carousel>
                                    <CarouselContent >
                                        {items.map((item , index) => (
                                            <CarouselItem className=" flex flex-wrap justify-center md:basis-1/2 lg:basis-1/3" key={index}>
                                                <Link to={`/login`}>
                                                    <div className="w-auto md:w-full bg-gray-100 rounded-xl p-4">
                                                        <div className="w-full mb-4">
                                                            <img
                                                                src={item.src}
                                                                alt={item.alt}
                                                                className="rounded-xl object-cover w-full h-48 md:h-64"
                                                            />
                                                        </div>
                                                        <h2 className="text-lg font-bold md:text-xl">
                                                            {item.tittle}
                                                        </h2>
                                                    </div>
                                                </Link>
                                            </CarouselItem>
                                        ))}

                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>

                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap flex-col md:flex-row">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 md:w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home;