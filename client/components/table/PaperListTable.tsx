import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import styled from "styled-components";
import callApiServices from "../../utils/callApiServices";
import { IPaper } from "../../types";
import { addDays, compareAsc, format } from "date-fns";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IPaper;
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

const PaperListTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IPaper[]>([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    callApiServices.getPhieuTiem().then((res) => setData(res.data));
  }, []);
  const isEditing = (record: IPaper) => record.id_phieu_tiem === editingKey;

  const edit = (record: IPaper) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id_phieu_tiem);
  };
  const handleDelete = async (key: React.Key) => {
    try {
      await callApiServices.deleteThuoc(key as string).then((res) => {
        console.log(res?.data);
        const newData = data.filter((item) => item.id_phieu_tiem !== key);
        setData(newData);
      });
    } catch (error) {}
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IPaper;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id_phieu_tiem);
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
      title: "Tên bệnh nhân",
      dataIndex: ["BenhNhan", "ho_ten"],
      width: "300px",
    },
    {
      title: "Thuốc tiêm",
      dataIndex: ["ThuocTiem", "ten_thuoc"],
      width: "150px",
    },
    {
      title: "Bác sĩ",
      dataIndex: ["BacSi", "ten_bac_si"],
      width: "200px",
    },
    {
      title: "Số mũi cần tiêm",
      dataIndex: ["ThuocTiem", "so_mui_can_tiem"],
      width: "200px",
    },
    {
      title: "Số mũi đã tiêm",
      dataIndex: "so_mui_da_tiem",
      width: "200px",
      editable: true,
    },
    {
      title: "Ngày tiêm",
      dataIndex: "ngay_tiem",
      width: "200px",
      render: (_: any, record: IPaper) => {
        return format(new Date(record.ngay_tiem), "dd-MM-yyyy");
      },
    },
    {
      title: "Ngày tiêm mũi kế tiếp",
      dataIndex: "so_ngay_tiem_mui_ke_tiep",
      width: "300px",

      render: (_: any, record: IPaper) => {
        return (
          <span
            style={
              compareAsc(
                new Date(),
                addDays(
                  new Date(record.ngay_tiem),
                  record.so_ngay_tiem_mui_ke_tiep
                )
              ) >= 0
                ? { color: "red" }
                : { color: "#1677FF" }
            }
          >
            {format(
              addDays(
                new Date(record.ngay_tiem),
                record.so_ngay_tiem_mui_ke_tiep
              ),
              "dd-MM-yyyy"
            )}
          </span>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      width: "300px",
      render: (_: any, record: IPaper) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id_phieu_tiem)}
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
                  onConfirm={() => handleDelete(record.id_phieu_tiem)}
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
      onCell: (record: IPaper) => ({
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
        id="id_phieu_tiem"
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

export default PaperListTable;
