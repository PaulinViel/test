import './searchBar.css';

const SearchBar = ({setSearchParam, handleSubmit, loading}) => {
    const handleChange = (e) => {
        setSearchParam(e)
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            handleSubmit();
        }} className={"search-form"}>
            <input className="search-product" placeholder="Nom du produit"
                   onChange={(e) => handleChange(e.target.value)}/>

            <button className={"search-button"}>

                {
                    loading ?
                        <div className="loader"/>
                        : "Cherchez !"
                }

            </button>
        </form>
    )
}

export default SearchBar
