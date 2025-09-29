import { Route, Routes } from "react-router-dom";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ErrorPage from "./pages/admin/ErrorPage";
import WebsiteLayout from "./layouts/WebsiteLayout";


function App() {
  return (<>
    {/* <Route path="/" element={<LoginSignup />} /> */}
    <WebsiteLayout >
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
      </Routes>
    </WebsiteLayout>
    <Routes>

      {/* Admin Dashboard */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}

    </Routes>

  </>


  );
}

export default App;
