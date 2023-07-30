import { useState } from "react";
import {
  InfoCircleOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Space, Button } from "antd";

const Register = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
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
          Register
        </Button>
      </Space>
    </div>
  );
};

export default Register;
