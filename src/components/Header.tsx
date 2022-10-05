import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const Header: FunctionComponent = () => {

    return(
        <header className="text-center">
            <nav className="mx-3 my-5 w-100">
                <ul className="unstyled-list d-flex justify-content-around">
                    <Link to='/ingredients' className="text-decoration-none text-dark">Ingrédients</Link>
                    <Link to='/recettes' className="text-decoration-none text-dark">Recettes</Link>
                    <Link to='/planificateur' className="text-decoration-none text-dark">Planificateur des repas</Link>
                    <Link to='/stock' className="text-decoration-none text-dark">Stock</Link>
                    <Link to='/liste-de-courses' className="text-decoration-none text-dark">Liste de courses</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header