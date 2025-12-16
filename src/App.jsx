import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Composition from "./pages/composition/Compositions.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Homepage from "./pages/homepage/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Login from "./pages/login/Login.jsx";
import SettingPage from "./pages/setting/SettingPage.jsx";
import User from "./pages/user/User.jsx";
import Legales from "./pages/legales/Legales.jsx";
import CGU from "./pages/cgu/CGU.jsx";
import Accessibility from "./pages/accessibility/Accessibility.jsx";
import NotFound from "./pages/notfound/NotFound.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserProvider.jsx";
import "./index.css";

function App() {
  return (
    <UserProvider>
      <div className='App'>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/compositions" element={<Composition />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<Admin />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
              <Route path="/user" element={<User />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["client", "admin"]} />}>
              <Route path="/user/settings" element={<SettingPage />} />
              </Route>
              <Route path="/legales" element={<Legales />} />
              <Route path="/cgu" element={<CGU />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}


export default App;
