import { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrap } from "../../styles/auth.styled";
import GithubBtn from "../githubBtn";
import GoogleBtn from "../googleBtn";

export default function Signup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const submitSingup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrap>
      <Title>Login X</Title>
      <Form onSubmit={submitSingup}>
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
        <Input type='submit' value={isLoading ? "Loading" : "Login"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없으신가요? <Link to='/signup'>회원가입 &rarr;</Link>
      </Switcher>
      <GithubBtn />
      <GoogleBtn />
    </Wrap>
  );
}
