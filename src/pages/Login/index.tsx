import { useState, ChangeEvent, FormEvent } from "react";
import {
  Wrapper,
  LoginContainer,
  LoginButton,
  TitleContainer,
  FormContainer,
  Title,
} from "./styles.js";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import { swalAlert } from "../../utils/helpers";
import { useApp } from "../../contexts";
import { SharedApi } from "../../libs/api/sharedapi";

const Login = () => {
  const navigate = useNavigate();
  const { setauthToken } = useApp() || {};
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormData = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await SharedApi?.login(formData);
      localStorage.setItem("token", res.authToken);
      swalAlert("Login Successfully");
      setauthToken?.(res.authToken);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error(error);
      swalAlert("Invalid Email or Password", "error");
    }
  };

  return (
    <Wrapper>
      <LoginContainer>
        <TitleContainer>
          <Title>LOGIN</Title>
        </TitleContainer>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleFormData}
          />
          <Input
            name="password"
            type="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleFormData}
          />
          <LoginButton type="submit">Login</LoginButton>
        </FormContainer>
      </LoginContainer>
    </Wrapper>
  );
};

export default Login;
