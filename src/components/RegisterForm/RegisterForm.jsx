import { create } from "../../api/apiUser.js";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./RegisterForm.scss";
import { notify } from "../Toast/Toast.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import DOMPurify from 'dompurify';


function RegisterForm({ setUserHasAccount }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&(),.?":{}|<>]).{8,}$/;

    const passwordPattern = `Au moins 8 caractères dont : 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial parmi : !@#$%^&(),.?"{}:|`;
    const infoCopyPassword = `Attention ! les deux mots de passes doivent être identiques`;

    function renderTooltip(tooltipMessage) {
        return (
            <Tooltip id="password-tooltip" {...tooltipMessage}>
                {tooltipMessage}
            </Tooltip>
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const cleanEmail = DOMPurify.sanitize(email);

        if (!regex.test(password)) {
            notify([
                "Mot de passe invalide : au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
            ]);
            return;
        }

        if (password !== confirmPassword) {
            notify("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await create({ email: cleanEmail, password });
            console.log("Inscription réussie", response);
            notify("Compte créé avec succès !");
            setUserHasAccount(true);
        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
            notify("Erreur lors de la création du compte. Veuillez réessayer.");
        }
    }

    function handleLogin(event) {
        event.preventDefault();
        setUserHasAccount(true);
    }

    return (
        <div className="register-form-global">
            <h1 className="register-form-headtitle">Créer un compte</h1>
            <p className="register-form-subtitle">
                Les champs marqués d'un (*) sont obligatoires
            </p>
            <div
                className="register-form-container"
                aria-label="Formulaire de création de compte"
            >
                <Form
                    className="register-form"
                    method="post"
                    onSubmit={handleSubmit}
                    aria-describedby="register-form-info"
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
                            aria-label="Adresse e-mail"
                        />
                    </Form.Group>

                    {/* MOT DE PASSE */}
                    <Form.Group
                        className="register-form-item"
                        controlId="password"
                    >
                        <Form.Label>Mot de passe</Form.Label>
                        <div className="password-wrapper">
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip(passwordPattern)}
                            >
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Entrez votre mot de passe"
                                    value={password}
                                    onChange={(event) =>setPassword(event.target.value)}
                                    required
                                    aria-label="Mot de passe"
                                    aria-describedby="password-description"
                                />
                            </OverlayTrigger>
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
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip(infoCopyPassword)}
                            >
                                <Form.Control
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirmez votre mot de passe"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    required
                                    aria-label="Confirmation du mot de passe"
                                    aria-describedby="confirm-password-description"
                                />
                            </OverlayTrigger>
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

                    <Button className="register-form-button" type="submit"aria-label="Valider l'inscription">
                        S'inscrire
                    </Button>
                </Form>

                <p className="register-text-link">
                    Déjà un compte ?{" "}
                    <Link
                        className="register-link"
                        to="/login"
                        onClick={handleLogin}
                        aria-label="Lien de connexion"
                    >
                        Connectez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;
