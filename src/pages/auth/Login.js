import { useState, useEffect } from "react";
import {
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Layout, Input, Button, Form } from "antd";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Content } from "antd/es/layout/layout";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const contentStyle = {
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
};

const Login = ({ history }) => {
  const { Item } = Form;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const onSubmitHandler = async (e) => {
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: { email: user.email, token: idTokenResult.token },
      });
      toast.success(`Welcome ${user.email}`, {
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
      history.push("/");
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
    setEmail("");
    setPassword("");
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });
        toast.success(`Welcome ${user.email}`, {
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
        history.push("/");
      })
      .catch((error) => {
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
      });
  };

  const loginForm = () => (
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
            autoFocus
            value={email}
            placeholder="Enter your email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Item>
        <Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
          hasFeedback
        >
          <Input.Password
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
            Login
          </Button>
        </Item>
        <Item>
          <Button
            danger
            type="primary"
            loading={loading}
            disabled={loading}
            style={{ minWidth: 250, maxWidth: 250 }}
            onClick={googleLogin}
          >
            Login with google
          </Button>
        </Item>
        {/* <Item style={{ marginLeft:"auto" }}> */}
        <Link style={{ textDecoration: "none" }} to="/forgot/password">
          Forgot password
        </Link>
        {/* </Item> */}
      </Form>
    </Content>
  );

  return <Layout>{loginForm()}</Layout>;
};

export default Login;
