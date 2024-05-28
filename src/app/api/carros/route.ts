import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { verifyToken } from "@/lib/authentication";
import { Response } from "@/lib/helpers/standardMessage";
import { CarModel } from "@/lib/models/carModel";
import { NextRequest } from "next/server";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyToken(request);

    if (decoded.status) {
      return decoded;
    }

    const cars = await CarModel.find();

    if (!cars) {
      return Response({
        object: {
          error: "Nenhum veículo encontrado.",
          success: false,
        },
        status: 404,
      });
    }

    return Response({
      object: {
        error: null,
        message: "Veículos encontrados.",
        cars: cars,
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
