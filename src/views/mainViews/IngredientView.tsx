import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Form } from 'react-bootstrap'
import { Loader, SmallCard, CategoriesCombo, MeasuresCombo, AsideCard } from "../../components";
import { getAllCategories, getCategoriesStatus, getCategoriesError, getCategories } from "../../store/categoriesSlice";
import { addIngredient } from "../../store/ingredientsSlice";
import { AppDispatch } from "../../store/store";

const IngredientView: FunctionComponent = () => {
    const { register, handleSubmit, formState: {errors}} = useForm()
    const dispatch: AppDispatch = useDispatch()
    //load categories
    const categories = useSelector(getAllCategories)
    const categoriesStatus = useSelector(getCategoriesStatus)
    const categoriesError = useSelector(getCategoriesError)

    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false)
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
    const [categorySelected, setCategorySelected] = useState<number>(0)
    const [measureSelected, setMeasureSelected] = useState<number>(0)
    const [needRefresh, setNeedRefresh ] = useState<boolean>(false)

    
    useEffect(() => {
        if (categoriesStatus === 'idle' || needRefresh) {
            dispatch(getCategories())
            setNeedRefresh(false)
        }        
        if(categoriesStatus === 'succeeded'){
            setIsFirstLoad(false)
        }        
    }, [categoriesStatus, needRefresh])   

    const addNewIngredient = (datas:any) => { 
        dispatch(addIngredient(datas))
        .then(() => setNeedRefresh(true)) 
    }

    const getChanging = (res:boolean) => {
        setNeedRefresh(res)
    }
    
    return(
        <section className="row m-2">
            <h1 className="m-5 col-10 text-center">Liste des ingrédients</h1>
            <main className="col-10">
                {(isFirstLoad === true)
                     ?
                     <Loader/>
                     :
                    <ul className="list-unstyled inline-block list-inline mx-auto">
                        { categories.map((ingredient: any) => 
                            <li className="list-inline-item" key={ ingredient.id }><SmallCard {...ingredient} getChanging={getChanging}  /></li>
                        )}
                    </ul>
                }
            </main>
            <AsideCard sendDatas={addNewIngredient} component='Ingredient'/>
        </section>

    )
}

export default IngredientView