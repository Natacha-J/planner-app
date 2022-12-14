import { FunctionComponent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import CategoriesCombo from "../combos/CategoriesCombo";
import IngredientsCombo from "../combos/IngredientsCombo";
import MeasuresCombo from "../combos/MeasuresCombo";

const AsideCard: FunctionComponent<{sendDatas: Function, component: string}> = ({sendDatas, component}) => {
    const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful }} = useForm()
    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false)
    const [categorySelected, setCategorySelected] = useState<number>(0)
    const [measureSelected, setMeasureSelected] = useState<number>(0)
    const [ingredientSelected, setIngredientSelected] = useState<any>()
    const [ingredientsList, setIngredientsList] = useState<object[]>([])

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                 name: '',
                 title: '',
                 quantity: ''
            })
        }
    }, [formState, reset])

    const toggleAside = () => {
        setIsAsideOpen(!isAsideOpen)
    }
    
    const getCategory = (categoryId:string) => {
        setCategorySelected(parseInt(categoryId))  
    }

    const getIngredient = (ingredient: any) => {
        console.log(ingredient['Measure']);
        
        for (const i in ingredient) {
            setIngredientSelected(ingredient)            
        }
    }

    const getMeasure = (MeasureId:string) => {
        setMeasureSelected(parseInt(MeasureId))
    }

    const addToList = (datas:any, e:any) => {
        e.stopPropagation()
        setIngredientsList(ingredientsList.concat({...ingredientSelected, quantity: datas.quantity} ))
    }

    const removeIngredient = (id:number) => {
        const newTab = ingredientsList.filter(ingredient => Object.values(ingredient)[0] != id)
       setIngredientsList(newTab) 
    }

    const onSubmit = (datas:any) => {
        setIsAsideOpen(false)
        let newItem: any;
        if(datas.name){
            newItem = {
                name: datas.name,
                MeasureId: measureSelected,
                CategoryId: categorySelected
            }
        } else {
            newItem = {
                title: datas.title,
                ingredients: []
            }  
            ingredientsList.map((ingredient:any) => {
                newItem.ingredients.push({
                    IngredientId: ingredient.id,
                    quantity: ingredient.quantity
                })
            })
            setIngredientsList([])
        }
        sendDatas(newItem)
    }
    
    return (
        <aside className="col d-flex flex-column justify-content-start align-items-center">
            <Button onClick={toggleAside} className="mt-3 mb-n5 shadow">{isAsideOpen ? 'Fermer' : (component === 'Ingredient') ? 'Ajouter un ingr??dient' : 'Ajouter une recette'}</Button>
            {(isAsideOpen && component === 'Ingredient') ?
                <Form onSubmit={handleSubmit(onSubmit)} className='shadow rounded p-3' aria-label="Ajouter un ingr??dient" >
                    <CategoriesCombo getCategory={getCategory} />
                    <MeasuresCombo getMeasure={getMeasure} />
                    <Form.Control {...register('name')} aria-label='nom' placeholder="nom de l'ingr??dient" className="my-3" />
                    {(categorySelected != 0 && measureSelected != 0) ?
                    <Button type="submit" className="w-100 mt-5">valider</Button>
                    :
                    null
                    }
                </Form>
                :
                (isAsideOpen && component === 'Recipe') ?
                <>
                <Form onSubmit={handleSubmit(onSubmit)} className=' rounded-top border-bottom-0 p-3 w-100' aria-label="Ajouter une recette">
                    <h2 className="text-center mt-2 mb-4">Nouvelle recette</h2>
                    <Form.Control {...register('title')} type='text' aria-label='Titre' placeholder='Veuillez entrer un titre'/>
                    {(ingredientsList.length != 0) ?
                    <div className='row p-4'>
                        <ul>
                            {ingredientsList.map((ingredient:any) =>
                                <li className='fs-6' key={ingredient['id']}>
                                   {ingredient['name']} ( {ingredient['quantity']} {(ingredient['Measure']['name'] === 'pi??ce')? '' : ingredient['Measure']['name']} )
                                    <X color='red' onClick={() => removeIngredient(ingredient['id'])}/>
                                </li>
                            )}
                        </ul>
                        <Button type="submit" className="w-100 mt-5">valider la recette</Button>
                    </div>
                    : 
                    null}
                </Form>
                <Form onSubmit={handleSubmit(addToList)}  className='shadow rounded-bottom border-top-0 px-3 pb-3 w-100' aria-label="Ajouter un ingr??dient ?? la recette">
                    <h3 className='text-center fs-5 mt-5'>Ajout d'un ingr??dient : </h3>
                        <CategoriesCombo getCategory={getCategory} />
                            {(categorySelected != 0) ?
                                <IngredientsCombo getIngredient={getIngredient} categoryId={categorySelected} />
                                : null}
                                {(ingredientSelected != undefined) ?
                                    <div>
                                        <span className='float-end my-4'>{ingredientSelected['Measure']['name']}</span>
                                        <Form.Control {...register('quantity')} type='text' aria-label='Quantit??' className='my-3 w-75' placeholder='Veuillez entrer une quantit??' />
                                        <Button type='submit' className='bg-secondary mt-3 mb-1 w-100 mx-auto py-0'>Enregistrer l'ingr??dient</Button>
                                    </div>
                                : null}
                </Form>
            </> 
                :
                null
            }

        </aside>
    )
}

export default AsideCard