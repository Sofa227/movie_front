import {Form, Button} from 'react-bootstrap';

const ReviewForm = ({handleSubmit, revText, labelText, defaultValue, isInWishlist, onWishlistClick}) => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
            </Form.Group>
            <div className="d-flex justify-content-between">
                <Button variant="outline-info" onClick={handleSubmit}>Отправить</Button>
                <Button 
                    style={{background: 'gold', borderColor: 'gold'}}
                    onClick={onWishlistClick}
                >
                    {isInWishlist ? 'Удалить из списка желаний' : 'Добавить в список желаний'}
                </Button>
            </div>
        </Form>   
    )
}

export default ReviewForm
