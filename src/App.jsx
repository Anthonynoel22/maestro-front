import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import Description from "./components/Description/Description";
// import PreviewList from "./components/PreviewList/PreviewList.jsx";
// import ProjectForm from "./components/ProjectForm/ProjectForm.jsx";
// import ClientList from "./components/ClientList/ClientList.jsx";
// import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Composition from "./pages/composition/Compositions.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Homepage from "./pages/homepage/Home.jsx";
import Login from "./pages/login/Login.jsx";
import SettingPage from "./pages/setting/SettingPage.jsx";
// import Setting from "./pages/setting/Setting.jsx";
import User from "./pages/user/User.jsx";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Register from "./pages/register/Register.jsx";
import "./index.css";
import { useState } from "react";
import UserContext from "./UserContext.jsx";

function App() {

  // il faudrait créer le contexte userIs (visiteur/client/admin)

  const [userIs, setUserIs] = useState('visitor');


//     return (
//         <div className="App">
//             <Header />
//             <main>
//                 <Register/> 
// {/*                  <Description />
//                 <ProjectForm />
//                 <PreviewList /> */}
//                 {/* <ClientList /> */}
//                 <LoginForm />
//                 <Setting />
//             </main>
//             <Footer />
//         </div>
//     );
    
//   }
  
  
  return (
    <UserContext.Provider value={userIs}>
    <div className='App'>
      <BrowserRouter>
        
        <Header />
        <main>

            <Routes>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/compositions" element={<Composition />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/login" element={<Login />}></Route>
              {/* <Route path="" element={<Register />}></Route>  */}
              <Route path="/user/settings" element={<SettingPage />}></Route>
              <Route path="/user" element={<User />}></Route>
            </Routes>

        </main>
        <Footer />
          
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );

}
export default App;
