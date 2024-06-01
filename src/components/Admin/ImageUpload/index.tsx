import { TImageUpload } from "@/lib/types";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { FaImage } from "react-icons/fa";

const ImageUpload = ({
  photo,
  handleImageUpload,
  removeImage,
  publicId,
  alt,
}: TImageUpload) => {
  return (
    <div className="image-container">
      <div>
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
          className="upload-image-container"
          onUpload={handleImageUpload}
        >
          <div className="upload-image">
            <FaImage />
          </div>
          {photo && (
            <Image src={photo} fill alt={alt} className="uploaded-image" />
          )}
        </CldUploadButton>
      </div>
      {publicId && (
        <button onClick={removeImage} className="remove-image">
          Excluir imagem
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
