import axios from "axios";
import { useEffect, useState } from "react";

export default function useVNAddress() {
  const [provincesList, setProvincesList] = useState<any[]>([]);
  const [selectProvince, setSelectProvince] = useState();
  const [districtsList, setDistrictsList] = useState<any[]>([]);
  const [selectDistrict, setSelectDistrict] = useState();
  const [wardsList, setWardsList] = useState<any[]>([]);
  const [selectWard, setSelectWard] = useState();
  useEffect(() => {
    const getProvinces = async () => {
      try {
        await axios
          .get("https://provinces.open-api.vn/api/")
          .then((response) => {
            setProvincesList(response.data);
          });
      } catch (error) {}
    };
    getProvinces();
  }, []);
  useEffect(() => {
    const getDistricts = async () => {
      try {
        await axios
          .get(`https://provinces.open-api.vn/api/p/${selectProvince.code}`, {
            params: {
              depth: 2,
            },
          })
          .then((response) => {
            setDistrictsList(response.data.districts);
          });
      } catch (error) {}
    };
    if (selectProvince?.code) {
      getDistricts();
    }
  }, [selectProvince]);
  useEffect(() => {
    const getWards = async () => {
      try {
        await axios
          .get(`https://provinces.open-api.vn/api/d/${selectDistrict.code}`, {
            params: {
              depth: 2,
            },
          })
          .then((response) => {
            setWardsList(response.data.wards);
          });
      } catch (error) {}
    };
    if (selectDistrict?.code) {
      getWards();
    }
  }, [selectDistrict]);
  return [
    provincesList,
    setProvincesList,
    selectProvince,
    setSelectProvince,
    districtsList,
    setDistrictsList,
    selectDistrict,
    setSelectDistrict,
    wardsList,
    setWardsList,
    selectWard,
    setSelectWard,
  ];
}
