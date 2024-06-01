import { Response } from "@/lib/helpers/standardMessage";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const removeImage = async (publicId: string) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
  } catch (error: any) {
    return Response({
      object: {
        error: error.message,
        success: false,
      },
      status: 400,
    });
  }
};

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();

    await removeImage(publicId);

    return Response({
      object: {
        error: null,
        message: "Imagem excluída.",
        success: false,
      },
      status: 200,
    });
  } catch (error: any) {
    return Response({
      object: {
        error: error.message,
        success: false,
      },
      status: 500,
    });
  }
}
