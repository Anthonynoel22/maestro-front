import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import "./RegisterForm.scss";
import { create } from "../../api/apiUser";

function RegisterForm({ setUserHasAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    create({ email, password, confirmPassword })
      .then((response) => console.log("Inscription réussie", response))
      .catch((error) => console.error("Inscription échouée", error));
  }

  function handleLogin(event) {
    event.preventDefault();
    setUserHasAccount(true);
  }

  return (
    <div className="register-wrapper">
      <div className="header-register">
        <h2>Créer un compte</h2>
        <p>Les champs marqués d'un astérisque (*) sont obligatoires</p>
      </div>

      <Container className="register-container">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form method="post" onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Adresse-mail *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre adresse-mail"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3 password-wrapper">
                <Form.Label>Mot de passe *</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="link"
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </Button>
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-3 password-wrapper">
                <Form.Label>Confirmer le mot de passe *</Form.Label>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmer votre mot de passe"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  variant="link"
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </Button>
              </Form.Group>

              <div className="form-actions">
                <Button type="submit" className="rounded-btn">
                  S'inscrire
                </Button>
            <p >
              Déjà un compte ? <Button onClick={handleLogin}>Connexion</Button>
            </p>
              </div>
            </Form>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterForm;
