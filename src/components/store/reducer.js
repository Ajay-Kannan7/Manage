let initialState={
    allData:null,
    doneData:null
}

let ManageReducer=(state=initialState,action)=>{
    if(action.type==="LOADDATA"){
        return{
            ...state,
            allData:action.payload
        }
    }
    if(action.type==="DONETASK"){   
        return{
            ...state,
            doneData:action.payload
        }
    }
    return{
        ...state
    }
}

export default ManageReducer