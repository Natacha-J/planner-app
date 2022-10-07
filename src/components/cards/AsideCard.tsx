import { FunctionComponent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Pencil, X, Check  } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import CategoriesCombo from "../combos/CategoriesCombo";
import IngredientsCombo from "../combos/IngredientsCombo";
import MeasuresCombo from "../combos/MeasuresCombo";

const AsideCard: FunctionComponent<{sendDatas: Function, component: string}> = ({sendDatas, component}) => {
    const { register, handleSubmit, formState: {errors}} = useForm()
    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false)
    const [categorySelected, setCategorySelected] = useState<number>(0)
    const [measureSelected, setMeasureSelected] = useState<number>(0)
    const [ dataIngredients, setDataIngredients] = useState<object[]>([])

    const toggleAside = () => {
        setIsAsideOpen(!isAsideOpen)
    }
    
    const getCategory = (categoryId:string) => {
        setCategorySelected(parseInt(categoryId))  
    }

    const getMeasure = (MeasureId:string) => {
        setMeasureSelected(parseInt(MeasureId))
    }

    const datasIngredients = (datas:any) => {
        setDataIngredients(dataIngredients.concat(datas))
    }

    const removeIngredient = (id:number) => {
        const newTab = dataIngredients.filter(ingredient => Object.values(ingredient)[0] != id)
       setDataIngredients(newTab) 
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
        }
        dataIngredients.map((ingredient:any) => {
            newItem.ingredients.push({
                IngredientId: ingredient.id,
                quantity: ingredient.quantity
            })
        })
        sendDatas(newItem)
    }
    return (
        <aside className="col-2 d-flex flex-column justify-content-start align-items-center">
            <Button onClick={toggleAside} className="mt-3 mb-5 shadow">{isAsideOpen ? 'Fermer' : (component === 'Ingredient') ? 'Ajouter un ingrédient' : 'Ajouter une recette'}</Button>
            {(isAsideOpen && component === 'Ingredient') ?
                <Form onSubmit={handleSubmit(onSubmit)} className='shadow rounded p-3' aria-label="Ajouter un ingrédient" >
                    <CategoriesCombo getCategory={getCategory} />
                    <MeasuresCombo getMeasure={getMeasure} />
                    <Form.Control {...register('name')} aria-label='nom' placeholder="nom de l'ingrédient" className="my-3" />
                    <Button type="submit" className="w-100 mt-5">valider</Button>
                </Form>
                :
                (isAsideOpen && component === 'Recipe') ?
                <>
                <Form onSubmit={handleSubmit(onSubmit)} className='shadow rounded p-3' aria-label="Ajouter une recette">
                    <h2 className="text-center mt-2 mb-4">Nouvelle recette</h2>
                    <Form.Control {...register('title')} type='text' aria-label='Titre' placeholder='Veuillez entrer un titre'/>
                    {(dataIngredients.length != 0) ?
                    <div className='row p-4'>
                        <h3 className="fs-5 text-center text-decoration-underline">Ingrédients enregistrés</h3>
                        <ul>
                            {dataIngredients.map((ingredient:any) =>
                                <li className='fs-6' key={ingredient.id}>
                                    {ingredient.quantity} {(ingredient.measure === 'pièce')? '' : ingredient.measure} {ingredient.name}
                                    <X color='red' onClick={() => removeIngredient(ingredient.id)}/>
                                </li>
                            )}
                        </ul>
                    </div>
                    : 
                    null
                    }
                    <Form.Group className='row'>
                        <h3 className='text-center fs-5 my-4'>Ajout d'un ingrédient : </h3>
                        <IngredientsCombo datasIngredients={datasIngredients}/>
                    </Form.Group>
                    <Button type='submit' className='m-5'>Enregistrer</Button>
                </Form>
            </> 
                :
                null
            }

        </aside>
    )
}

export default AsideCard