export function fetchItems() {
    //const url = "http://jsonplaceholder.typicode.com/posts";
    const url = "/api?title="; 
    // console.log(titleSearch);
    console.log(url);
    return dispatch => {
        dispatch(fetchItemsBegin());
    
        return fetch(url).then(handleErrors).then(res => res.json()).then(data => {
            // console.log(data);
            dispatch(fetchItemsSuccess(data));
            return data;
        })
        .catch(error => dispatch(fetchItemsFailure(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}



export const FETCH_ITEMS_BEGIN = 'FETCH_ITEMS_BEGIN';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export const fetchItemsBegin = () => ({
    type: FETCH_ITEMS_BEGIN
});

export const fetchItemsSuccess = data => ({
    type: FETCH_ITEMS_SUCCESS,
    payload: { data }
});

export const fetchItemsFailure = error => ({
    type: FETCH_ITEMS_FAILURE,
    payload: { error }
});