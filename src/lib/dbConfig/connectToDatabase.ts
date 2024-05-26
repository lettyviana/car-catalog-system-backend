import mongoose from "mongoose";
import { Response } from "../helpers/standardMessage";

const { MONGODB_CONNECTION_STRING } = process.env;

const connectToDatabase = async () => {
  if (!MONGODB_CONNECTION_STRING) {
    return Response({
      object: {
        error:
          "A variável de ambiente de configuração do banco não foi informada.",
        success: false,
      },
      status: 500,
    });
  }

  try {
    if (mongoose.connection.readyState === 0) {
      mongoose.connection.on("connected", () =>
        console.log("Banco de dados conectado.")
      );
    }

    mongoose.connection.on("error", (error) =>
      console.error(`Erro ao conectar ao banco de dados: ${error}`)
    );
    await mongoose.connect(MONGODB_CONNECTION_STRING);
  } catch (error: any) {
    return Response({
      object: {
        error: "Erro na conexão com o banco de dados.",
        success: false,
      },
      status: 500,
    });
  }
};

export default connectToDatabase;
