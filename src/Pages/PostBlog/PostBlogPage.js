import React, { useState, useContext, useEffect, useRef } from "react";
import { Container, TextField, Button, Box, Chip, InputAdornment, IconButton, Grid, Typography, TextareaAutosize } from "@mui/material";
import {  AddCircle as AddIcon, Edit, Height, PostAdd as PostAddIcon, Visibility as VisibilityIcon } from "@mui/icons-material";
import ImageIcon from '@mui/icons-material/Image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BlogContext } from "../../utils/BlogContext";
import { useNavigate } from 'react-router-dom';
import ImageSelectionModal from "../../Components/ModalComponent/ImageSelectionModal";
import fetchImages from "../../API/Unsplash";
import '../../utils/container.css'
import './PostBlogPage.css'
import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import { useBlockchain } from "../../utils/BlockchainContext";
import { useLogin } from "../../utils/loginContext";

const theme = createTheme({
    typography: {
      fontFamily: ['Noto Sans','sans-serif'].join(','),
    },
  });

const PostBlogPage = () => {
  const {
    title, setTitle, 
    content, setContent, 
    hashtags, setHashtags, 
    image, setImage,
    author, setAuthor,
   } = useContext(BlogContext)
   const { isloggedin } = useLogin();
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtagValidationError, setHashtagValidationError] = useState("");
  const [emptyError, setEmptyError] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const [images, setImages] = useState([]); // includes 20 cover image choices
  const [modalOpen, setModalOpen] = useState(false);

    const { contract, account } = useBlockchain();

    /* useEffect(() => {
        const initWeb3 = async () => {
            try {
                const web3Instance = await getWeb3();
                const accounts = await web3Instance.eth.getAccounts();
                const networkId = await web3Instance.eth.net.getId();
                const deployedNetwork = BlogContract.networks[networkId];
    
                if (deployedNetwork) {
                    const contractInstance = new web3Instance.eth.Contract(
                        BlogContract.abi,
                        deployedNetwork && deployedNetwork.address,
                    );
                    setWeb3(web3Instance);
                    setContract(contractInstance);
                    setAccount(accounts[0]);
    
                    console.log("Web3 initialized successfully:", { web3Instance, contractInstance, account: accounts[0] });
                } else {
                    console.error("Contract not deployed on the current network");
                }
            } catch (error) {
                console.error("Error initializing web3", error);
            }
        };
        initWeb3();
    }, []); */

    const handleImageButtonClick = async () => {
        try {
            if(hashtags.length === 0 ){
                setWarning("Enter hashtags to get better photos.")
            }else{
                setWarning("")
            }
            const fetchedImages = await fetchImages(hashtags.join(', '), 30);
            setImages(fetchedImages);
            setModalOpen(true);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const handleImageSelect = (selectedImage) => {
        setImage(selectedImage);
        setModalOpen(false);
    };

  const handleAddHashtag = () => {
    const trimmedHashtag = hashtagInput.trim();
    if (trimmedHashtag) {
        if (!hashtags.includes(trimmedHashtag)) {
            setHashtags([...hashtags, trimmedHashtag]);
            setHashtagInput("");
            setHashtagValidationError("");
        } else {
            setHashtagValidationError("Hashtag is already added!");
        }
    } else {
        setHashtagValidationError("Hashtag cannot be empty");
    }
};

  const handleDeleteHashtag = (hashtagToDelete) => () => {
    setHashtags(hashtags.filter((hashtag) => hashtag !== hashtagToDelete));
  };

  const handleUploadCoverPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({
          urls: {
            regular: reader.result,
          },
          alt_description: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreview = () => {
    if(title.length===0 || content.length===0 || hashtags===0){
        setEmptyError("Fill in all the fields before Posting or Preview.")
    }else{
        //brtranslation()
        navigate('/blogpreview', {replace:'true'});
    }
  }

  const handlePost = async () => {
    if (title.length === 0 || content.length === 0 || hashtags.length === 0) {
        setEmptyError("Fill in all the fields before Posting or Preview.");
    } else {
        setEmptyError("");
        //brtranslation();
        try {
            if (contract && account) {
                await contract.methods.createPost(
                    title,
                    content,
                    hashtags.join(", "),
                    image ? image.urls.regular : "",
                    "Atoz Alfredo" // Replace this with actual author name if available
                ).send({ from: account });

                console.log("Post created successfully!");
                // Navigate to another page or show success message
            } else {
                console.error("Contract or account is not available");
                // Show error message to the user
            }
        } catch (error) {
            console.error("Error creating post", error);
            // Show error message to the user
        }
    }
};

useEffect(()=>{
    console.log("IS LOGGED IN:", isloggedin);
})

  
  return (
    <div className="container">
    <ThemeProvider theme={theme}  >
        <Container maxWidth="md">
        {image && (
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
              onDoubleClick={handleImageButtonClick}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        )}
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleImageButtonClick} 
            startIcon={<ImageIcon/>}
            sx={{ m:1, }}
        >
            Unsplash Cover Photo
        </Button>
        <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleUploadCoverPhoto}
            style={{ display: 'none' }}
        />
            <label htmlFor="contained-button-file">
                <Button 
                    variant="contained" 
                    component="span" 
                    color="primary" 
                    startIcon={<CloudUploadIcon/>}
                    sx={{ m:1 }}
                >
                    Upload Cover Photo
                </Button>
            </label>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
            placeholder="Title"
            variant="filled"
            fullWidth
            required
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            InputProps={{
                sx: {
                    fontSize: 'h4.fontSize',
                    fontWeight: 'var(--weight--medium)',
                    backgroundColor: "#F8F8F8", // Custom filled background color
                    "&:hover": {
                    backgroundColor: "#F1F1F1", // Custom hover color
                    },
                    "&.Mui-focused": {
                    backgroundColor: "#ECECEC", // Custom focus color
                    },
                    "&::after": {
                    borderBottom: "2px solid var(--success---main700)", // Custom bottom border color
                    },
                }
            }}
            />
            <ReactMde
                value={content}
                onChange={setContent}
                disablePreview={true}
                TextareaAutosize={true}
                classes={{
                    textArea:{oninput:'this.style.height = "";this.style.height = this.scrollHeight + 3+ "px"'}
                }}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
                  }
                childProps={{
                    writeButton: {
                        tabIndex: -1,
                    },
                }}
            />
            <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                <TextField
                placeholder="Add a hashtag"
                variant="filled"
                fullWidth
                required
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHashtag();
                    }
                }}
                InputProps={{
                    sx: {
                        fontWeight:'200',
                        backgroundColor: "#F8F8F8",
                        "&:hover": {
                        backgroundColor: "#F1F1F1",
                        },
                        "&.Mui-focused": {
                        backgroundColor: "#ECECEC",
                        },
                        "&::after": {
                        borderBottom: "2px solid var(--success---main700)",
                        },
                        '& .MuiOutlinedInput-input': {
                            fontSize: '1rem',
                        },
                    },
                    endAdornment:(
                        <InputAdornment position='end'>
                            <IconButton onClick={handleAddHashtag}>
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                />
            </Box>
            {hashtagValidationError && (
                <Typography variant="body2" color="error">
                    {hashtagValidationError}
                </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {hashtags.map((hashtag, index) => (
                <Chip
                    key={index}
                    label={hashtag}
                    color="secondary"
                    onDelete={handleDeleteHashtag(hashtag)}
                    sx={{ mt: 1, fontWeight:'200' }}
                />
                ))}
            </Box>
            </Box>
            {warning && (
                <Typography variant="body2" color="error" sx={{ display:'flex', justifyContent:'right'}}>
                    {warning}
                </Typography>
            )}

            {emptyError && (
                <Typography variant="body2" color="error" sx={{ display:'flex', justifyContent:'right'}}>
                    {emptyError}
                </Typography>
            )}
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<PostAddIcon />}
                    sx={{ mr: 2 }}
                    onClick={handlePost}
                >
                    Post
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<VisibilityIcon />}
                    onClick={handlePreview}
                >
                    Preview
                </Button>
            </Grid>
        </Box>
        <ImageSelectionModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          images={images}
          onSelectImage={handleImageSelect}
        />  
        </Container>
    </ThemeProvider>
    </div>
  );
};

export default PostBlogPage;
