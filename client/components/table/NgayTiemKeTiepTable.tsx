import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import styled from "styled-components";
import callApiServices from "../../utils/callApiServices";
import { IThongKe, ITimeStamps } from "../../types";
import { compareAsc, format } from "date-fns";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IAna;
  index: number;
  children: React.ReactNode;
}

interface IAna extends ITimeStamps {
  _id: string;
  email_benh_nhan: string;
  ho_ten: string;
  id_benh_nhan: string;
  ngay_tiem_mui_ke_tiep: string;
  so_mui_con_thieu: string;
  so_mui_tiem: string;
  ten_thuoc: string;
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

const SoMuiDaTiemTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IAna[]>([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    callApiServices.getThongKe2().then((response) => setData(response.data));
  }, []);

  const sendEmail = async (record: any) => {
    console.log(record);
    try {
      await callApiServices
        .sendEmail({
          email: record.email_benh_nhan,
          id_benh_nhan: record.id_benh_nhan,
          ho_ten: record.ho_ten,
          ngay_tiem_mui_ke_tiep: format(
            new Date(record.ngay_tiem_mui_ke_tiep),
            "dd-MM-yyyy"
          ),
          ten_thuoc: record.ten_thuoc,
        })
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const columns = [
    {
      title: "ID b???nh nh??n",
      dataIndex: "id_benh_nhan",
      width: "80px",

      render: (_: any, record: IAna) => {
        return record.id_benh_nhan.substring(9, 13);
      },
    },
    {
      title: "T??n b???nh nh??n",
      dataIndex: "ho_ten",
      width: "100px",
    },
    {
      title: "T??n thu???c",
      dataIndex: "ten_thuoc",
      width: "100px",
    },
    {
      title: "Ng??y ti??m m??i k??? ti???p",
      dataIndex: "ngay_tiem_mui_ke_tiep",
      width: "100px",
      render: (_: any, record: IThongKe) => {
        return (
          <span
            style={
              compareAsc(new Date(), new Date(record.ngay_tiem_mui_ke_tiep)) >=
              0
                ? { color: "red" }
                : { color: "#1677FF" }
            }
          >
            {format(new Date(record.ngay_tiem_mui_ke_tiep), "dd-MM-yyyy")}
          </span>
        );
      },
    },
    {
      title: "H??nh ?????ng",
      dataIndex: "operation",
      width: "300px",
      render: (_: any, record: IThongKe) => {
        return (
          <span
            onClick={() => sendEmail(record)}
            style={{ color: "#1f28af", marginLeft: "8px", cursor: "pointer" }}
          >
            G???i email
          </span>
        );
      },
    },
  ];

  // const mergedColumns = columns.map((col) => {
  //   return {
  //     ...col,
  //     onCell: (record: IAna) => ({
  //       record,
  //       inputType: "text",
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       editing: isEditing(record),
  //     }),
  //   };
  // });

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
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        id="_id"
      />
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

export default SoMuiDaTiemTable;
