import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  PaginationProps,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import styled from "styled-components";
import callApiServices from "../../utils/callApiServices";
import { IPatient } from "../../types";
import { useRouter } from "next/router";
import useSnackbar from "../../hooks/useSnackbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IPatient;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const MedicineEditTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IPatient[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const onChange: PaginationProps["onChange"] = (_page) => {
    router.push(`/patient_management/list?page=${_page}`);
  };
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();

  useEffect(() => {
    callApiServices.getBenhNhanWithPagination(page).then((response) => {
      setData(response.data.rows);
      setTotal(response.data.count);
    });
  }, [page]);
  useEffect(() => {
    setPage((parseInt(router.query.page) - 1) | 0);
  }, [router]);
  const isEditing = (record: IPatient) => record.id_benh_nhan === editingKey;

  const edit = (record: IPatient) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id_benh_nhan);
  };
  const handleDelete = async (key: React.Key) => {
    try {
      await callApiServices.deleteThuoc(key as string).then((res) => {
        console.log(res?.data);
        const newData = data.filter((item) => item.id_benh_nhan !== key);
        setData(newData);
      });
    } catch (error) {}
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IPatient;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id_benh_nhan);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        await callApiServices
          .editBenhNhan(newData[index])
          .then((res) => {
            console.log(res.data);
            setData(newData);
            setEditingKey("");
            handleShow("S???a th??nh c??ng", "success");
          })
          .catch((err) => handleShow("C?? l???i x???y ra", "error"));
        console.log(newData[index]);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "T??n b???nh nh??n",
      dataIndex: "ho_ten",
      width: "120px",
      editable: true,
      fixed: "left",
    },
    {
      title: "C??n c?????c",
      dataIndex: "can_cuoc",
      width: "100px",
      editable: true,
    },
    {
      title: "Ng??y sinh",
      dataIndex: "ngay_sinh",
      editable: true,
      width: "100px",
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "so_dien_thoai",
      width: "100px",
      editable: true,
    },
    {
      title: "Gi???i t??nh",
      dataIndex: "gioi_tinh",
      width: "60px",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "200px",
      editable: true,
    },
    {
      title: "?????a ch???",
      dataIndex: "dia_chi",
      width: "200px",
      editable: true,
    },
    {
      title: "H??nh ?????ng",
      dataIndex: "operation",
      width: "100px",
      fixed: "right",
      render: (_: any, record: IPatient) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id_benh_nhan)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <>
              {data.length >= 1 ? (
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(record.id_benh_nhan)}
                >
                  <a style={{ color: "red", marginLeft: "8px" }}>Delete</a>
                </Popconfirm>
              ) : null}
            </>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IPatient) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <StyledTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: onChange,
          current: page + 1,
          total: total,
        }}
        scroll={{ x: 1600 }}
        id="id_benh_nhan"
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </Form>
  );
};
const StyledTable = styled(Table)`
  .ant-pagination-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default MedicineEditTable;
