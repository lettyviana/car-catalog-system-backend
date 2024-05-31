import { verifyToken } from "@/lib/authentication";
import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";
import { CarFamilyModel } from "@/lib/models/carFamilyModel";
import { NextRequest } from "next/server";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const families = await CarFamilyModel.find();

    if (families.length === 0) {
      return Response({
        object: {
          error: "Nenhuma família encontrada.",
          success: false,
        },
        status: 404,
      });
    }

    return Response({
      object: {
        error: null,
        message: "",
        families: families,
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
