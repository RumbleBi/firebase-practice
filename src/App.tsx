import { styled } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "./globalStyles";
import { router } from "./components/routes/config";
import { useEffect, useState } from "react";
import Loading from "./components/loading";
import { auth } from "./firebase";

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Wrap>
      <GlobalStyles />
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </Wrap>
  );
}

export default App;
