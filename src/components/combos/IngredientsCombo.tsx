import { useState, useEffect, FunctionComponent } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllIngredients, getIngredients, getIngredientsError, getIngredientsStatus } from '../../store/ingredientsSlice';
import { AppDispatch } from '../../store/store';
import IngredientsList from '../lists/IngredientsList';

const IngredientsCombo: FunctionComponent<{getIngredient: Function, categoryId: number}> = ({getIngredient, categoryId}) => {
    const dispatch: AppDispatch = useDispatch()
    const [ingredientsList, setIngredientsList] = useState<object[]>([])


    //ingredients load
    const ingredients = useSelector(getAllIngredients)
    const ingredientsStatus = useSelector(getIngredientsStatus)
    const ingredientsError = useSelector(getIngredientsError)

    useEffect(() => {
        if(ingredientsStatus === 'idle') {
            dispatch(getIngredients())
        }
    }, [ingredientsStatus, dispatch])

    const sendIngredient = (e: any) => {
        ingredients.map((ingredient: any) => {
            if(ingredient.id === parseInt(e.target.value)){
                getIngredient(ingredient)
            }
        })
    }

    return (
        <div className='d-flex flex-wrap justify-content-center align-items-center'>
            <Form.Select
                onChange={sendIngredient}>
                <option value={0}> Veuillez choisir un ingrédient </option>
            { ingredients.map((ingredient:any) => 
                (ingredient.Category.id === categoryId) ? 
                    <option key={ ingredient.id } value={ ingredient.id }> { ingredient.name } </option>
                    :
                    null
                
            )}
            </Form.Select>
        </div>
    )
}

export default IngredientsCombo