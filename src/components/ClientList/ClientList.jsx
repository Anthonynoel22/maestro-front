import ClientInline from "./ClientInline/ClientInline.jsx";
import "./ClientList.scss";

function ClientList() {
    return (
        <>
            <section className="client-liste">
                <div className="client-liste-header">
                    <div className="client-liste-header_div client-liste-header_name_div">
                        <p className="client-liste-header_item client-liste-header_name_item">
                            Identité
                        </p>
                    </div>
                    <div className="client-liste-header_div client-liste-header_email_div">
                        <p className="client-liste-header_item client-liste-header_email_item">
                            Email
                        </p>
                    </div>
                    <div className="client-liste-header_div client-liste-header_adress_div">
                        <p className="client-liste-header_item client-liste-header_adress_item">
                            Adresse
                        </p>
                    </div>
                    <div className="client-liste-header_div client-liste-header_phone-number_div">
                        <p className="client-liste-header_item client-liste-header_phone-number_item">
                            N° de téléphone
                        </p>
                    </div>
                </div>

                <div className="client-liste-result">
                    <div className="client-liste-result_div client-liste-result_name_div">
                        <p className="client-liste-result_item client-liste-result_name_item">
                            Pierre Dupont
                        </p>
                    </div>
                    <div className="client-liste-result_div client-liste-result_email_div">
                        <p className="client-liste-result_item client-liste-result_email_item">
                            pierre.dupont@exemple.com
                        </p>
                    </div>
                    <div className="client-liste-result_div client-liste-result_adress_div">
                        <p className="client-liste-result_item client-liste-result_adress_item">
                            12 Avenue du Dev Fatigué 59001 Debug-sur-Mer
                        </p>
                    </div>
                    <div className="client-liste-result_div client-liste-result_phone-number_div">
                        <p className="client-liste-result_item client-liste-result_phone-number_item">
                            0000000000
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ClientList;

// {
// <ClientInline
// firstName="Pierre"
// lastName="Dupont"
// email="pierre.dupont@exemple.com"
// adress="12 Avenue du Dev Fatigué 59001 Debug-sur-Mer"
// phoneNumber="0000000000"
// />
// <ClientInline
// firstName="Lucas"
// lastName="Taguet"
// email="lucas.taguet@exemple.com"
// adress="17 Allée du Commit 75099 Paris"
// phoneNumber="1111111111"
// />
// <ClientInline
// firstName="Alex"
// lastName="Flexbox"
// email="alex.flexboxt@exemple.com"
// adress="5 Promenade du Grid Layout 34000 Montpellier"
// phoneNumber="2222222222"
// />
// <ClientInline
// firstName="Yann"
// lastName="Middleware"
// email="yann.middleware@exemple.com"
// adress="2457 Boulevard de la Compatibilité Internavigateurs 99999 Code-sur-Loire,"
// phoneNumber="3333333333"
// /> */
// }
