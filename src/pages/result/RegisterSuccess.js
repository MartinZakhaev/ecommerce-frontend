import { SmileOutlined } from "@ant-design/icons";
import { Layout, Button, Result } from "antd";

const contentStyle = {
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
};

const RegisterSuccess = ({ history }) => {
  const { Content } = Layout;

  const onClickHandler = () => {
    history.push("/login");
  };

  const registerSuccess = () => (
    <Content style={contentStyle}>
      <Result
        status="success"
        title="Great, you have successfully registered your email address!"
        subTitle="Please check your inbox and click the link provided to confirm your email address"
        extra={
          <Button type="primary" onClick={onClickHandler}>
            Go to login page
          </Button>
        }
      />
    </Content>
  );

  return <Layout>{registerSuccess()}</Layout>;
};
export default RegisterSuccess;
