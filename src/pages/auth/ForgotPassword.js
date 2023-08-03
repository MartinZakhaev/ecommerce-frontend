import { useState, useEffect } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Layout, Input, Button, Form } from "antd";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const contentStyle = {
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
};

const Register = ({ history }) => {
  const { Item } = Form;
  const { Content } = Layout;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const onSubmitHandler = async (e) => {
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendPasswordResetEmail(email, config);
      setEmail("");
      setLoading(false);
      toast.success(`Email is sent to ${email}.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      history.push("/register/success");
    } catch (error) {
      setEmail("");
      setLoading(false);
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
    }
  };

  const registerForm = () => (
    <Content style={contentStyle}>
      <Form
        autoComplete="off"
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
            autoFocus
            placeholder="Enter your email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading || !email}
            style={{ minWidth: 250, maxWidth: 250 }}
          >
            Update password
          </Button>
        </Item>
      </Form>
    </Content>
  );

  return <Layout>{registerForm()}</Layout>;
};

export default Register;
