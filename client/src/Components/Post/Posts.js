import React from "react"
import Post from "./Post"
import './Posts.css'

const Posts = () =>{
    return (
        <>
        <div className="carousel-container">
            <div className="carousel-content">
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
        </>
    )
}

export default Posts