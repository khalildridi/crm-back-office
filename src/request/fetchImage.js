import request from "./request";

export const fetchImage = async ({entity,imagePath}) => {
  try {
      // console.log('entity is', entity);
      // console.log('image path is', imagePath);
    const imageData = await request.getImage({
      entity: entity, // Adjust according to your API endpoint structure
      imagePath: imagePath,
    });
    const type=imageData.type
    // console.log("image data is",imageData)
    const imageUrl = URL.createObjectURL(new Blob([imageData]));
    //  const imageUrl = URL.createObjectURL(blob);
      // console.log('imageUrl is', imageUrl);
      // console.log('type', type);
     return { imageUrl, type: type };
    // return imageUrl
  } catch (error) {
    console.error('Error fetching the image', error);
    return error;
  }
};
