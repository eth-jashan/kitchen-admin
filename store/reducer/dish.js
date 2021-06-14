import Dish from "../../model/Dish"
import { ADD_DISH } from "../action/dish"
import { ADD_CUISINE } from "../action/profile"

const initialState = {

    cuisine:[],
    dish:[]

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
        case ADD_DISH:
            const newDish=new Dish(
                action.data.id,
                action.data.name,
                action.data.description,
                action.data.imguri,
                action.data.spicy,
                action.data.cuisine,
                action.data.price,
                action.data.noServe,
                action.data.quantity,
                action.data.categoryid,
                action.data.categoryname,

            )
            return{
                ...state,
                dish:state.dish.concat(newDish)
            }
        default:
                return state 
    }

}