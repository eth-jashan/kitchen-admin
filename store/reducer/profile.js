import { ADD_CUISINE } from "../action/profile"

const initialState = {
    cuisine:[],
    name:null,
    number:null,
    email:null
}

export default (state = initialState, action) => {

    switch(action.type){
        case ADD_CUISINE:
            
            const cuisine = state.cuisine
            const status = cuisine.includes(action.name)
            console.log('status', status, cuisine)

            if(status){

                return{
                    ...state,
                    cuisine:cuisine.filter(x=> x != action.name)
                }
            }else{
                console.log('list',cuisine.concat(action.name) )
                return{
                    ...state,
                    cuisine:cuisine.concat(action.name)
                }
            } 
        
        default:
            return state
    }

}