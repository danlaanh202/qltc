import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import styled from "styled-components";
import callApiServices from "../../utils/callApiServices";
import { IThongKe } from "../../types";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IThongKe;
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

const SoMuiDaTiemTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IThongKe[]>([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    callApiServices.getThongKe().then((response) => setData(response.data));
  }, []);
  useEffect(() => {
    // );
    console.log(
      data.reduce((acc, obj) => {
        let exist = acc.find(
          ({ id_benh_nhan, ten_thuoc }) =>
            obj.id_benh_nhan === id_benh_nhan && obj.ten_thuoc === ten_thuoc
        );
        if (!exist) acc.push(obj);
        return acc;
      }, [])
    );
  }, [data]);
  const isEditing = (record: IThongKe) => record.id_benh_nhan === editingKey;

  const cancel = () => {
    setEditingKey("");
  };

  const columns = [
    {
      title: "ID bệnh nhân",
      dataIndex: "id_benh_nhan",
      width: "80px",

      render: (_: any, record: IThongKe) => {
        return record.id_benh_nhan.substring(9, 13);
      },
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "ho_ten",
      width: "100px",
    },
    {
      title: "Tên thuốc",
      dataIndex: "ten_thuoc",
      width: "100px",
    },
    {
      title: "Số mũi tiêm",
      dataIndex: "so_mui_tiem",
      width: "100px",
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IThongKe) => ({
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
          onChange: cancel,
        }}
        id="id_benh_nhan"
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
