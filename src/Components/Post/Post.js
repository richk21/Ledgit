import React from "react";
import './Post.css'
import { Link } from "react-router-dom";

const Post = ({image, heading, author, description, hashtags})=>{

    const truncateText = (text, wordLimit) => {
        // Regex pattern to match markdown syntax ![some word](url)
        const markdownRegex = /!\[.*?\]\((.*?)\)/g;

        // Replace all markdown syntax with an empty string
        const textWithoutMarkdown = text.replace(markdownRegex, '');

        // Split text into words after removing markdown syntax
        const words = textWithoutMarkdown.split(' ');

        let truncatedText = '';
        let count = 0;
        let index = 0;

        while (count < wordLimit && index < words.length) {
            const word = words[index];
            truncatedText += word + ' ';
            count++;
            index++;
        }

        if (words.length > wordLimit) {
            truncatedText += '...';
        }
        
        return truncatedText.trim();
    };

    return(
        <div className="post">
            <div className="imagecontent">
                <img src={image} alt="blogimg"/>
            </div>
            <div className="textcontent">
                <Link to='/blogpage' state={{ title: heading, author, image, content: description,hashtags }}>
                    <div className="heading">
                        {heading}
                    </div>
                </Link>
                <div className="author">
                    {author}
                </div>
                <div className="description">
                    <p>{truncateText(description, 40)}</p>
                </div>
            </div>
        </ div>
    )
}

export default Post