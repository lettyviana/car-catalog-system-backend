import { ApiServices } from "./ApiServices";

export class CarsFamilyPublicServices extends ApiServices {
  baseUrl = "/familias";

  async getFamilies() {
    try {
      const response = await this.get(this.baseUrl);

      if (Array.isArray(response?.data?.families)) {
        return response.data.families;
      } else {
        throw new Error("Resposta inválida da API.");
      }
    } catch (error) {
      throw new Error(`Erro ao buscar as famílias: ${error}`);
    }
  }
}
