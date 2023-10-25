import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrap } from "../../styles/auth.styled";

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
    setError("");
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
      <Switcher>
        이미 계정이 있으신가요? <Link to='/login'>로그인 &rarr;</Link>
      </Switcher>
    </Wrap>
  );
}
