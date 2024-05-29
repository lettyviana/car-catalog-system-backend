import { Response } from "@/lib/helpers/standardMessage";
import { CarModel } from "@/lib/models/carModel";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filtro = searchParams.get("filtro");

    if (!filtro) {
      return Response({
        object: {
          error: "Veículo não encontrado.",
          success: false,
        },
        status: 400,
      });
    }

    const carsFound = await CarModel.find({
      $or: [{ make: { $regex: filtro, $options: "i" } }],
    });

    return Response({
      object: {
        error: null,
        message: "",
        carsFound,
        success: true,
      },
      status: 200,
    });
  } catch (error: any) {
    return Response({
      object: {
        error: "Não foi possível realizar a busca.",
        success: false,
      },
      status: 500,
    });
  }
}
