import { DatePicker, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import handleAPI from "../apis/handleAPI";

interface Props {
  visible: boolean;
  onclose: () => void;
  onAddNew: (val: any) => void;
}

const AddTemperatureModal = (props: Props) => {
  const { visible, onclose, onAddNew } = props;
  const [isloading] = useState(false);

  const [form] = Form.useForm();

  const handleAdd = async (values: any) => {
    try {
      const res: any = await handleAPI("/temperature/add-new", values, "post");
      message.success(res.message);
      onAddNew(res.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    onclose();
  };

  return (
    <Modal
      title="Add Temperature"
      onCancel={handleCancel}
      onClose={handleCancel}
      okButtonProps={{ loading: isloading }}
      onOk={() => form.submit()}
      open={visible}
    >
      <Form
        layout="vertical"
        size="large"
        disabled={isloading}
        form={form}
        onFinish={handleAdd}
      >
        <Form.Item
          name="DeviceID"
          label="DeviceID"
          rules={[{ required: true, message: "Enter DeviceID" }]}
        >
          <Input allowClear placeholder="Enter DeviceID" />
        </Form.Item>

        <Form.Item
          name="Temperatured"
          label="Temperatured"
          rules={[{ required: true, message: "Enter temperatured" }]}
        >
          <Input allowClear placeholder="Enter temperatured" />
        </Form.Item>
        <Form.Item
          name="DateTime"
          label="DateTime"
          rules={[{ required: true, message: "Enter DateTime" }]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTemperatureModal;
