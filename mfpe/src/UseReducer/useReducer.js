export const initialState = {"isAdmin":null,"isLoggedIn":null , "user":""};

export const reducer = (state,action)=>{
    if(action.type==='USER'){
        return action.payload;
    }
    if(action.type==='ADMIN'){
        return action.payload1;
    }
    return state;
}