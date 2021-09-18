import {useState} from 'react';
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import PageNavigator from "./PageNavigator";
import {Waves} from "./Waves";
import './home.css';

const Home = () => {
    const [searchResult, setSearchResult] = useState(null)
    const [searchParam, setSearchParam] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const getFood = (newPage = 1) => {
        setLoading(true)
        fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchParam}&search_simple=1&page=${newPage}&json=1`)
            .then(res => res.json())
            .then(
                result => {
                    setSearchResult(result)
                    setLoading(false)
                },
                error => {
                    setError(error)
                    setLoading(false)
                })
    }

    return (
        <div className="home">
            <h1 className="title">Trouvez un produit</h1>

            <SearchBar setSearchResult={setSearchResult} setError={setError} setSearchParam={setSearchParam}
                       handleSubmit={getFood} loading={loading}/>

            <SearchResults results={searchResult?.products} error={error}/>
            {
                !searchResult && !error &&
                <div className={"home-text"}>
                    <div className={"home-intro"}>Cherchez un produit vendu en france, consultez les ingrédients et
                        allergènes, afin de savoir ce que vous mangez !
                    </div>
                    <div className={"home-guide"}>Utilisez la barre de recherche ci-dessus en tapant le nom du produit
                        pour lequel vous désirez
                        une information, puis cherchez dans la liste des résultats.
                    </div>
                </div>
            }
            {
                searchResult && searchResult.products?.length > 0 && !error &&
                <PageNavigator page={searchResult.page} count={searchResult.count} page_size={searchResult.page_size}
                               changePage={getFood}/>
            }

            {Waves()}

        </div>
    );
}

export default Home;
