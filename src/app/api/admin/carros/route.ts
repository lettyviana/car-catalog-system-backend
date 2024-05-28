import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { verifyToken } from "@/lib/authentication";
import { Response } from "@/lib/helpers/standardMessage";
import { CarModel } from "@/lib/models/carModel";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const decoded = await verifyToken(request);

    if (decoded.status) {
      return decoded;
    }

    const { adminId } = decoded;

    const cars = await CarModel.find({ adminId });

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
        message: `Veículos encontrados do admin ${adminId}.`,
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

export async function DELETE(request: NextRequest) {
  await connectToDatabase();

  const decoded = await verifyToken(request);

  if (decoded.status) {
    return decoded;
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await CarModel.findByIdAndDelete(id);

  return Response({
    object: {
      error: null,
      message: "Carro excluído.",
    },
    status: 200,
  });
}
