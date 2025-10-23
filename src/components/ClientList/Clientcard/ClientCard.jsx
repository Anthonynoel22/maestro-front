import "./ClientCard.scss";

function ClientCard() {
    return (
        <section className="client-card">
            <div className="client-card_div client-card_name_div">
                <p className="client-card_API-result client-card_first-name_API-result">
                    Pierre
                </p>
                <p className="client-card_API-result client-card_last-name_API-result">
                    Dupont
                </p>
            </div>
            <div className="client-card_div client-card_email_div">
                <p className="client-card_item client-card_email_item">Email</p>
                <p className="client-card_API-result client-card_email_API-result">
                    pierre.dupont@exemple.com
                </p>
            </div>
            <div className="client-card_div client-card_adress_div">
                <p className="client-card_item client-card_adress_item">
                    Adresse
                </p>
                <p className="client-card_API-result client-card_adress_API-result">
                    12 Avenue du Dev Fatigué <br /> 59001 Debug-sur-Mer
                </p>
            </div>
            <div className="client-card_div client-card_phone-number_div">
                <p className="client-card_item client-card_phone-number_item">
                    N° de téléphone
                </p>
                <p className="client-card_API-result client-card_phone-number_API-result">
                    0000000000
                </p>
            </div>
        </section>
    );
}

export default ClientCard;
