import { FunctionComponent, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AppDispatch } from "../../store/store";
import IngredientsCombo from '../../components/combos/IngredientsCombo';
import { addRecipe } from '../../store/recipesSlice';
import { Link, Navigate } from 'react-router-dom';

interface recipe{
    title: string,
    ingredients: object[]
}
const AddRecipeView: FunctionComponent = () => {
    const { register, handleSubmit, formState: { errors}} = useForm()
    const [ dataIngredients, setDataIngredients] = useState<object[]>([])
    const dispatch: AppDispatch = useDispatch()

    const onSubmit = (data:any) => {
        console.log(data);
        console.log(dataIngredients);
        let newRecipe: recipe = {
            title: data.title,
            ingredients: []
        }
        dataIngredients.map((ingredient:any) => {
            newRecipe.ingredients.push({
                IngredientId: ingredient.id,
                quantity: ingredient.quantity
            })
        })
        dispatch(addRecipe(newRecipe))
        setDataIngredients([])
    }
    const datasIngredients = (datas:any) => {
        setDataIngredients(dataIngredients.concat(datas))
        console.log(dataIngredients);
    }
    return(
        <div className='d-flex flex-column mx-auto'>
            <h1 className='text-center'>Ajout d'une recette</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className='w-50 mx-auto my-5'>
            <Form.Control {...register('title')} type='text' aria-label='Titre' placeholder='Veuillez entrer un titre'/>
            <div className='row my-5'>
            <div className='col-8'>
                <h2>Ingrédients : </h2>
                {dataIngredients.map((ingredient:any) =>
                    <p className='fs-4' key={ingredient.id}>{ingredient.quantity} {ingredient.measure} {ingredient.name}</p>
                )}
            </div>
            <Form.Group className='col-4'>
                <h2 className='text-center'>Ajouter un ingrédient : </h2>
                <IngredientsCombo datasIngredients={datasIngredients}/>
            </Form.Group>
            </div>
            <Button type='submit' className='m-5'>Enregistrer</Button>
        </Form>
        <Link to='/recettes' className='btn btn-warning w-25 mx-4'>Retour</Link>
        </div>
    )
}

export default AddRecipeView