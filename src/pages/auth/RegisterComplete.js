import { useState, useEffect } from "react";
import {
  CheckOutlined,
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Layout, Input, Button, Form } from "antd";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";

const contentStyle = {
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
};

const RegisterComplete = ({ history }) => {
  const { Item } = Form;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const onSubmitHandler = async (e) => {
    setLoading(true);

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        history.push("/");
      }
      toast.success(`Registration complete`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    } catch (error) {
      toast.error("Oops something went wrong, please try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      history.push("/register");
    }
    setEmail("");
    setPassword("");
  };

  const completeRegistrationForm = () => (
    <Content style={contentStyle}>
      <Form
        form={form}
        style={{ minWidth: 250, maxWidth: 250 }}
        onFinish={onSubmitHandler}
      >
        <Item
          name="email"
          rules={[
            { required: true, message: "Email address required" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
          hasFeedback
        >
          <Input
            value={email}
            placeholder="Enter your email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Item>
        <Item
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
            { max: 8, message: "Password max characters is 8" },
          ]}
          hasFeedback
        >
          <Input.Password
            autoFocus
            placeholder="Enter your password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Item>
        <Item
          name="passwordConfirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            { min: 6, message: "Password must be at least 6 characters" },
            { max: 8, message: "Password max characters is 8" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Passwords that you entered does not match"
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            autoFocus
            placeholder="Confirm your password"
            prefix={<CheckOutlined className="site-form-item-icon" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Item>
        <Item name="submitButton">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading || !email}
            style={{ minWidth: 250, maxWidth: 250 }}
          >
            Complete registration
          </Button>
        </Item>
      </Form>
    </Content>
  );

  return <Layout>{completeRegistrationForm()}</Layout>;
};

export default RegisterComplete;
