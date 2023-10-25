import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  margin-top: 20px;
  background-color: #fff;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GoogleBtn() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button onClick={handleGoogleLogin}>
      <Logo src='/google-logo.svg' />
      구글 로그인
    </Button>
  );
}
