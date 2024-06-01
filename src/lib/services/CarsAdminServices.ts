import { ApiServices } from "./ApiServices";

export class CarsAdminServices extends ApiServices {
  baseUrl = "/admin/carros";

  async registerCar(data: any) {
    return this.post(`${this.baseUrl}/novo-carro`, data);
  }

  async getCarInfoById(id: string) {
    return this.get(`${this.baseUrl}/${id}`);
  }

  async updateCarInfo(id: string, data: any) {
    return this.put(`${this.baseUrl}/${id}`, data);
  }

  async deleteCar(carId: string) {
    try {
      await this.delete(`${this.baseUrl}/?id=${carId}`);
    } catch (error) {
      console.error(`Erro ao excluir o carro: ${error}`);
      throw new Error(`Erro ao excluir o carro: ${error}`);
    }
  }

  async deleteImage(publicId: string) {
    try {
      await this.post(`${this.baseUrl}/remover-imagem`, { publicId });
      return { ok: true };
    } catch (error) {
      console.error(`Erro ao excluir a imagem: ${error}`);
      throw new Error("Erro ao excluir a imagem.");
    }
  }
}
