import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";
import { CarModel } from "@/lib/models/carModel";

connectToDatabase();

export async function GET(
  request: Request,
  { params }: { params: { modelo: string } }
) {
  try {
    const model = params.modelo;

    if (!model) {
      return Response({
        object: {
          error: "Modelo não especificado.",
          success: false,
        },
        status: 400,
      });
    }

    const carsByModel = await CarModel.find({ model: model });

    if (!carsByModel || carsByModel.length === 0) {
      return Response({
        object: {
          error: `Nenhum carro encontrado para o modelo ${model}.`,
          success: false,
        },
        status: 404,
      });
    }

    const carInfo = carsByModel.map((car) => ({
      name: car.name,
      make: car.make,
      model: car.model,
      photo: car.photo,
      miniCardPhoto: car.miniCardPhoto,
      price: car.price,
      year: car.year,
      version: car.version,
    }));

    return Response({
      object: {
        error: null,
        message: `Carros do modelo ${model} encontrados.`,
        makes: carInfo,
        success: true,
      },
      status: 200,
    });
  } catch (error: any) {
    return Response({
      object: {
        error: error.message,
        success: false,
      },
      status: 501,
    });
  }
}
