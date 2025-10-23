import "./ClientInline.scss";

function ClientInline({ firstName, lastName, email, adress, phoneNumber }) {
    return (
        <section className="client-inline">
            <div className="client-inline_div client-inline_name_div">
                <p className="client-inline_API-result client-inline_first-name_API-result">
                    {firstName}
                </p>
                <p className="client-inline_API-result client-inline_last-name_API-result">
                    {lastName}
                </p>
            </div>

            <div className="client-inline_div client-inline_email_div">
                <p className="client-inline_API-result client-inline_email_API-result">
                    {email}
                </p>
            </div>

            <div className="client-inline_div client-inline_adress_div">
                <p className="client-inline_API-result client-inline_adress_API-result">
                    {adress}
                </p>
            </div>

            <div className="client-inline_div client-inline_phone-number_div">
                <p className="client-inline_API-result client-inline_phone-number_API-result">
                    {phoneNumber}
                </p>
            </div>
        </section>
    );
}

export default ClientInline;
