import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";
import { CarModel } from "@/lib/models/carModel";
import { NextRequest } from "next/server";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const allCars = await CarModel.find();

    if (!allCars) {
      return Response({
        object: {
          error: "Nenhum veículo encontrado.",
          success: false,
        },
        status: 404,
      });
    }

    const carInfo = allCars.map((car) => ({
      make: car.make,
      model: car.model,
    }));

    return Response({
      object: {
        error: null,
        message: "Modelos encontrados.",
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
