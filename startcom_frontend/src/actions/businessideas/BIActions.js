import {READ_BI, IS_REGISTERED_SUCCESS, RESET_REGISTER, UPDATE_BI, DELETE_BI} from '../actionTypes';




export const fetchBI = () => dispatch =>  {
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_business_ideas')
        .then (res => res.json())
        .then(businessIdeas =>
            dispatch({
                type: READ_BI,
                payload: businessIdeas
            }))
};

export const resetRegisterStatus = () => dispatch => {
    dispatch({
        type: RESET_REGISTER
    })
};

export const registerBI = (BIData) => dispatch => {
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/post_business_idea', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(BIData)
        
    })
    .then((res) => {
        console.log("res "+ res.status);
        if(res.status === 200) {
            dispatch({
                type: IS_REGISTERED_SUCCESS,
                payload: true
            });
            return res.json();
        } else {
            dispatch({
                type: IS_REGISTERED_SUCCESS,
                payload: false
            });
            return null;
        }
    })
    .then(() => dispatch(
        fetchBI()
    )) 
};

export const updateBI = (BIData, id) => dispatch => {
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_business_idea/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(BIData)
    })
        .then((res) => {
            console.log("res "+ res.status);
            if(res.status === 200) {
                dispatch({
                    type: UPDATE_BI,
                    payload: res.data
                });
                return res.json();
            } else
                return res.error;
        })
        .then(() => dispatch(
            fetchBI()
        ))
};

export const deleteBI = (id) => dispatch => {
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/delete_business_idea/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
        .then((res) => {
            console.log("res "+ res.status);
            if(res.status === 200) {
                dispatch({
                    type: DELETE_BI,
                    payload: res.data
                });
                return res.json();
            } else
                return res.error;
        })
        .then(() => dispatch(
            fetchBI()
        ))
};



