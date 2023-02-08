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
