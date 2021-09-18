import {Link} from "react-router-dom";
import "./searchResults.css"

const SearchResults = ({results, error}) => {
    return (
        !error && results?.length > 0 ?
            <div className={"results"}>
                <h2 className={"result-title"}>Voici vos résultats de recherche</h2>

                <div className={"grid"}>

                    {
                        results.map(((result, index) => {
                            return <Link to={`/product/${result.id}`} className={"link"} key={index}>
                                <div className={"result"}>
                                    <div className={"image-container"}>
                                        <img className={"result-image"} src={result.image_front_small_url}
                                             alt={result.product_name}/>
                                    </div>
                                    <div className={"result-content"}>
                                        <div className={"result-name"}>{result.product_name}</div>
                                        <div className={"result-text"}>
                                            <span className={"allergene-title"}>
                                                {result.allergens_tags.length} allergène(s) {result.allergens_tags.length > 0 && ": "}
                                            </span>
                                            {result.allergens_tags.map((allergen, index) => {
                                                return <span className={"allergene"}
                                                             key={index}>{allergen.slice(3)}{result.allergens_tags.length - 1 > index && ", "}</span>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        }))
                    }

                </div>
            </div>
            :
            !error && results?.length === 0 ?
                <div className={"error"}>Aucun résultat de recherche</div>
                :
                error ?
                    <div className={"error"}>Une erreur est survenue, merci de réessayer</div>
                    : null
    )
}

export default SearchResults
