import { useState } from "react";
import {
  InfoCircleOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Space, Button } from "antd";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <Space direction="vertical">
        <Input
          placeholder="Enter your email"
          prefix={<MailOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter your valid email address">
              <InfoCircleOutlined
                style={{
                  color: "rgba(0,0,0,.45)",
                }}
              />
            </Tooltip>
          }
          autoComplete=""
        />
        <Input.Password
          placeholder="Enter your password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Button
          type="primary"
          loading={loading}
          onClick={() => setLoading(true)}
        >
          Login
        </Button>
      </Space>
    </form>
  );

  return (
    <div className="container d-flex min-vh-100 align-items-center justify-content-center">
      {registerForm()}
    </div>
  );
};

export default Login;
