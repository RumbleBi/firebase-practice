import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import { router } from "./components/routes/config";

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
