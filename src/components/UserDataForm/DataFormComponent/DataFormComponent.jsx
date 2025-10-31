import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./DataFormComponent.scss";

function DataFormComponent(data) {
    console.log("data : ", data);
    console.log("data.data : ", data.data.user);
    console.log("data.fields : ", data.fields);
    console.log("data.fields : ", data.fields[0]);

    const userDatas = Object.entries(data.data.user || {});
    console.log("userDatas", userDatas);

    const userFields = Object.entries(data.fields || {});
    console.log("userFields", userFields);

    function handelSubmit(event) {
        event.preventDefault();
    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm={6}>
                        <Form
                            className="data-form"
                            method="post"
                            onSubmit={(event) => handelSubmit(event)}
                        >
                            <Container className="data-form-container">
                                {/* EN-TETE */}
                                <Row className="data-form-row-header">
                                    {/* <Col>Header title</Col> */}
                                    <Col>{data.headertitle}</Col>
                                </Row>

                                {/* LIGNE */}

                                <Row className="data-form-row-body">
                                    {userDatas.map((userData) => (
                                        <Form.Group
                                            key={userData.name}
                                            className="data-form-row-body-formgroup"
                                            controlId="data-form-row-body-formgroup-id"
                                        >
                                            <Form.Label>
                                                {userData.label}
                                            </Form.Label>
                                            <Form.Control
                                                className="data-form-row-body-formcontrol"
                                                type={userData.type}
                                                placeholder={`Entrez votre ${userData.label}`}
                                                defaultValue={
                                                    data?.[userData.name] || ""
                                                }
                                                // onChange={}
                                            />
                                        </Form.Group>
                                    ))}
                                </Row>

                                {/* <Row className="data-form-row-body">
                                    {fields.map((field) => (
                                        <Form.Group
                                            key={field.name}
                                            className="data-form-row-body-formgroup"
                                            controlId="data-form-row-body-formgroup-id"
                                        >
                                            <Form.Label>
                                                {field.label}
                                            </Form.Label>
                                            <Form.Control
                                                className="data-form-row-body-formcontrol"
                                                type={field.type}
                                                placeholder={`Entrez votre ${field.label}`}
                                                defaultValue={
                                                    data?.[field.name] || ""
                                                }
                                                // onChange={}
                                            />
                                        </Form.Group>
                                    ))}
                                </Row> */}

                                {/* <Row className="data-form-row-body">
                                    <Form.Group
                                        key={""}
                                        className="data-form-row-body-formgroup"
                                        controlId="data-form-row-body-formgroup-id"
                                    >
                                        <Form.Label>{"label"}</Form.Label>
                                        <Form.Control
                                            className="data-form-row-body-formcontrol"
                                            type={""}
                                            placeholder={`Entrez votre ...`}
                                            defaultValue={"defaultValue"}
                                            // onChange={}
                                        />
                                    </Form.Group>
                                </Row> */}

                                {/* BOUTTON */}
                                <Row className="data-form-button">
                                    <Button
                                        className="data-form-mofifier-button"
                                        variant="data-form-mofifier-button"
                                        type="submit"
                                    >
                                        Modifier
                                    </Button>
                                </Row>
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default DataFormComponent;
