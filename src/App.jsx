import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Description from "./components/Description/Description";
import PreviewList from "./components/PreviewList/PreviewList.jsx";
import ProjectForm from "./components/ProjectForm/ProjectForm.jsx";
import ClientList from "./components/ClientList/ClientList.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";

import "./index.css";
import Setting from "./pages/setting/Setting.jsx";

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                {/* <Description />
                <ProjectForm />
                <PreviewList /> */}
                {/* <ClientList />
                <LoginForm /> */}
                <Setting />
            </main>
            <Footer />
        </div>
    );
}

export default App;
