import axios from "axios";
export const publicRequest = axios.create({
  baseURL: "http://localhost:4000",
});
export default new (class CallApiServices {
  async createThuocTiem(data: any) {
    await publicRequest.post("/thuoc_tiem/tao_thuoc_tiem", {
      ten_thuoc: data.medicine_name,
      so_luong: parseInt(data.medicine_amount),
      so_mui_can_tiem: parseInt(data.so_mui),
      so_ngay_tiem_mui_ke_tiep: parseInt(data.medicine_next),
      don_gia: parseInt(data.medicine_price),
    });
  }
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
  async getWithPagination(page: number) {
    return await publicRequest.get("/thuoc_tiem/get_with_pagination", {
      params: {
        limit: 10,
        offset: page * 10,
      },
    });
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
  async getBenhNhanWithPagination(page: number) {
    return await publicRequest.get("/benh_nhan/get_with_pagination", {
      params: {
        limit: 10,
        offset: 10 * page,
      },
    });
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
  async getThongKe() {
    return await publicRequest.get("/thong_ke/1");
  }
  async getThongKe2() {
    return await publicRequest.get("/thong_ke/2");
  }
  async sendEmail(data: any) {
    return await publicRequest.get("/thong_ke/send_email", {
      params: data,
    });
  }
})();
