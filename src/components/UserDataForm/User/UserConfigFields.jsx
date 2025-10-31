import DataFormComponent from "../DataFormComponent/DataFormComponent";

function UserConfigFields({ user }) {
    const userFields = [
        { name: "lastname", label: "Nom", type: "text" },
        { name: "firstname", label: "Prénom", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "localisation", label: "Adresse", type: "text" },
        {
            name: "phonenumber",
            label: "Numéro de téléphone",
            type: "Voir type",
        },
    ];

    return (
        <>
            <DataFormComponent fields={userFields} data={user} />;
        </>
    );
}

export default UserConfigFields;
