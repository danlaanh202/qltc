import { SetStateAction } from "react";
import { Dispatch } from "react";

export type SetStateType<S, T> = {
  S: Dispatch<SetStateAction<T>>;
};
export interface ITimeStamps {
  createdAt?: string;
  updatedAt?: string;
}
export interface IMedicine extends ITimeStamps {
  ma_so_thuoc: string;
  ten_thuoc: string;
  so_luong: number;
  so_mui_can_tiem: number;
  so_ngay_tiem_mui_ke_tiep: number;
}
export interface IPatient extends ITimeStamps {
  id_benh_nhan: string;
  ho_ten: string;
  can_cuoc: string;
  ngay_sinh: string;
  so_dien_thoai: string;
  gioi_tinh: string;
  email: string;
  dia_chi: string;
}
export interface IDoctor extends ITimeStamps {
  ma_dinh_danh: string;
  ten_bac_si: string;
  tuoi: number;
  chuc_danh: string;
  so_dien_thoai: string;
}

export interface IPaper extends ITimeStamps {
  id_phieu_tiem: string;
  id_benh_nhan: string;
  ma_dinh_danh: string;
  ma_so_thuoc: string;
  so_mui_da_tiem: number;
  ngay_da_tiem: Date;
  ngay_tiem: Date;
  so_ngay_tiem_mui_ke_tiep: number;
}
export interface IThongKe extends ITimeStamps {
  _id: string;
  id_benh_nhan: string;
  so_mui_tiem: number;
  ho_ten: string;
  ten_thuoc: string;
  so_mui_con_thieu: number;
  ngay_tiem_mui_ke_tiep: string;
}
