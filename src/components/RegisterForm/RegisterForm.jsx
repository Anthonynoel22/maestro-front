import { create } from "../../api/apiUser.js";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterForm.scss";
import { notify } from "../Toast/Toast.jsx";

function RegisterForm({ setUserHasAccount }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await create({ email, password });
            console.log("Inscription réussie", response);
            notify("Compte créé avec succès !");
            navigate("/login");
        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
            // alert("Erreur lors de la création du compte. Veuillez réessayer.");
            notify("Erreur lors de la création du compte. Veuillez réessayer.");
        }
    }

    function handleLogin(event) {
        event.preventDefault();
        setUserHasAccount(true);
    }

    return (
        <>
            <h2>Créer un compte</h2>
            <p>Les champs marqués d'un (*) sont obligatoires</p>
            <div className="register-form-container">
                <Form
                    className="register-form"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    {/* EMAIL */}
                    <Form.Group
                        className="register-form-item"
                        controlId="email"
                    >
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
                        className="register-form-item"
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

                    {/* CONFIRMATION MOT DE PASSE */}
                    <Form.Group
                        className="register-form-item"
                        controlId="confirmPassword"
                    >
                        <Form.Label>Confirmer le mot de passe</Form.Label>
                        <div className="password-wrapper">
                            <Form.Control
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirmez votre mot de passe"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                required
                            />
                            <span
                                className="show-password-btn"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? <EyeSlash /> : <Eye />}
                            </span>
                        </div>
                    </Form.Group>

                    <Button className="register-form-button" type="submit">
                        S'inscrire
                    </Button>
                </Form>

                <p>
                    Déjà un compte ?{" "}
                    <Link
                        className="register-link"
                        to="/login"
                        onClick={handleLogin}
                    >
                        Connectez-vous
                    </Link>
                </p>
            </div>
        </>
    );
}

export default RegisterForm;
