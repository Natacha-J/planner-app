import { FunctionComponent } from "react";
import { Spinner } from 'react-bootstrap';

const Loader: FunctionComponent = () => {
    return (
        <div className='row m-5 p-5'>
        <Spinner animation='border' className=' mx-auto border-0 m-5 p-5'>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
    )
}

export default Loader