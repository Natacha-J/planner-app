import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader, SmallCard } from "../../components";
import { getAllCategories, getCategoriesStatus, getCategoriesError, getCategories } from "../../store/categoriesSlice";
import { AppDispatch } from "../../store/store";
import { Button, Form } from 'react-bootstrap'
import { CategoriesCombo } from "../../components";
import { useForm } from "react-hook-form";
import { addIngredient } from "../../store/ingredientsSlice";
import MeasuresCombo from "../../components/combos/MeasuresCombo";
import { getRecipes } from "../../store/recipesSlice";

const IngredientView: FunctionComponent = () => {
    const { register, handleSubmit, formState: {errors}} = useForm()
    const dispatch: AppDispatch = useDispatch()
    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false)
    const [categorySelected, setCategorySelected] = useState<number>(0)
    const [measureSelected, setMeasureSelected] = useState<number>(0)
    //load categories
    const categories: any[] = useSelector(getAllCategories)
    const categoriesStatus = useSelector(getCategoriesStatus)
    const categoriesError = useSelector(getCategoriesError)
    
    useEffect(() => {
        if (categoriesStatus === 'idle') {
            dispatch(getCategories())
        }
    }, [categoriesStatus, categories])   

    const addNewIngredient = (datas:any) => {
        let newIngredient = {
            name: datas.name,
            MeasureId: measureSelected,
            CategoryId: categorySelected
        }
        dispatch(addIngredient(newIngredient))
        setIsAsideOpen(false)
        dispatch(getCategories())
    }

    const openAside = () => {
        setIsAsideOpen(true)
    }
    
    const getCategory = (categoryId:string) => {
        setCategorySelected(parseInt(categoryId))  
    }

    const getMeasure = (MeasureId:string) => {
        setMeasureSelected(parseInt(MeasureId))
    }
    
    return(
        <section className="row m-2">
            <h1 className="m-5 col-10 text-center">Liste des ingrédients</h1>
            <main className="col-10">
                {(categoriesStatus === 'succeeded')
                ?
                <ul className="list-unstyled inline-block list-inline mx-auto">
                    { categories.map((ingredient: any) => 
                        <li className="list-inline-item" key={ ingredient.id }><SmallCard {...ingredient} /></li>
                    )}
                </ul>
                :
                <Loader/>
                }
            </main>
            <aside className="col-2 d-flex flex-column justify-content-start align-items-center shadow rounded py-3">
                <Button onClick={openAside} className="mt-3 mb-5 shadow">Ajouter un ingrédient</Button>
                {(isAsideOpen) ? 
                    <Form onSubmit={handleSubmit(addNewIngredient)} >
                        <CategoriesCombo getCategory={getCategory}/>
                        <MeasuresCombo getMeasure={getMeasure}/>
                        <Form.Control {...register('name')} aria-label='nom' placeholder="nom de l'ingrédient" className="my-3"/>
                        <Button type="submit" className="w-100 mt-5">valider</Button>
                    </Form>
                    :
                    null
                }
            </aside>
        </section>

    )
}

export default IngredientView