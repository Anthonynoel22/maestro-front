import "./ClientCard.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getOneUSer } from "../../../api/apiUser.js";

function ClientCard() {
    const [clientsData, setClientsData] = useState({});

    async function getClientData() {
        const datas = await getOneUSer();
        setClientsData(datas);
        console.log("datas", datas);
    }

    useEffect(() => {
        getClientData();
    }, []);

    return (
        <section className="client-card">
            <div className="client-card-header">
                <p className="client-card-header-title">
                    {clientsData.firstname}
                    {clientsData.firstname}
                </p>
            </div>
            <div className="client-card_div">
                <p className="client-card_item">Email</p>
                <p className="client-card_item-result">{clientsData.email}</p>
            </div>
            <div className="client-card_div">
                <p className="client-card_item">Adresse</p>
                <p className="client-card_item-result">
                    {clientsData.localisation}
                </p>
            </div>
            <div className="client-card_div">
                <p className="client-card_item">N° de téléphone</p>
                <p className="client-card_item-result">
                    {clientsData.phonenumber}
                </p>
            </div>
        </section>
    );
}

export default ClientCard;
