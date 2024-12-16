import { Button, Card, Checkbox, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../constants/colors";
import handleAPI from "../../apis/handleAPI";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";
import { localDataNames } from "../../constants/appInfos";

const { Title, Paragraph } = Typography;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const res: any = await handleAPI("/auth/login", values, "post");
      res.data && dispatch(addAuth(res.data));
      message.success(res.message);
      if (isRemember) {
        localStorage.setItem(localDataNames.authData, JSON.stringify(res.data));
      }
      setIsLoading(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card loading={isLoading}>
      <div className="text-center">
        <img
          src="https://png.pngtree.com/png-vector/20210508/ourlarge/pngtree-thermometer-for-measuring-air-temperature-png-image_3258122.jpg"
          alt="logo"
          style={{ width: 48, height: 48 }}
          className="mb-3"
        />
        <Title level={2}>Login to your account</Title>
        <Paragraph type="secondary">
          Welcome back! Please enter your details.
        </Paragraph>
      </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleLogin}
        disabled={isLoading}
        size="large"
      >
        <Form.Item
          name={"username"}
          label={"Username"}
          rules={[{ required: true, message: "Please enter your username!!!" }]}
        >
          <Input placeholder="Enter your username" allowClear maxLength={100} />
        </Form.Item>
        <Form.Item
          name={"password"}
          label={"Password"}
          rules={[{ required: true, message: "Please enter your password!!!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            maxLength={100}
            type="password"
          />
        </Form.Item>
      </Form>

      <div className="row">
        <div className="col">
          <Checkbox
            checked={isRemember}
            onChange={(e) => setIsRemember(e.target.checked)}
          >
            Remember for 30 days
          </Checkbox>
        </div>
        <div className="col text-right">
          <Link style={{ color: colors.primary500 }} to="/forgot-password">
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="mt-4 mb-3">
        <Button
          onClick={() => form.submit()}
          type="primary"
          style={{ width: "100%", background: colors.primary500 }}
          size="large"
        >
          Login
        </Button>
      </div>
    </Card>
  );
}
