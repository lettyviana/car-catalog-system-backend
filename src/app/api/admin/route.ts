import { decrypt } from "@/lib/authentication";
import { Response } from "@/lib/helpers/standardMessage";
import { AdminUserModel } from "@/lib/models/userModel";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const auth = request.cookies.get("authentication") || "";

    if (!auth) {
      return Response({
        object: {
          error: "Faça login para acessar esta página!",
          success: false,
        },
        status: 401,
      });
    }

    const decoded = await decrypt(auth.value);

    if (typeof decoded === "string") {
      return Response({
        object: {
          error: "Token inválido.",
          success: false,
        },
        status: 401,
      });
    }

    const { adminId } = decoded;
    const existingAdmin = await AdminUserModel.findOne({ _id: adminId }).select(
      "username email"
    );

    if (!existingAdmin) {
      return Response({
        object: {
          error: "Usuário não encontrado.",
          success: false,
        },
        status: 401,
      });
    }

    return Response({
      object: {
        error: null,
        user: existingAdmin,
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
