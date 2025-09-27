import { Route, Routes } from "react-router-dom";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ErrorPage from "./pages/admin/ErrorPage";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginSignup />} /> */}
      <Route path="/" element={<WebsiteRoutes />} />

      {/* Admin Dashboard */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<ErrorPage />} />

    </Routes>
  );
}

export default App;
