import "./LoginForm.scss";
import { loginUser } from "../../api/apiUser.js";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

function LoginForm({setUserHasAccount}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handelSubmit(event) {
        event.preventDefault();
        const loginData = { email: email, password: password };
        loginUser(loginData);
    }

    function handleRegister(event) {
        event.preventDefault();
        setUserHasAccount(false);
    }

    return (
        <>
            <Form
                className="login-form"
                method="post"
                onSubmit={(event) => handelSubmit(event)}
            >
                {/* EMAIL */}
                <Form.Group
                    className="login-form-item login-form-item-email"
                    controlId="email"
                >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className="login-form-email-input"
                        type="email"
                        placeholder="Entrez votre adresse mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>

                {/* MOT DE PASSE */}
                <Form.Group
                    className="login-form-item login-form-item-password"
                    controlId="password"
                >
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        className="login-form-password-input"
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
                <Button
                    className="login-form-button"
                    variant="login-form-button"
                    type="submit"
                >
                    Se connecter
                </Button>
            </Form>
                <p>Pas encore de compte ? Veuillez vous <Button onClick={handleRegister}>Inscrire</Button></p>
        </>
    );
}

export default LoginForm;
