// components/ImageSelectionModal.js
import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Masonry from 'react-masonry-css';
import './ImageSelectionModal.css'

const ImageSelectionModal = ({ open, handleClose, images, onSelectImage }) => {
  return (
    <Modal open={open} onClose={handleClose} sx={{overflowX:'hidden', minWidth:'322px', mt:'2%', mb:'2%'}}>
      <Box sx={{ 
          position: 'absolute',
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '80%', 
          height:'70%',
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 1,
          display:'flex',
          flexDirection:'column',
          borderRadius:'10px',
          
          overflowY:'scroll',
          overflowX:'hidden',
          
        }}>
        <Box sx={{ 
            display: 'flex', 
            alignItems:'center',
            justifyContent:'space-between', 
            width: '100%',
            backgroundColor: 'background.paper',
            position:'sticky',
            top:0,
            zIndex:1,
            p:1,
        }}>
          <Typography className='modal_title' variant="h4" component="h1" sx={{fontWeight:'700'}}>
            Cover Photo
        </Typography>
          <IconButton
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Masonry
          breakpointCols={{ default: 4, 900: 3, 700: 2, 500: 1 }}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image.urls.thumb}
                alt={image.alt_description}
                style={{ width: '100%', cursor: 'pointer', }}
                onClick={() => onSelectImage(image)}
              />
            </div>
          ))}
        </Masonry>
      </Box>
    </Modal>
  );
};

export default ImageSelectionModal;
