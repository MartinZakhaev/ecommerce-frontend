import { useState, useEffect } from "react";
import {
  InfoCircleOutlined,
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Space, Button, Form } from "antd";
import { auth } from "../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup.string().email("Please enter a valid email address"),
  })
  .required();

const yupSync = {
  async validator({ field }, value) {
    await schema.validateSyncAt(field, { [field]: value });
  },
};

const RegisterComplete = ({ history }) => {
  const { Item } = Form;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (e) => {
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

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
      reset();
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
      reset();
      history.push("/register");
    }
    setEmail("");
    setPassword("");
  };

  const completeRegistrationForm = () => (
    <Form
      form={form}
      onFinish={handleSubmit(onSubmitHandler)}
      style={{ minWidth: 250, maxWidth: 250 }}
    >
      <Item name="email" rules={[yupSync]}>
        <Input
          value={email}
          placeholder="Enter your email"
          prefix={<MailOutlined className="site-form-item-icon" />}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Item>
      <Item name="password">
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
  );

  return (
    <div className="container d-flex min-vh-100 align-items-center justify-content-center">
      {completeRegistrationForm()}
    </div>
  );
};

export default RegisterComplete;
