let initialState={
    allData:null
}

let ManageReducer=(state=initialState,action)=>{
    if(action.type==="LOADDATA"){
        return{
            ...state,
            allData:action.payload
        }
    }
    return{
        ...state
    }
}

export default ManageReducer