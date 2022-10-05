import { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'
import { Pencil, X  } from "react-bootstrap-icons";
import { useDispatch } from 'react-redux';
import { deleteIngredient } from '../../store/ingredientsSlice';
import { AppDispatch } from '../../store/store';

const IngredientsList: FunctionComponent = (props: any) => {
    const dispatch: AppDispatch = useDispatch()

     const removeIngredient = (id:number) => {
        if(window.confirm(`Supprimer définitivement l'ingrédient ${id} ?`)){
            dispatch(deleteIngredient(id))
        }
    }
/*    const updateIngredient: Function<id> = (e: React.MouseEvent<HTMLButtonElement>, id:number) => {
        console.log(id);
    } */

    return (
        <ul>
            {(props.Ingredients === undefined) ?
                Object.keys(props).map((key:string) => (
                <li key={ props[key].name }>
                    <span className='mx-1'>{ props[key].RecipeIngredients.quantity }</span>
                    {(props[key].Measure.id !== 1) ? <span className='mx-1'>{ props[key].Measure.name }</span> : ''}
                    <span className='mx-1'>{ props[key].name }</span> 
                </li>
                ))
                :
                props.Ingredients.map((ingredient:any) =>(
                    <li key={ingredient.id} className='d-flex align-items-center my-2'>
                        { ingredient.name }
                        <Button className='btn bg-transparent py-0 border-0' ><Pencil color="orange"/></Button>
                        <Button className='btn bg-transparent p-0 border-0' onClick={() => removeIngredient(ingredient.id)}><X color="red"/></Button>
                    </li>
                )) 
            }
        </ul>
    )
}

export default IngredientsList