import "./CompanyCard.scss";

function CompanyCard({ company }) {
    console.log("Dans CompanyCard", company);

    return (
        <section className="company-card">
            <div className="company-card-header">
                <p className="company-card-header-title">
                    Information d'entreprise
                </p>
            </div>
            <div className="company-card_div company-card_email_div">
                <p className="company-card_item ">Nom</p>
                <p className="company-card_item-result">
                    {company.name}
                    {/* nom */}
                </p>
            </div>
            <div className="company-card_div">
                <p className="company-card_item">Adresse</p>
                <p className="company-card_item-result">
                    {company.localisation}
                    {/* adresse */}
                </p>
            </div>
            <div className="company-card_div">
                <p className="company-card_item">N° de Siret</p>
                <p className="company-card_item-result">
                    {company.siret}
                    {/* siret */}
                </p>
            </div>
        </section>
    );
}

export default CompanyCard;
