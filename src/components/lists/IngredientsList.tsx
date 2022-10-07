import { FunctionComponent, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Pencil, X, Check  } from "react-bootstrap-icons";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteIngredient, getIngredients, updateIngredient } from '../../store/ingredientsSlice';
import { AppDispatch } from '../../store/store';

const IngredientsList: FunctionComponent = (props: any) => {
    const { register, handleSubmit, formState: {errors}} = useForm()
    const dispatch: AppDispatch = useDispatch()
    const [isEditMode, setIsEditMode] = useState<number>(0)

    const removeIngredient = (id:number) => {        
        if(window.confirm(`Supprimer définitivement cet ingrédient ?`)){
            dispatch(deleteIngredient(id))
            props.getChanging(true)
        }
    }
    const upIngredient = (data:any) => {
        dispatch(updateIngredient(data))
        setIsEditMode(0)
        props.getChanging(true)
    }

    return (
        <ul>
            {(props.Ingredients === undefined) ?
                Object.keys(props).map((key:string) => (
                    (!isNaN(parseInt(key)) === false) ? null :
                <li key={ props[key].name }>
                    <span className='mx-1'>{ props[key].RecipeIngredients.quantity }</span>
                    {(props[key].Measure.id !== 1) ? <span className='mx-1'>{ props[key].Measure.name }</span> : ''}
                    <span className='mx-1'>{ props[key].name }</span> 
                </li>
                ))
                :
                props.Ingredients.map((ingredient:any) =>(
                    <li key={ingredient.id} className='d-flex align-items-center my-2'>
                        {(ingredient.id === isEditMode)
                            ? 
                            <>
                                <Form onSubmit={handleSubmit(upIngredient)} >
                                    <Form.Control placeholder={ ingredient.name } {...register('name')}/>
                                    <Form.Control hidden value={ ingredient.id } {...register('id')}/>
                                    <Button type='submit' className='btn bg-transparent border-0'>
                                        <Check color='green'/>
                                    </Button>
                                    <Button onClick={() => setIsEditMode(0)} className='btn bg-transparent border-0'>
                                        <X color="red"/>
                                    </Button>
                                </Form>
                            </>
                            :
                            <>
                                { ingredient.name }
                                <Button className='btn bg-transparent py-0 border-0' onClick={() => setIsEditMode(ingredient.id)}>
                                    <Pencil color="orange"/>
                                </Button>
                                <Button className='btn bg-transparent p-0 border-0' onClick={() => removeIngredient(ingredient.id)}>
                                    <X color="red"/>
                                </Button>
                            </>
                        }
                    </li>
                )) 
            }
        </ul>
    )
}

export default IngredientsList