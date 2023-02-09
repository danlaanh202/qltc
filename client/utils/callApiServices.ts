import axios from "axios";
export const publicRequest = axios.create({
  baseURL: "http://localhost:4000",
});
export default new (class CallApiServices {
  async getThuocTiem(searchQuery: string, setValue: any) {
    try {
      await publicRequest
        .get(`/thuoc_tiem/tim_kiem?ten_thuoc=${searchQuery}`)
        .then((res) => setValue(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  async getAllThuocTiem(setValue: any) {
    try {
      await publicRequest
        .get("/thuoc_tiem/lay_thuoc_tiem")
        .then((res) => setValue(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  async editThuoc(body: any) {
    try {
      return await publicRequest.put("/thuoc_tiem/sua_thuoc", body);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteThuoc(ma_so_thuoc: string) {
    try {
      return await publicRequest.delete(
        `/thuoc_tiem/xoa_thuoc?ma_so_thuoc=${ma_so_thuoc}`
      );
    } catch (error) {
      console.log(error);
    }
  }
  async taoBenhNhan(record: any) {
    return await publicRequest.post("/benh_nhan/create", record);
  }
  async getBenhNhan() {
    return await publicRequest.get("/benh_nhan/get_all");
  }
  async editBenhNhan(record: any) {
    return await publicRequest.put("/benh_nhan/edit", record);
  }
  async timKiemBenhNhan(searchQuery: string) {
    return await publicRequest.get(
      `/benh_nhan/search?ten_benh_nhan=${searchQuery}`
    );
  }
  async taoBacSi(record: any) {
    return await publicRequest.post("/bac_si/create", record);
  }
  async getBacSi() {
    return await publicRequest.get("/bac_si/get_all");
  }
  async timKiemBacSi(searchQuery: string) {
    return await publicRequest.get(`/bac_si/search?ten_bac_si=${searchQuery}`);
  }
})();
