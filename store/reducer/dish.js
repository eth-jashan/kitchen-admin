import Dish from "../../model/Dish"
import { ADD_DISH, DELETE_DISH, EDIT_DISH, EDIT_DISH_WITHOUT_IMG, FETCHDISH } from "../action/dish"
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
                action.data.cuisinetype,
                action.data.uid,
                action.data.lat,
                action.data.long,
                action.data.type,
                action.data.chefId

            )
            return{
                ...state,
                dish:state.dish.concat(newDish)
            }
        case FETCHDISH:
            return{
                ...state,
                dish:action.data
            }
        case EDIT_DISH_WITHOUT_IMG:{
            const dishIndex = state.dish.findIndex(
                dish => dish.id === action.updatedDish.id
            );
            const updatedDish = new Dish(
                state.dish[dishIndex].id,
                action.updatedDish.name,
                action.updatedDish.description,
                state.dish[dishIndex].imguri,
                action.updatedDish.spicy,
                state.dish[dishIndex].cuisine,
                action.updatedDish.price,
                action.updatedDish.noServe,
                action.updatedDish.quantity,
                action.updatedDish.categoryid,
                action.updatedDish.categoryname,
                action.updatedDish.uid,
                action.updatedDish.cuisinetype,
                action.updatedDish.lat,
                action.updatedDish.long,
                action.updatedDish.type,
                state.dish[dishIndex].chefId

            );
            const updatedUserDish = [...state.dish];
            updatedUserDish[dishIndex] = updatedDish

            return{
                ...state,
                dish:updatedUserDish
            }

        }
        case EDIT_DISH:{
            const dishIndex = state.dish.findIndex(
                dish => dish.id === action.updatedDish.id
            );
            const updatedDish = new Dish(
                state.dish[dishIndex].id,
                action.updatedDish.name,
                action.updatedDish.description,
                action.updatedDish.imguri,
                action.updatedDish.spicy,
                state.dish[dishIndex].cuisine,
                action.updatedDish.price,
                action.updatedDish.noServe,
                action.updatedDish.quantity,
                state.dish[dishIndex].categoryid,
                state.dish[dishIndex].categoryname,
                state.dish[dishIndex].uid,
                state.dish[dishIndex].lat,
                state.dish[dishIndex].long,
                action.updatedDish.type

            );
            const updatedUserDish = [...state.dish];
            updatedUserDish[dishIndex] = updatedDish

            return{
                ...state,
                dish:updatedUserDish
            }
        }
        case DELETE_DISH:{
            return{
                ...state,
                dish: state.dish.filter(
                    d => d.id !== action.dishId
                )
            }
        }
        default:
                return state 
    }

}