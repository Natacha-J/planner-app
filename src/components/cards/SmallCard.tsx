import { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'
import IngredientsList from '../lists/IngredientsList'

const SmallCard: FunctionComponent = (props: any) => {
    
    return (
        <Card style={{ width: '20rem' }} className='m-3'>
            <Card.Header className='text-center'>{ props.title }</Card.Header>
            <Card.Body>
                <Card.Title>Ingredients :</Card.Title>
                <IngredientsList {...props.Ingredients}/>
            </Card.Body>
        </Card>
    )
}

export default SmallCard