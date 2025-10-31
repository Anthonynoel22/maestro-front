import "./UserDataForm.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getMyProfile } from "../../../api/apiUser.js";
import UserConfigFields from "./UserConfigFields.jsx";
// import { updateMyProfile } from "../../api/apiUser.js";

function UserDataForm() {
    // Voir mes informations
    const [setting, setSetting] = useState({});

    async function getMySetting() {
        const myProfile = await getMyProfile();
        setSetting(myProfile);
        console.log("setting log :", myProfile);
    }

    useEffect(() => {
        getMySetting();
    }, []);

    // // Modifier mes informations
    // const [newLastname, setNewLastname] = useState("");
    // const [newFirstname, setNewFirstname] = useState("");
    // const [newEmail, setNewEmail] = useState("");
    // const [newLocalisation, setNewLocalisation] = useState("");
    // const [newPhonenumber, setNewPhonenumber] = useState("");
    return (
        <>
            <UserConfigFields user={setting} />
        </>
    );
}

export default UserDataForm;
