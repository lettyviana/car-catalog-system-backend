import connectToDatabase from "@/lib/dbConfig/connectToDatabase";
import { Response } from "@/lib/helpers/standardMessage";
import { AdminUserModel } from "@/lib/models/userModel";
import {
  checkEmail,
  checkExistingUser,
  checkPasswordMatch,
  checkPasswordStrength,
} from "@/lib/utils/validations";
import bcrypt from "bcryptjs";

connectToDatabase();

export async function POST(request: Request) {
  const { username, email, password, confirmPassword } = await request.json();

  if (!username || !email || !password || !confirmPassword) {
    return Response({
      object: {
        error: "Preencha os campos obrigatórios!",
        success: false,
      },
      status: 400,
    });
  }

  try {
    await checkExistingUser(email);
  } catch (error: any) {
    return Response({
      object: {
        error: error.message,
        success: false,
      },
      status: 500,
    });
  }

  try {
    checkEmail(email);
  } catch (error: any) {
    return Response({
      object: {
        error: error.message,
        success: false,
      },
      status: 500,
    });
  }

  try {
    checkPasswordStrength(password);
  } catch (error: any) {
    return Response({
      object: {
        error: error.message,
        success: false,
      },
      status: 500,
    });
  }

  try {
    checkPasswordMatch(password, confirmPassword);
  } catch (error: any) {
    return Response({
      object: {
        error: error.message,
        success: false,
      },
      status: 500,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = new AdminUserModel({
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
    });
    await admin.save();

    return Response({
      object: {
        error: null,
        message: "Administrador cadastrado com sucesso!",
        success: true,
      },
      status: 200,
    });
  } catch (error: any) {
    return Response({
      object: {
        error: `Erro ao cadastrar o administrador: ${error}`,
        success: false,
      },
      status: 500,
    });
  }
}
