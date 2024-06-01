import { logout } from "@/lib/authentication";
import { Response } from "@/lib/helpers/standardMessage";

export async function GET() {
  try {
    logout();

    return Response({
      object: {
        error: null,
        message: "Redirecionando para a página inicial!",
        success: true,
      },
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return Response({
      object: {
        error:
          "Não foi possível fazer o logout. Entre em contato com o administrador.",
        success: false,
      },
      status: 500,
    });
  }
}
