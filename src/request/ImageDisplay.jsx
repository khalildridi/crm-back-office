import React, { useState, useEffect } from 'react';
import request from './request';
import './ImageDisplay.css'; // Importer le fichier CSS avec les styles

const ImageDisplay = ({ imagePath ,entity}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   const fetchImage = async () => {
     try {
       const imageData = await request.getImage({
         entity: entity, // Adjust according to your API endpoint structure
         imagePath: imagePath,
       });
       const imageUrl = URL.createObjectURL(new Blob([imageData]));
       setImageSrc(imageUrl);
       setLoading(false);
     } catch (error) {
       console.error('Error fetching the image', error);
       setError('Error fetching the image');
       setLoading(false);
     }
   };
  useEffect(() => {
  

    fetchImage();
  }, [imagePath]);

  return (
    <div className="image-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <img src={imageSrc} alt="file loaded" className="centered-image" />
      )}
    </div>
  );
};

export default ImageDisplay;
