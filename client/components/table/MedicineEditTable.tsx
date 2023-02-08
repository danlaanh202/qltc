import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import styled from "styled-components";
import callApiServices from "../../utils/callApiServices";
import { IMedicine } from "../../types";

// interface Item {
//   key: string;
//   medicine_name: string;
//   medicine_amount: number;
//   medicine_price: string;
//   medicine_next: string;
//   so_mui_can_tiem: 11;
// }

// const originData: Item[] = [];
// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     medicine_name: `Edrward ${i}`,
//     medicine_amount: 32,
//     so_mui_can_tiem: 11,
//     medicine_price: `London Park no. ${i}`,
//     medicine_next: `London Park no. ${i}`,
//   });
// }
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IMedicine;
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
  const [data, setData] = useState<IMedicine[]>([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    callApiServices.getAllThuocTiem(setData);
  }, []);
  const isEditing = (record: IMedicine) => record.ma_so_thuoc === editingKey;

  const edit = (record: IMedicine) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.ma_so_thuoc);
  };
  const handleDelete = async (key: React.Key) => {
    try {
      await callApiServices.deleteThuoc(key as string).then((res) => {
        console.log(res?.data);
        const newData = data.filter((item) => item.ma_so_thuoc !== key);
        setData(newData);
      });
    } catch (error) {}
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IMedicine;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.ma_so_thuoc);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData[index]);
        await callApiServices
          .editThuoc(newData[index])
          .then((res) => console.log(res.data));
        setData(newData);
        setEditingKey("");
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
      title: "Tên thuốc tiêm",
      dataIndex: "ten_thuoc",
      width: "300px",
      editable: true,
    },
    {
      title: "Số lượng",
      dataIndex: "so_luong",
      width: "150px",
      editable: true,
    },
    {
      title: "Số mũi cần tiêm",
      dataIndex: "so_mui_can_tiem",
      editable: true,
      width: "200px",
    },
    {
      title: "Đơn giá",
      dataIndex: "don_gia",
      width: "200px",
      editable: true,
    },
    {
      title: "Số ngày tiêm mũi kế tiếp",
      dataIndex: "so_ngay_tiem_mui_ke_tiep",
      width: "300px",
      editable: true,
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      width: "300px",
      render: (_: any, record: IMedicine) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.ma_so_thuoc)}
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
                  onConfirm={() => handleDelete(record.ma_so_thuoc)}
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
      onCell: (record: IMedicine) => ({
        record,
        inputType: [
          "Số lượng",
          "Số mũi cần tiêm",
          "Đơn giá",
          "Số ngày tiêm mũi kế tiếp",
        ].includes(col.dataIndex)
          ? "number"
          : "text",
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
        id="ma_so_thuoc"
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

export default MedicineEditTable;
