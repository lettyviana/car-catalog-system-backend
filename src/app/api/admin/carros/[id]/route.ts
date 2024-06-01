import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { verifyToken } from "@/lib/authentication";
import { Response } from "@/lib/helpers/standardMessage";
import { CarModel } from "@/lib/models/carModel";
import { NextRequest } from "next/server";

connectToDatabase();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded = await verifyToken(request);

    if (decoded.status) {
      return decoded;
    }

    const { id } = params;
    const { name, make, model, photo, price, year, version } =
      await request.json();

    try {
      const carData = { name, make, model, photo, price, year, version };
      await CarModel.findByIdAndUpdate(id, carData);

      return Response({
        object: {
          error: null,
          message: "Dados do veículo atualizados!",
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
        status: 500,
      });
    }
  } catch (error: any) {
    return Response({
      object: {
        error: "Não foi possível atualizar os dados.",
        success: false,
      },
      status: 500,
    });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded = await verifyToken(request);

    if (decoded.status) {
      return decoded;
    }

    const { id } = params;
    const existingCar = await CarModel.findOne({ _id: id });

    if (!existingCar) {
      return Response({
        object: {
          error: "Veículo não encontrado.",
          success: false,
        },
        status: 401,
      });
    }

    return Response({
      object: { error: null, car: existingCar, success: true },
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
