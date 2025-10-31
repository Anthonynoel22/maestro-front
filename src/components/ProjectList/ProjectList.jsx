import { Card, Badge, Row, Col } from "react-bootstrap";
import { getAllProjectList } from "../../api/apiProjectList.js";
import { useState, useEffect } from "react";

function ProjectList() {
    // projectList est un tableau vide contenant tous les projets
    const [projectList, setProjectList] = useState([]);

    // je récupère les projets dans l'API coté back
    async function getProjects() {
        // l'api me renvoie la liste des projets
        const allProjects = await getAllProjectList();
        // les projets se mettent dans le usestate pour les afficher
        setProjectList(allProjects);
    }

    // je récupère les projets dans l'API coté back
    async function getProjects() {
        // l'api me renvoie la liste des projets
        const allProjects = await getAllProjectList();
        // les projets se mettent dans le usestate pour les afficher
        setProjectList(allProjects);
    }

    // useeffect s'exécute quand le composant apparait sur la page
    useEffect(() => {
        // quand le composant s'affiche, je lance ma fonction getProjects()
        // pour aller chercher les projets dans l'API
        getProjects();
    }, []);

    return (
        <div className="title__container">
            <h3 className="title">Projets en cours</h3>
            {projectList.map((project) => (
                <Card
                    key={project.id}
                    className="border border-primary rounded-3 shadow-sm"
                    style={{
                        backgroundColor: "#f8f5e4",
                        maxWidth: "400px",
                        borderWidth: "2px",
                    }}
                >
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundColor: "#a3c1b0",
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "15px",
                                    }}
                                ></div>
                            </Col>

                            <Col className="text-center">
                                <Badge
                                    pill
                                    style={{
                                        backgroundColor: "#a3c1b0",
                                        color: "black",
                                        fontSize: "0.9rem",
                                    }}
                                    className="mb-2 d-block"
                                >
                                    {project.name}
                                </Badge>

                                <Badge
                                    pill
                                    style={{
                                        backgroundColor: "#a3c1b0",
                                        color: "black",
                                        fontSize: "0.9rem",
                                    }}
                                    className="mb-2 d-block"
                                >
                                    {project.status}
                                </Badge>

                                <Badge
                                    pill
                                    style={{
                                        backgroundColor: "#a3c1b0",
                                        color: "black",
                                        fontSize: "0.9rem",
                                    }}
                                    className="d-block"
                                >
                                    {project.deadline}
                                </Badge>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default ProjectList;
