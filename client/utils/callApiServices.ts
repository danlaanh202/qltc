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
})();
