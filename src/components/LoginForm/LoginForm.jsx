import { loginUser } from "../../api/apiUser.js";
import { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import UserContext from "../../UserContext.jsx";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";

function LoginForm({ setUserHasAccount }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { loginProvider } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const loginData = { email, password };

        try {
            const userInfo = await loginUser(loginData);
            if (userInfo) {
                console.log("userInfo", userInfo);
                loginProvider(userInfo.user.role);
                navigate("/");
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);
            alert("Échec de la connexion. Vérifiez vos identifiants.");
        }
    }

    function handleRegister(event) {
        event.preventDefault();
        setUserHasAccount(false);
    }

    return (
        <>
            <h2>Connexion</h2>
            <div className="login-form-container">
                <Form
                    className="login-form"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    {/* EMAIL */}
                    <Form.Group className="login-form-item" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Entrez votre adresse mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* MOT DE PASSE */}
                    <Form.Group
                        className="login-form-item"
                        controlId="password"
                    >
                        <Form.Label>Mot de passe</Form.Label>
                        <div className="password-wrapper">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                            />
                            <span
                                className="show-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeSlash /> : <Eye />}
                            </span>
                        </div>
                    </Form.Group>

                    <Button className="login-form-button" type="submit">
                        Se connecter
                    </Button>
                </Form>

                <p>
                    Pas encore de compte ?{" "}
                    <Link
                        className="login-link"
                        to="/register"
                        onClick={handleRegister}
                    >
                        Inscrivez-vous
                    </Link>
                </p>
            </div>
        </>
    );
}

export default LoginForm;
