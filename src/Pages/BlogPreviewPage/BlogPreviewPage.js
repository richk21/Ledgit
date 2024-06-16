import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../utils/BlogContext";
import { Box, Chip, Container, Typography  } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import '../../utils/container.css'
import './BlogPreviewPage.css'
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

const BlogPreview = () => {

    const {title, author, content, setContent, hashtags, image} = useContext(BlogContext);
    const navigate = useNavigate()

    /* const brtranslation = () => {
        // Transform content for preview (replace <br/> with \n\n)
        const transformed = content.replace(/<br\s*\/?>/g, "\n");
        setContent(transformed); // Update content state with transformed text
    }; */

    const handleDoubleClick = () => {
        //brtranslation()
        navigate('/postblog', {replace:'true'})
    }

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
                src={image.urls.regular}
                alt={image.alt_description}
                onDoubleClick={handleDoubleClick}
                style={{
                    maxHeight: '100%',
                    objectFit: 'contain',
                }}
                />
            </Box>
            }
            <Typography variant="h3" component="h1" gutterBottom onDoubleClick={handleDoubleClick}>
                {title}
            </Typography>
            <Box sx={{mt:2, display:'flex', gap:1, flexWrap:'wrap'}}>
                {hashtags.map((hashtags, index)=>(
                    <Chip key={index} label={`#${hashtags}`} color={getRandomColor()} onDoubleClick={handleDoubleClick}/>
                ))}
            </Box>
            <Typography variant="h7" component="div" color="grey" sx={{mt:'15px', mb:'30px'}} gutterBottom onDoubleClick={handleDoubleClick}>
                {`by ${author}`}
            </Typography>
            <div className="markdown-container" onDoubleClick={handleDoubleClick}>
                <Markdown 
                    remarkPlugins={[gfm]} 
                    children={content} 
                    rehypePlugins={[rehypeRaw]} 
                    components={{
                        img: ({ node, ...props }) => <img {...props} style={{ display: 'block', margin: '0 auto' }} />,
                    }}
                />
            </div>
        </Container>
        </ThemeProvider>
        </div>
    )
}

export default BlogPreview;