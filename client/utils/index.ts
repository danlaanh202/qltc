import axios from "axios";

export const publicRequest = axios.create({
  baseURL: "http://localhost:4000",
});
export const getAge = (dob: any) => {
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
export const addDays = (date: any, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
export const filterList = [
  "Tiền sử rõ ràng phản vệ với vaccine phòng COVID 19",
  "Đang mắc bệnh cấp tính",
  "Phụ nữ mang thai",
  "Phản vệ độ 3 trở lên với bất kỳ nguyên nhân nào",
];
