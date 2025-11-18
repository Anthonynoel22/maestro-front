import { Card, Badge, Row, Col, Button } from "react-bootstrap";
import { getAllProjectList, getFilteredProjectList } from "../../api/apiProjectList.js";
import { getAllAdminProjects, getFilteredAdminProjects, updateProjectStatus, deleteProject  } from "../../api/apiProjectList.js";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext.jsx";
import Form from 'react-bootstrap/Form';
import "./ProjectList.scss";
import { Trash } from "react-bootstrap-icons";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';



function ProjectList() {
    // permet de gérer l'affichage de la liste de mes projets et leur status
    const [projectList, setProjectList] = useState([]); // Liste des projets affichés
    const [projectFilter, setProjectFilter] = useState (''); // Filtre appliqué aux projets
    const [statusList, setStatusList] = useState ([]); // Liste des statuts disponibles
    const [newStatus, setNewStatus] = useState (''); 

    
    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    // je récupère le rôle user dans le UserContext
    const {userIs,refreshList, desactiveRefreshProjectList} = useContext(UserContext);
    console.log('role après context', userIs);

    const navigate = useNavigate();


    // je récupère les projets dans l'API coté back (Lister tous les projects)
    async function getProjects() {
        if (userIs === 'visitor') {
            navigate("/");   
        }
        if (userIs === 'client'){ 
            // l'api me renvoie la liste des projets (si USER)
            const result = await getAllProjectList();
            setStatusList (result.Liststatus);
                // les projets se mettent dans le usestate pour les afficher
            setProjectList(result.projects);
        } else { 
            // sinon l'api me renvoie la liste des projets ADMIN
            const result = await getAllAdminProjects();
            setStatusList (result.Liststatus);
                // les projets se mettent dans le usestate pour les afficher
            setProjectList(result.projects);
        }
    }


    // je récupère les status du projet dans l'API coté back (Trier les projets par filtre)
    async function getStatusProject(status) {
        // l'api me renvoie les projets filtrés suivant le status choisis (si USER)
        if (userIs === 'client'){ 
            const result  = await getFilteredProjectList(status);
            console.log("client:",result.projects);
            // je mets la liste filtrés dans le usestate pour les afficher
            setProjectList(result.projects);
        } else {
            const result  = await getFilteredAdminProjects(status);
            console.log("admin:", result);
            // je mets la liste filtrés dans le usestate pour les afficher
            setProjectList(result.projects);
        }
    }


    
    // la fonction est déclénchée quand la valeur du filter est changée
    function handleChange(e) {
        e.preventDefault(); // empêche le rechargement par défaut
        const status = e.target.value;
        console.log("status : ", status);
        setProjectFilter(status); // Met à jour le status sélectionné
        // console.log("projectFilter : ", projectFilter);

        if (status === "") {
            getProjects();
            // si le user selectionne tous les projet donc la valeur vide ""
            // on affiche toute la liste des projets
        } else {
            // console.log("else handlechange :");
            
            getStatusProject(status);
            // sinon on filtre suivant le status qu'aura choisi le user (en cours, terminé, etc)
        }
    }

    console.log('status list : ', statusList)

    // met à jour le status du projet
    function handleChangeStatus(e) {
        e.preventDefault();
        console.log(e.target);
        
        setNewStatus(e.target.value);
        console.log('id du target selected :', e.target.value);
        console.log('xxxx:', e.target.selectedOptions[0].id);
        const result = updateProjectStatus(e.target.selectedOptions[0].id, e.target.value);
        console.log(newStatus);
    }

        // supprimer un projet : admin
        async function handleDelete(id) {
            // on appelle l'API pour supprimer le projet dans la BDD
            try {
                await deleteProject(id);
                getProjects();
            } catch (error) {
                console.error("erreur lors de la suppression du projet", error);
            }
        };



    // useeffect s'exécute quand le composant apparait sur la page
    useEffect(() => {
        // quand le composant s'affiche, je lance ma fonction getProjects()
        // pour aller chercher les projets dans l'API
        getProjects();
        desactiveRefreshProjectList();
    }, [refreshList]);


return (
    <section className="title__container">


        {/* TRIER LES PROJETS PAR STATUS */}
        <Form.Select size="lg"onChange={handleChange} aria-label="Sort by genre" className="mb-4">
                    
            <option value=''>Trier par statut</option>
            {/* Si la liste de projets et de statuts n'est pas vide, on affiche la liste des status, sinon on affiche "Pas de statut"*/}
            {(projectList?.length > 0 && statusList.length != 0) ? statusList.map((status) => (
                <option value={status} key={status}>{status}</option>
            ))
            :
                <option>Pas de statut</option>
            }
        </Form.Select>

        {/* LISTE DES PROJETS */}
        <Container>
        <Row className="projects__container">
        {/* si projectList existe (!=null) et n’est pas vide (length != 0), alors j’affiche la liste des projets avec map, sinon on affiche pas de projet */}
        {(projectList != null && projectList.length != 0) ? projectList.map((project) => (
            <Col key={project.id} className="mb-5" md={12}>
                <Form >
                    <Card 
                        className="border border-primary rounded-3 shadow-sm"
                        style={{
                            width: "100%",
                            border: "2px" ,
                        }}
                    >
                    
                        {/* SUPPRESSION PROJET*/}
                        <Card.Body>
                            <Row className="align-items-center">
                                {/* ICÔNE POUBELLE */}
                                <Col xs="auto">
                                    < Trash size={30} onClick={(e) => {e.preventDefault(); handleShow() }}/>
                                
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Supprimer un projet</Modal.Title>
                                            </Modal.Header>
                                                <Modal.Body>Etes-vous sur de vouloir le supprimer ?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Annuler
                                                        </Button>
                                                        <Button variant="primary" onClick={(e) => {e.preventDefault(); handleDelete(project.id); handleClose()}}>
                                                            Supprimer
                                                        </Button>
                                                    </Modal.Footer>
                                        </Modal>
                                </Col>

                                <Col className="text-center ">
                                {/* TITRE PROJET "en cours" */}
                                    <Badge
                                        pill
                                        style={{
                                            color: "black",
                                            fontSize: "0.9rem",
                                        }}
                                        className="mb-2 d-block"
                                        bg={userIs === "admin" ? 'color-admin' : 'color-client'}
                                    > 
                                        {project.name}
                                    </Badge>
                                    
                                    {/* DESCRIPTION/RESUME PROJET */}
                                    <p className="border rounded">
                                        {project.resume}
                                    </p>

                                    {/* STATUS*/}
                                    {userIs === 'admin' &&
                                    <div>
                                        <section className="update__status">
                                            <Form.Group>
                                                <Form.Label htmlFor="status-select">Selectionner le status</Form.Label>

                                                <Form.Select defaultValue={project.status} onChange={handleChangeStatus} name="status" id="status-select">
                                                    {statusList.length > 0 ?
                                                    statusList.map((status, index) => (
                                                        <option value={status} id={project.id} key={index}>{status}</option>
                                                    )):
                                                    <option value="noStatus">pas de status</option>
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </section>
                                    </div>
                                    }       

                                    {/* DEADLINE*/}
                                    <Badge
                                        pill 
                                        style={{
                                            color: "black",
                                            fontSize: "0.9rem",
                                        }}
                                        className="deadline__badge d-block"
                                        bg={userIs === "admin" ? 'color-admin' : 'color-client'}
                                    >
                                        {project.deadline}
                                    </Badge>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Form>
            </Col>
        ))
    : <p>Pas de projet</p>}
        </Row>
        </Container>
    </section>
);
}


export default ProjectList;
