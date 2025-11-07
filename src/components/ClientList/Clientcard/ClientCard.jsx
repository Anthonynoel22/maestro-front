import { Container } from "react-bootstrap";
import "./ClientCard.scss";
// import { useState } from "react";
// import { useEffect } from "react";
// import { getOneUSer } from "../../../api/apiUser.js";

function ClientCard({ client }) {
    console.log("Dans ClientCard", client);

    return (
        <section className="client-card">
            <div className="client-card-header">
                <p className="client-card-header-title">
                    Information du client
                </p>
            </div>
            <div className="client-card_div">
                <p className="client-card_item">Nom prénom</p>
                <p className="client-card_item-result">
                    {client.firstname} {client.lastname}
                </p>
            </div>
            <div className="client-card_div">
                <p className="client-card_item">Email</p>
                <p className="client-card_item-result">{client.email}</p>
            </div>
            <div className="client-card_div">
                <p className="client-card_item">Adresse</p>
                <p className="client-card_item-result">{client.localisation}</p>
            </div>
            <div className="client-card_div">
                <p className="client-card_item">N° de téléphone</p>
                <p className="client-card_item-result">{client.phonenumber}</p>
            </div>
        </section>
    );
}

export default ClientCard;

{
}
