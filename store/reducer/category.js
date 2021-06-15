import Category from "../../model/Category"
import { ADD_CATEGORY, FETCH_CATEGORY } from "../action/category"

const initialState={
    category:[]
}

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD_CATEGORY:
            const cat=new Category(
                action.data.id,
                action.data.name,
                action.data.description,
                action.data.imguri
            )
            return{
                ...state,
                category:state.category.concat(cat)
            }
        case FETCH_CATEGORY:
            return{
                ...state,
                category:action.data
            }
        default:return state;
    }

}