import { encrypt } from "@/lib/authentication";
import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";
import { AdminUserModel } from "@/lib/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();
    const admin = await AdminUserModel.findOne({ email });

    if (!admin) {
      return Response({
        object: {
          error: "E-mail e/ou senha incorretos.",
          success: false,
        },
        status: 401,
      });
    }

    const passwordMatches = await bcrypt.compare(password, admin.password);

    if (!passwordMatches) {
      return Response({
        object: {
          error: "Senha inválida!",
          success: false,
        },
        status: 401,
      });
    }

    const token = await encrypt({ adminId: admin._id });

    const response = Response({
      object: {
        error: null,
        message:
          "Login bem-sucedido! Redirecionando para o painel do administrador.",
        token,
        success: true,
      },
      status: 200,
    });

    response.cookies.set("authentication", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.error(error);
    return Response({
      object: {
        error: "Erro ao conectar ao banco de dados.",
        success: false,
      },
      status: 500,
    });
  }
}
