import cloudinary from './cloudinary.js';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

   
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error("Erro ao deletar arquivo local:", err);
    }

    return result.secure_url;

  } catch (error) {
    console.error("Erro ao fazer upload no Cloudinary:", error);

    // Tenta remover o arquivo mesmo com erro no upload
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error("Erro ao deletar arquivo local após erro de upload:", err);
    }

    return null;
  }
};

export default uploadOnCloudinary;
