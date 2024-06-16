import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Container, IconButton, InputAdornment, TextField, Typography  } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, Link } from "react-router-dom";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Comment from "../../Components/Comment/Comment";
import { AddCircle as AddIcon } from "@mui/icons-material";
import '../../utils/container.css'
import './BlogPage.css'
import '../../utils/MarkdownStyling.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Georgia, serif',
  },
});

const colors = [    
    'default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

const BlogPage = () => {
    const location = useLocation();
    const title = location.state?.title;
    const author = location.state?.author;
    const content = location.state?.content;
    const hashtags = location.state?.hashtags;
    const image = location.state?.image;
    
    const hashtagsArray = hashtags ? hashtags.split(',').map(tag => tag.trim()) : [];

    const [comments, setComments] = useState([
        { id: 1, author: "User1", content: "Great post!", createdAt: "2024-06-15T12:00:00Z" },
        { id: 2, author: "User2", content: "Nice insights!", createdAt: "2024-06-15T13:00:00Z" },
        { id: 3, author: "User3", content: "Thank you for sharing.", createdAt: "2024-06-15T14:00:00Z" }
    ]);

    const [visibleComments, setVisibleComments] = useState(2);
    const [newComment, setNewComment] = useState({
        author: "",
        content: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewComment({
            ...newComment,
            [name]: value,
        });
    };

    const handleAddComment = () => {
        const createdAt = new Date().toISOString(); // Example: Use ISO format for createdAt timestamp
        const id = comments.length + 1; // Example: Generate unique id (replace with actual logic)
        const commentToAdd = { ...newComment, createdAt, id };
        setComments([...comments, commentToAdd]);
        setNewComment({
            author: "",
            content: "",
        });
    };

    const handleLoadMoreComments = () => {
        setVisibleComments(visibleComments + 2); // Increase by 2 to load two more comments
      };

    return(
        <div className="container">
        <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{mt:4}}>
            {image &&
            <Box
                sx={{
                maxHeight: '400px',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
                }}
            >
                <img
                className="imageStyle"
                src={image}
                alt={image.alt_description}
                style={{
                    maxHeight: '100%',
                    objectFit: 'contain',
                }}
                />
            </Box>
            }
            <Typography variant="h3" component="h1" gutterBottom>
                {title}
            </Typography>
            <Box sx={{mt:2, display:'flex', gap:1, flexWrap:'wrap'}}>
                {hashtagsArray.map((hashtags, index)=>(
                    <Chip key={index} label={`#${hashtags}`} color={getRandomColor()}/>
                ))}
            </Box>
            <Typography variant="h7" component="div" color="grey" sx={{mt:'15px', mb:'30px'}} gutterBottom>
                {`by ${author}`}
            </Typography>
            <div className="markdown-container">
                <Markdown 
                    remarkPlugins={[gfm]} 
                    children={content} 
                    rehypePlugins={[rehypeRaw]} 
                    components={{
                        img: ({ node, ...props }) => <img {...props} style={{ display: 'block', margin: '0 auto' }} />,
                    }}
                />
            </div>

            {/* <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
            Comments
          </Typography>
          <Box sx={{ mt: 2, fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your Comment"
              name="content"
              value={newComment.content}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleAddComment}>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box> */}
          {/* Render visible comments */}
          {/* {comments.slice(0, visibleComments).map(comment => (
            <Comment
              key={comment.id}
              author={comment.author}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          ))} */}
          {/* Load More Comments Button */}
          {/* {visibleComments < comments.length && (
            <Box sx={{ mt: 2 }}>
                <Link component="button" variant="body1" onClick={handleLoadMoreComments}>
                    Load More Comments
                </Link>
            </Box>
          )} */}
        </Container>
        </ThemeProvider>
        </div>
    )
}

export default BlogPage;