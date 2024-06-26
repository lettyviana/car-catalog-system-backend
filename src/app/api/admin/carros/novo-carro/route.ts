import { verifyToken } from "@/lib/authentication";
import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";
import { CarFamilyModel } from "@/lib/models/carFamilyModel";
import { CarModel } from "@/lib/models/carModel";
import { NextRequest } from "next/server";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyToken(request);

    if (decoded.status) {
      return decoded;
    }

    const { adminId } = decoded;
    let { name, make, model, photo, price, year, version, familyId } =
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

    const defaultFamily = await CarFamilyModel.findOne({
      make: "Carro",
      model: "Sem Família",
    });

    try {
      const createdCar = new CarModel({
        name,
        make,
        model,
        photo,
        price,
        familyId: familyId || defaultFamily._id,
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
