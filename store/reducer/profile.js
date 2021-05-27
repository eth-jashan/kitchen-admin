import Profile from "../../model/Profile"
import { ADD_CUISINE, UPDATE_ACC,SIGNUP_ACCOUNT } from "../action/profile"

const initialState = {
    cuisine:[],
    chef:[],
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
            case SIGNUP_ACCOUNT:
                const profile=new Profile(
                    action.data.id,
                    action.data.name,
                    action.data.email,
                    action.data.phone,
                    action.data.cuisine,
                    action.data.type,
                    action.data.address,
                    action.data.useraddress,
                    action.data.created,
                    action.data.kyc
                ) 
                return{
                    ...state,
                    chef:state.chef.concat(profile)
                }
            case UPDATE_ACC:
                const cindex=state.chef.findIndex(c=>c.id==action.cid)
                const chefcopy=[...state.chef]
                const cprofile=new Profile(
                    action.cid,
                    state.chef[cindex].name,
                    action.data.email,
                    state.chef[cindex].phone,
                    action.data.cuisine,
                    action.data.type,
                    state.chef[cindex].address,
                    state.chef[cindex].useraddress,
                    state.chef[cindex].created,
                    state.chef[cindex].kyc
                )
                chefcopy[cindex]=cprofile
                return{
                    ...state,
                    chef:chefcopy
                }
        default:
            return state
    }

}