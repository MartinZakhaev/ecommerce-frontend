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
    }
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const completeRegistrationForm = () => (
    <Form
      form={form}
      onFinish={handleSubmit(onSubmitHandler)}
      style={{ minWidth: 250, maxWidth: 250 }}
    >
      {/* <Space direction="vertical"> */}
      <Item name="email" rules={[yupSync]}>
        <Input
          placeholder="Enter your email"
          prefix={<MailOutlined className="site-form-item-icon" />}
          // suffix={
          //   <Tooltip title="Enter your valid email address">
          //     <InfoCircleOutlined
          //       style={{
          //         color: "rgba(25,0,0,.45)",
          //       }}
          //     />
          //   </Tooltip>
          // }
          value={email}
        />
      </Item>
      <Item>
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
      <Item>
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
      {/* </Space> */}
    </Form>
  );

  return (
    <div className="container d-flex min-vh-100 align-items-center justify-content-center">
      {completeRegistrationForm()}
    </div>
  );
};

export default RegisterComplete;
