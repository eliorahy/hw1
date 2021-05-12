import http from "../http-common";

class EmployeeDataService {
  getAll() {
    return http.get("/employee/list");
  }

  create(data) {
    return http.post("/employee/create", data);
  }

  update(id, data) {
    return http.put(`/employee/update`, data);
  }

  deleteAll() {
    return http.delete(`/employee/delete`);
  }

}

export default new EmployeeDataService();