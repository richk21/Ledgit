import React, { createContext, useState } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [image, setImage] = useState();
  const [author, setAuthor] = useState('');

  return (
    <BlogContext.Provider 
      value={{ title, setTitle, 
              content, setContent, 
              hashtags, setHashtags, 
              image, setImage, 
              author, setAuthor,
    }}>
      {children}
    </BlogContext.Provider>
  );
};
