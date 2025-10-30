import { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";

function Login() {

    // LES COMPOSANTS QUI SERONT SUR LA PAGE:

    // Se connecter
    // => LoginForm
    // S'inscrire
    // => RegisterForm

    const [userHasAccount, setUserHasAccount] = useState(true);

    useEffect(() => {
        console.log("onClick");
    }, [userHasAccount])

    return (
        <>
            <h1>Login</h1>
            {userHasAccount ? 
            <LoginForm setUserHasAccount={setUserHasAccount}/>
            : <RegisterForm setUserHasAccount={setUserHasAccount}/>}
            
        </>
    )
}

export default Login;