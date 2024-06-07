import React from "react";
import './Post.css'

const Post = ()=>{
    return(
        <div className="post">
            <div className="imagecontent">
                <img src="https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/06/720/405/Melissa-Cohen-Biden-Garrett-Ziegler.jpg?ve=1&tl=1" alt="blogimg"/>
            </div>
            <div className="textcontent">
                <div className="heading">
                    Blog Heading
                </div>
                <div className="author">
                    richa_21
                </div>
                <div className="description">
                    <p>Melissa Cohen Biden the wife of Hunter Biden lashed out at a former Trump White House aide during a Tuesday appearance in court to support her husband, who has been charged with three felonies stemming from a 2018 firearm purchase.</p>
                    {/* there should be a 40 word limit in this */}
                </div>
            </div>
        </ div>
    )
}

export default Post