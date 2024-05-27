import { verifyToken } from "@/lib/authentication";
import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";
import { CarModel } from "@/lib/models/carModel";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const decoded = await verifyToken(request);

    if (decoded.status) {
      return decoded;
    }

    const { adminId } = decoded;
    const { name, make, model, photo, price, year, version } =
      await request.json();

    if (!name || !make || !model || !photo) {
      return Response({
        object: {
          error: "Preencha os dados para cadastrar o veículo.",
          success: false,
        },
        status: 400,
      });
    }

    const existingCar = await CarModel.findOne({ name });

    if (existingCar) {
      return Response({
        object: {
          error: "Já existe um carro com esse nome.",
          success: false,
        },
        status: 400,
      });
    }

    try {
      const createdCar = new CarModel({
        name,
        make,
        model,
        photo,
        price,
        year,
        version,
        adminId,
      });

      await createdCar.save();

      return Response({
        object: {
          error: null,
          message: "Carro cadastrado com sucesso!",
          success: true,
        },
        status: 200,
      });
    } catch (error) {
      return Response({
        object: {
          error: `Erro ao cadastrar o veículo: ${error}`,
          success: false,
        },
        status: 500,
      });
    }
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
