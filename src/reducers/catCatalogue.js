import { ADD_TO_CAT_CATALOGUE, UPDATE_CAT } from '../actions';

const initialState = {
    cats: [
        {
            id: '5hOscXhRR',
            url: 'https://cdn2.thecatapi.com/images/5hOscXhRR.png',
            width: 1200,
            height: 600,
            original_filename: 'cat1.png',
            pending: 0,
            approved: 1,
        },
    ],
};

const catCatalogue = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CAT_CATALOGUE:
            return {
                ...state,
                cats: [action.cat, ...state.cats],
            };
        case UPDATE_CAT: {
            const newArray = state.cats.filter((cat) => cat.id !== action.cat.id);
            return {
                ...state, 
                cats: [...newArray, action.cat]
            };
        }
        default:
            return state;
    }
};

export default catCatalogue;
