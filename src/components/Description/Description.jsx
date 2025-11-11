import { useState, useEffect  } from "react";
import { getAllDescription } from "../../api/apiDescription.js";
import DescriptionItem from "../Description/DescriptionItem/DescriptionItem.jsx";
import "./Description.scss";

function Description() {
    const [descriptionList, setDescriptionList] = useState([]);
    async function getDescriptionList() {
        const allDescriptions = await getAllDescription();
        setDescriptionList(allDescriptions);
    }

    useEffect(() => {
        getDescriptionList();
    }, []);

    return (
        <>
            <section>
                {descriptionList.length !== 0 &&
                    descriptionList.map((description) => (
                        <DescriptionItem key={description.id} description={description} />
                    ))}
            </section>
        </>
    );
}

export default Description;
