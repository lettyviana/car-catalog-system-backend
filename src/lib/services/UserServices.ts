import { ApiServices } from "./ApiServices";

export class UserServices extends ApiServices {
  login(data: any) {
    return this.post("/auth/login", data);
  }

  logout() {
    return this.get("/auth/logout");
  }

  getUser() {
    return this.get("/admin");
  }
}
