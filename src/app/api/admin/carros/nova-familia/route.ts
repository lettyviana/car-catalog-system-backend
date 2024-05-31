import { verifyToken } from "@/lib/authentication";
import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";
import { CarFamilyModel } from "@/lib/models/carFamilyModel";
import { NextRequest } from "next/server";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyToken(request);

    if (decoded.status) {
      return decoded;
    }

    const { adminId } = decoded;
    const { make, model, photo } = await request.json();

    if (!make || !model || !photo) {
      return Response({
        object: {
          error:
            "Preencha todos os dados para cadastrar a família de veículos.",
          success: false,
        },
        status: 400,
      });
    }

    const existingFamily = await CarFamilyModel.findOne({ make, model });

    if (existingFamily) {
      return Response({
        object: {
          error: "Já existe.",
          success: false,
        },
        status: 400,
      });
    }

    try {
      const createdFamily = new CarFamilyModel({
        make,
        model,
        photo,
        adminId,
      });

      await createdFamily.save();

      return Response({
        object: {
          error: null,
          message: "Cadastrada com sucesso!",
          success: true,
        },
        status: 200,
      });
    } catch (error) {
      return Response({
        object: {
          error: `Erro ao cadastrar a família: ${error}`,
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
