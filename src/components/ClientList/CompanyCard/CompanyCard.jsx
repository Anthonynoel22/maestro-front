import "./CompanyCard.scss";

function CompanyCard() {
    return (
        <section className="company-card">
            <div className="company-card-header">
                <p className="company-card-header-title">
                    Information d'entreprise
                </p>
            </div>
            <div className="company-card_div company-card_email_div">
                <p className="company-card_item ">Nom</p>
                <p className="company-card_item-result">Nom de l'entreprise</p>
            </div>
            <div className="company-card_div">
                <p className="company-card_item">Adresse</p>
                <p className="company-card_item-result">
                    12 Avenue du Dev Fatigué 59001 Debug-sur-Mer
                </p>
            </div>
            <div className="company-card_div">
                <p className="company-card_item">N° de Siret</p>
                <p className="company-card_item-result">541545314514453</p>
            </div>
        </section>
    );
}

export default CompanyCard;
