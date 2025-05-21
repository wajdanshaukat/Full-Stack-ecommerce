import { Routes, Route } from "react-router-dom";
import AppRoutes from "./router/router";


function App() {
  return (
    <Routes>
      <Route path= "/*" element={<AppRoutes />} />
    </Routes>
  );
}

export default App;
