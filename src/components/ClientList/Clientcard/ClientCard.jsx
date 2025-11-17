import "./ClientCard.scss";

function ClientCard({ client }) {
    return (
        <section className="client-card" aria-labelledby="information-client">
            <div className="client-card-header">
                <h3 className="client-card-header-title">
                    Information du client
                </h3>
            </div>
            <div className="client-card_div">
                <p className="client-card_item">Nom prénom</p>
                <p className="client-card_item-result">
                    {client.lastname} {client.firstname}
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
