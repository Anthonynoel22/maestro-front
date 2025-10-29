import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Description from '../../components/Description/Description.jsx';

function Home() {



    return (
        <>
            <Link to="/compositions">Compositions</Link>

            <h1>Home</h1>
            <Description />
        </>
    )
}

export default Home;