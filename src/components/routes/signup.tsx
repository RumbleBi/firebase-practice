import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { styled } from "styled-components";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.div`
  font-weight: 600;
  color: tomato;
`;

export default function Signup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const submitSingup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      setIsLoading(true);

      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user);

      await updateProfile(credentials.user, {
        displayName: name,
      });

      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrap>
      <Title>Signup X</Title>
      <Form onSubmit={submitSingup}>
        <Input
          name='name'
          value={name}
          placeholder='Name'
          type='text'
          required
          onChange={handleUserInputs}
        />
        <Input
          name='email'
          value={email}
          placeholder='Email'
          type='email'
          required
          onChange={handleUserInputs}
        />
        <Input
          name='password'
          value={password}
          placeholder='Password'
          type='password'
          required
          onChange={handleUserInputs}
        />
        <Input type='submit' value={isLoading ? "Loading" : "Signup"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrap>
  );
}
