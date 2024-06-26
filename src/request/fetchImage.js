export const fetchImage = async ({entity,imagePath}) => {
  try {
    const imageData = await request.getImage({
      entity: entity, // Adjust according to your API endpoint structure
      imagePath: imagePath,
    });
    const imageUrl = URL.createObjectURL(new Blob([imageData]));
    return imageUrl
  } catch (error) {
    console.error('Error fetching the image', error);
  }
};
