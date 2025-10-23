/* import Header from './components/Header/Header.jsx' */
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Description from "./components/Description/Description";
import PreviewList from "./components/PreviewList/PreviewList.jsx";
import ClientList from "./components/ClientList/ClientList.jsx";

import "./index.css";

function App() {
    return (
        <div className="App">
            {/* <Header /> */}
            <Header />
            <main>
                {/* <Description /> */}
                {/* <PreviewList /> */}
                <ClientList />
            </main>
            <Footer />
        </div>
    );
}

export default App;
