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
export interface IDoctor extends ITimeStamps {}
