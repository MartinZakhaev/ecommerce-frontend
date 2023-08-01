import { useState } from "react";
import { InfoCircleOutlined, MailOutlined } from "@ant-design/icons";
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

const Register = () => {
  const { Item } = Form;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

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
      window.localStorage.setItem(
        "emailForRegistration",
        JSON.stringify(email)
      );
      setEmail("");
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
      reset();
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
      reset();
      setLoading(false);
    }
  };

  const registerForm = () => (
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
      {/* </Space> */}
    </Form>
  );

  return (
    <div className="container d-flex min-vh-100 align-items-center justify-content-center">
      {registerForm()}
    </div>
  );
};

export default Register;
