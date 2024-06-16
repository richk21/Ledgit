import React from "react";
import { Box, Typography } from "@mui/material";
import './Comment.css';

const Comment = ({ author, content, createdAt }) => {
    return (
        <Box className="comment">
            <Typography variant="body1" className="content">
                {content}
            </Typography>
            <Typography variant="subtitle2" className="author">
                {author}
            </Typography>
            <Typography variant="caption" className="date">
                {new Date(createdAt).toLocaleDateString()}
            </Typography>
        </Box>
    );
}

export default Comment;
