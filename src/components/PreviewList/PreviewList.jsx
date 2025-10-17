import Preview from "../Preview/Preview.jsx";
import "./PreviewList.scss"

function PreviewList() {

    // test genres en dur pour map ensuite
    const genres = ["pop", "rock", "classique"]

    return (
        <>
                <h1>Tous les extraits</h1>
                <section className="previewList">
                    {/* Pour le moment en dur pour les tests */}
                    <Preview title="titre 1" genres={genres}/>
                    <Preview title="titre 2" genres={genres}/>
                    <Preview title="titre 3" genres={genres}/>
                </section>
        </>
    )

}

export default PreviewList;