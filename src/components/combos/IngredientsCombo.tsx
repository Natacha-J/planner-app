import { Component, useState, useEffect, ChangeEvent, ReactComponentElement, ComponentProps, FunctionComponent } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories, getCategories, getCategoriesError, getCategoriesStatus } from '../../store/categoriesSlice';
import { AppDispatch } from '../../store/store';

const IngredientsCombo: FunctionComponent<{datasIngredients: Function}> = ({datasIngredients}) => {
    const dispatch: AppDispatch = useDispatch()
    const [categorySelected, setCategorySelected] = useState<number>(-1)
    const [ingredientSelected, setIngredientSelected] = useState<number>(-1)
    const [measureToDisplay, setMeasureToDisplay] = useState<string>('')  
    const [quantity, setQuantity] = useState<string>('')
    const [ingredientToSend, setIngredientToSend] = useState<any>('')

    //categories load
    const categories = useSelector(getAllCategories)
    const categoriesStatus = useSelector(getCategoriesStatus)
    const categoriesError = useSelector(getCategoriesError)
    useEffect(() => {
        if(categoriesStatus === 'idle') {
            dispatch(getCategories())
        }
    }, [categoriesStatus, dispatch])
    
    const getSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategorySelected(parseInt(e.target.value) - 1) 
    }
    const getSelectIngredient = (e: ChangeEvent<HTMLSelectElement>) => {
        categories[categorySelected].Ingredients.map((i:any) => {
            if(i.id == e.target.value){
                setMeasureToDisplay(i.Measure.name)
                setIngredientToSend(i)
            }
        })
        setIngredientSelected(parseInt(e.target.value)) 
    }
    
    const sendData = () => {
        let datas;
        if( ingredientToSend != undefined )
            datas = {
                id: ingredientToSend.id,
                name: ingredientToSend.name,
                measure: ingredientToSend.Measure.name,
                quantity: quantity
            }
        setCategorySelected(-1)
        setIngredientSelected(-1)
        setIngredientToSend('')
        return datas
    }
       
    return (
        <div className='d-flex flex-wrap justify-content-center align-items-center'>
            <Form.Select onChange={ getSelectCategory } style={{ width: '12rem'}}>
                <option value={0}> Veuillez choisir une catégorie </option>
            { categories.map((category:any) => 
                    <option key={ category.id } value={ category.id }> { category.name } </option>
            )}
            </Form.Select>
            {(categorySelected !== -1) ?
                    <Form.Select onChange={ getSelectIngredient } style={{ width: '12rem'}}  className='my-4'>
                        <option>Veuillez choisir un ingrédient </option>
                        { categories[categorySelected].Ingredients.map(( ingredient: any) =>
                            <option key={ ingredient.id } value={ ingredient.id }>{ ingredient.name }</option>
                        )}
                    </Form.Select>
                :
                null
            }
            {(ingredientSelected !== -1 && categorySelected !== -1 ) ?
                <div className='d-flex align-items-baseline'>
                    <Form.Control onChange={(e) => setQuantity(e.target.value)} type='text' placeholder='quantité' aria-label='quantité' style={{ width: '7rem'}}/>
                    <span className='ms-2 fs-5'>{ measureToDisplay }</span>
                </div>
                :
                null
            }
            <Button onClick={() => datasIngredients(sendData())} className='mx-auto mt-3 col-6'>valider</Button>
        </div>
    )
}

export default IngredientsCombo