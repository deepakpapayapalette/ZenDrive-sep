import { Route, Routes } from "react-router-dom";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ErrorPage from "./pages/admin/ErrorPage";
import WebsiteLayout from "./layouts/WebsiteLayout";
import LoginSignup from "./pages/admin/LoginSignup";



function App() {
  return (<>
    {/* <Route path="/" element={<LoginSignup />} /> */}
    <WebsiteLayout >
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </WebsiteLayout>

    <Routes>
      {/* <Route path="/" element={<LoginSignup />} /> */}
      {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>

  </>


  );
}

export default App;
