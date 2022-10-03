import { FunctionComponent } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Header: FunctionComponent = () => {

    return(
        <header className="text-center">
            <nav className="m-5">
                <ul className="unstyled-list d-flex justify-content-around">
                    <Link to='/recettes' className="text-decoration-none text-dark">Recettes</Link>
                    <Link to='/stock' className="text-decoration-none text-dark">Stock</Link>
                    <Link to='/planificateur' className="text-decoration-none text-dark">Planificateur des repas</Link>
                    <Link to='/liste-de-courses' className="text-decoration-none text-dark">Liste de courses</Link>
                    <Link to='/profil'><PersonCircle size={30} color='black'/></Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header