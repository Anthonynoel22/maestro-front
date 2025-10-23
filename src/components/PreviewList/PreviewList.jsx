import Preview from "../Preview/Preview.jsx";
import "./PreviewList.scss"

function PreviewList() {

    // test genres en dur pour map ensuite
    const genres = ["pop", "rock", "classique"]
    const audioscr = "/src/assets/RAYE.mp3"

    return (
        <>
                <h1>Tous les extraits</h1>
                <section className="previewList">
                    {/* Pour le moment en dur pour les tests */}
                    <Preview audiosrc={audioscr} title="titre 1" genres={genres}/>
                    <Preview audiosrc={audioscr} title="titre 2" genres={genres}/>
                    <Preview audiosrc={audioscr} title="titre 3" genres={genres}/>
                </section>
        </>
    )

}

export default PreviewList;