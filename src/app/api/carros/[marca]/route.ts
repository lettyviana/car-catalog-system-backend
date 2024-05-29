import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";
import { CarModel } from "@/lib/models/carModel";

connectToDatabase();

export async function GET(
  request: Request,
  { params }: { params: { marca: string } }
) {
  try {
    const make = params.marca;
    
    if (!make) {
        return Response({
            object: {
                error: "Marca não especificada.",
                success: false,
            },
            status: 400,
        });
    }
    
    const carsByMake = await CarModel.find({ make: make });
    
    if (!carsByMake || carsByMake.length === 0) {
      return Response({
        object: {
          error: `Nenhum carro encontrado para a marca ${make}.`,
          success: false,
        },
        status: 404,
      });
    }

    const carInfo = carsByMake.map((car) => ({
      name: car.name,
      make: car.make,
      model: car.model,
      photo: car.photo,
      price: car.price,
      year: car.year,
      version: car.version,
    }));

    return Response({
      object: {
        error: null,
        message: `Carros da marca ${make} encontrados.`,
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
