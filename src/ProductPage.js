import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {Waves} from "./Waves";
import "./productPage.css";

const Product = () => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false)
    let {id} = useParams();

    useEffect(() => {
        fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
            .then(res => res.json())
            .then(
                result => {
                    setProduct(result)
                },
                error => {
                    setError(error)
                })
    }, [id])

    return (
        <div className={"product-page"}>
            <Link to={"/"} className={"link"}>
                <div className="back">Accueil</div>
            </Link>

            {
                error &&
                <div className={"error"}>Une erreur est survenue, merci de réessayer</div>
            }
            {
                !product && !error ?
                    <div className={"loader-big"}/>
                    : product && !error &&
                    <div className="product">
                        <h1 className="title-product">
                            Produit sélectionné
                        </h1>

                        <h2 className="product-name">{product.product.product_name}</h2>

                        <div className="image-product">
                            <img className={"result-product"} src={product.product.image_front_url}
                                 alt={product.product.product_name}/>
                        </div>

                        <div className="generic-name">{product.product.generic_name_fr}</div>

                        <div>
                            <span
                                className="underline">Ingrédients</span> : {product.product.ingredients_text_fr ? product.product.ingredients_text_fr : "Non communiqués"}
                        </div>

                        <div className={"product-text"}>
                                            <span className={"allergene-product"}>
                                                {product.product.allergens_tags.length} allergène(s) {product.product.allergens_tags.length > 0 && ": "}
                                            </span>
                            {
                                product.product.allergens_tags.map((allergen, index) => {
                                    return <span
                                        key={index}>{allergen.slice(3)}{product.product.allergens_tags.length - 1 > index && ", "}</span>
                                })
                            }
                        </div>
                    </div>
            }
            {Waves()}
        </div>
    )
}

export default Product;
