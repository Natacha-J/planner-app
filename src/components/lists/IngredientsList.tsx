import { FunctionComponent } from 'react'

const IngredientsList: FunctionComponent = (props: any) => {
    
    return (
        <ul>
            { Object.keys(props).map((key:string) => (
                <li key={ props[key].name }>
                    <span className='mx-1'>{ props[key].RecipeIngredients.quantity }</span>
                    {(props[key].Measure.id !== 1) ? <span className='mx-1'>{ props[key].Measure.name }</span> : ''}
                    <span className='mx-1'>{ props[key].name }</span> 
                </li>
            ))}
        </ul>
    )
}

export default IngredientsList