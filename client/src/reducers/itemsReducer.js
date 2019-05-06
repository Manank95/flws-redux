import {
    FETCH_ITEMS_BEGIN,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,
} from '../actions/itemsAction';

const initialState = {
    items: [],
    loading: false,
    error: null
}

export default function itemsReducer(state=initialState, action) {
    console.log("inside reducer:" + action.type)
    //console.log("inside reducer:" + action.payload.items)
    switch(action.type) {
        case FETCH_ITEMS_BEGIN:
        return {
            ...state,
            loading: true,
            error: null
        };

        case FETCH_ITEMS_SUCCESS:
        // console.log(action.payload.data);
        return {
            ...state,
            loading: false,
            items: action.payload.data
        };

        case FETCH_ITEMS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: []
        };

        case 'ADD':
        // console.log(action);
        // console.log(state.items.length);
        let newOne = {
            userId: 1,
            id: state.items[state.items.length-1].id+1,
            title: action.data.newTitle,
            body: action.data.newBody         
        }
        state.items.push(newOne);
        return {
            ...state,
            loading: false
        }

        case 'UPDATE':
        // console.log(action);
        let newItems =  state.items.map((post) => {
            if (post.id === parseInt(action.id)) {
                return {
                    ...post,
                    title: action.data.newTitle,
                    body: action.data.newBody
                }
            }
            else return post;
        });
        return {
            ...state,
            loading: false,
            items: newItems
        }


        case 'DELETE':
        // console.log(action);
        let filtered = state.items.filter(function( obj ) {
            return obj.id !== parseInt(action.id);
          });
        return {
            ...state,
            loading: false,
            items: filtered
        }
        
        default:
        return state;
    }
}
/*
export const getItems = state => state.items;
export const getLoading = state => state.loading;
export const getError = state => state.error;*/