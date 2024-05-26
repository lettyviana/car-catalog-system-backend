import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();
    if (email === "admin@admin.com" && password === "Admin@123") {
      return Response({
        object: {
          error: null,
          message: "Usuário autenticado com sucesso",
          success: true,
        },
        status: 200,
      });
    }
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
