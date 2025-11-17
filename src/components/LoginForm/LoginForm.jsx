import { loginUser } from "../../api/apiUser.js";
import { useState, useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import UserContext from "../../UserContext.jsx";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";

function LoginForm({ setUserHasAccount }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // il va falloir appeler le userContext, res.data.user(.role)
    const { loginProvider } = useContext(UserContext);
    const navigate = useNavigate();

    async function handelSubmit(event) {
        event.preventDefault();
        const loginData = { email: email, password: password };
        const userInfo = await loginUser(loginData);
        if (userInfo) {
            console.log("userInfo ", userInfo);
            loginProvider(userInfo.user.role);
        }
        navigate("/"); // redirection vers la page d'accueil après connexion
    }

    function handleRegister(event) {
        event.preventDefault();
        setUserHasAccount(false);
    }

    return (
        <>
            <div className="login-item">
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
                        <InputGroup>
                            <Form.Control
                                className="login-form-password-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                                className="login-form-eye-button"
                            >
                                {showPassword ? <EyeSlash /> : <Eye />}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Button
                        className="login-form-button"
                        variant="login-form-button"
                        type="submit"
                    >
                        Se connecter
                    </Button>
                </Form>
                <p className="inscription-item">
                    Pas encore de compte ? Veuillez vous{" "}
                    <Button onClick={handleRegister}>Inscrire</Button>
                </p>
            </div>
        </>
    );
}

export default LoginForm;
