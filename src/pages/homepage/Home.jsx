import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {



    return (
        <>
            <Link to="/compositions">Compositions</Link>

            <h1>Home</h1>
        </>
    )
}

export default Home;