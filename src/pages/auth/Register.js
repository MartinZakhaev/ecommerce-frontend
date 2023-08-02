import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Layout, Input, Button, Form } from "antd";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

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

  const onSubmitHandler = async (e) => {
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);
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
      setLoading(false);
      history.push("/register/success");
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
    }
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
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
            Register
          </Button>
        </Item>
      </Form>
    </Content>
  );

  return <Layout>{registerForm()}</Layout>;
};

export default Register;
