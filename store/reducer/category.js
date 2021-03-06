import Category from '../../model/Category'
import { ADD_CATEGORY, DELETE_CAT, EDIT_CATEGORY, EDIT_URL, FETCH_CATEGORY, STORE_CAT_ID } from "../action/category"

const initialState={
    category:[],
    catId:null
}

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD_CATEGORY:
            const cat=new Category(
                action.data.id,
                action.data.uid,
                action.data.name,
                action.data.description,
                action.data.imguri,
                action.data.lat,
                action.data.long,
                action.data.chefId
            )
            return{
                ...state,
                category:state.category.concat(cat)
            }
        case FETCH_CATEGORY:
            return{
                ...state,
                category:action.data.filter(x=>x.uid==action.userid)
            }
        case EDIT_CATEGORY:
            const catIndex = state.category.findIndex(
                x => x.id === action.data.id
            );
            const updatedcat=new Category(
                catIndex,
                state.category[catIndex].uid,
                action.data.name,
                action.data.description,
                state.category[catIndex].imguri,
                action.data.lat,
                action.data.long,
                state.category[catIndex].chefId
            )
            const Category1=[...state.category]
            Category1[catIndex]=updatedcat
            return{
                ...state,
                category:Category1
            }
        case EDIT_URL:
            const index = state.category.findIndex(
                x => x.id === action.data.id
            );
            const updatedcategory=new Category(
                index,
                state.category[index].uid,
                action.data.name,
                action.data.description,
                action.data.imguri,
                action.data.lat,
                action.data.long,
                state.category[index].chefId
            )
            const Category2=[...state.category]
            Category2[index]=updatedcategory
            return{
                ...state,
                category:Category2
            }
        case DELETE_CAT:
            return{
                ...state,
                category:state.category.filter(x=>x.id!=action.pid)
            }
        case STORE_CAT_ID:{
            return{
                ...state,
                catId:action.catId
            }
        }
        default:return state;
    }

}