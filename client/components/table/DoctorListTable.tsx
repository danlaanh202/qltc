import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import styled from "styled-components";
import callApiServices from "../../utils/callApiServices";
import { IDoctor } from "../../types";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IDoctor;
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
  const [data, setData] = useState<IDoctor[]>([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    callApiServices.getBacSi().then((response) => setData(response.data));
  }, []);
  const isEditing = (record: IDoctor) => record.ma_dinh_danh === editingKey;

  const edit = (record: IDoctor) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.ma_dinh_danh);
  };
  const handleDelete = async (key: React.Key) => {
    try {
      await callApiServices.deleteBacsi(key as string).then((res) => {
        console.log(res?.data);
        const newData = data.filter((item) => item.ma_dinh_danh !== key);
        setData(newData);
      });
    } catch (error) {}
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IDoctor;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.ma_dinh_danh);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        setData(newData);
        setEditingKey("");
        await callApiServices.editBacSi(newData[index]).then((res) => {
          setData(newData);
          setEditingKey("");
        });
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
      title: "Tên bác sĩ",
      dataIndex: "ten_bac_si",
      width: "120px",
      editable: true,
      // fixed: "left",
    },
    {
      title: "Tuổi",
      dataIndex: "tuoi",
      width: "100px",
      editable: true,
    },
    {
      title: "Chức danh",
      dataIndex: "chuc_danh",
      editable: true,
      width: "100px",
    },
    {
      title: "Số điện thoại",
      dataIndex: "so_dien_thoai",
      width: "100px",
      editable: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      width: "250px",
      editable: true,
    },

    {
      title: "Hành động",
      dataIndex: "operation",
      width: "100px",

      render: (_: any, record: IDoctor) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.ma_dinh_danh)}
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
                  onConfirm={() => handleDelete(record.ma_dinh_danh)}
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
      onCell: (record: IDoctor) => ({
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
        // scroll={{ x: 1600 }}
        id="ma_dinh_danh"
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
