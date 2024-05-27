import { AdminUserModel } from "@/lib/models/userModel";

export async function checkExistingUser(email: string) {
  const existingAdminUser = await AdminUserModel.findOne({ email });
  if (existingAdminUser) {
    throw new Error("Já existe um usuário com este e-mail.");
  }
}

export function checkPasswordStrength(password: string) {
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

  if (password && !passwordPattern.test(password)) {
    throw new Error(
      "A senha deve ter no mínimo 8 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo!"
    );
  }
}

export function checkPasswordMatch(password: string, confirmPassword: string) {
  if (password && password !== confirmPassword) {
    throw new Error("A senha e a confirmação de senha não correspondem!");
  }
}
