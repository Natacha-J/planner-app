import { useEffect, FunctionComponent } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories, getCategories, getCategoriesError, getCategoriesStatus } from '../../store/categoriesSlice';
import { AppDispatch } from '../../store/store';

const CategoriesCombo: FunctionComponent<{getCategory: Function}> = ({getCategory}) => {
    const dispatch: AppDispatch = useDispatch()

    //categories load
    const categories = useSelector(getAllCategories)
    const categoriesStatus = useSelector(getCategoriesStatus)
    const categoriesError = useSelector(getCategoriesError)

    useEffect(() => {
        if(categoriesStatus === 'idle') {
            dispatch(getCategories())
        }
    }, [categoriesStatus, dispatch])
       
    return (
        <div className='d-flex flex-wrap justify-content-center align-items-center my-3'>
            <Form.Select
                onChange={ (e) => getCategory(e.target.value) }>
                <option value={0}> Veuillez choisir une catégorie </option>
            { categories.map((category:any) => 
                    <option key={ category.id } value={ category.id }> 
                     { category.name }
                    </option>
            )}
            </Form.Select>
        </div>
    )
}

export default CategoriesCombo