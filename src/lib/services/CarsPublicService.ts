import { ApiServices } from "./ApiServices";

export class CarsPublicService extends ApiServices {
  baseUrl = "/carros";

  async getCars() {
    try {
      const response = await this.get(this.baseUrl);

      if (Array.isArray(response?.data?.cars)) {
        return response.data.cars;
      } else {
        throw new Error("Resposta inválida da API.");
      }
    } catch (error) {
      throw new Error(`Erro ao buscar os carros: ${error}`);
    }
  }

  async getCarMakeAndModel(make: string, model: string) {
    try {
      const response = await this.get(`${this.baseUrl}/${make}/${model}`);

      if (response?.data?.makes) {
        return response.data.makes;
      } else {
        throw new Error("Resposta inválida da API.");
      }
    } catch (error) {
      throw new Error(
        `Erro ao buscar os carros da marca ${make} e modelo ${model}: ${error}`
      );
    }
  }
}
