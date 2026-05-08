import { RouterProvider } from "react-router";
import routes from "./routers/routers";


function App() {
  return (
    <RouterProvider router={routes}></RouterProvider>
  );
}

export default App;
