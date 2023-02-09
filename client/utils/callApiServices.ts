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
  async timKiemThuocTiem(searchQuery: string) {
    return await publicRequest.get(
      `/thuoc_tiem/tim_kiem?ten_thuoc=${searchQuery}`
    );
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
  async editBacSi(record: any) {
    return await publicRequest.put("/bac_si/edit", {
      ma_dinh_danh: record.ma_dinh_danh,
      tuoi: parseInt(record.tuoi),
      chuc_danh: record.chuc_danh,
      so_dien_thoai: record.so_dien_thoai,
      dia_chi: record.dia_chi,
    });
  }
  async deleteBacsi(maDinhDanh: string) {
    return await publicRequest.delete(
      `/bac_si/delete?ma_dinh_danh=${maDinhDanh}`
    );
  }
  async timKiemBacSi(searchQuery: string) {
    return await publicRequest.get(`/bac_si/search?ten_bac_si=${searchQuery}`);
  }
  async taoPhieuTiem(record: any) {
    return await publicRequest.post("/phieu_tiem/create", record);
  }
  async getPhieuTiem() {
    return await publicRequest.get("/phieu_tiem/get");
  }
})();
