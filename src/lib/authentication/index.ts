import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { Response } from "../helpers/standardMessage";

const { JWT_SECRET_KEY } = process.env;

export async function encrypt(payload: any) {
  if (!JWT_SECRET_KEY) {
    throw new Error("A variável JWT_SECRET_KEY não foi definida.");
  }
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2d" });
}

export async function decrypt(input: string): Promise<any> {
  if (!JWT_SECRET_KEY) {
    throw new Error("A variável JWT_SECRET_KEY não foi definida.");
  }
  try {
    const payload = jwt.verify(input, JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function verifyToken(request: NextRequest) {
  const auth = request.cookies.get("authentication") || "";

  if (!auth) {
    return Response({
      object: {
        error: "Você deve fazer o login.",
        success: false,
      },
      status: 401,
    });
  }

  try {
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

    if (decoded.status) {
      return decoded;
    }
    
    return decoded;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return Response({
        object: {
          error: "O token expirou. Faça login.",
          success: false,
        },
        status: 401,
      });
    }

    return Response({
      object: {
        error: "Token inválido.",
        success: false,
      },
      status: 401,
    });
  }
}
