import { addToBasket, removeFromBasket } from '.'

describe('actions', () => {
    it('addToBasket should create ADD_TO_BASKET action', () => {
        const product = { name: 'Face Masks', price: 2.5 }
        expect(addToBasket(product)).toEqual({
            type: 'ADD_TO_BASKET',
            product: { name: 'Face Masks', price: 2.5 },
        })
    })
    it('removeFromBasket should create REMOVE_FROM_BASKET action', () => {
        const product = { name: 'Face Masks', price: 2.5 }
        expect(removeFromBasket(product)).toEqual({
            type: 'REMOVE_FROM_BASKET',
            product: { name: 'Face Masks', price: 2.5 },
        })
    })
})
