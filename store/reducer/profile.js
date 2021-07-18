import Kyc from "../../model/Kyc"
import Profile from "../../model/Profile"
import { ADD_CUISINE, UPDATE_ACC,SIGNUP_ACCOUNT, ADD_KYC, CHECK_USER,CREATE, FETCH_STATUS, FETCH_CHEF, UPDATE_CHEF, USER_CUISINE, USER_RECOMMEDED, ADD_RECOMMEDED } from "../action/profile"

const initialState = {

    kyc:[],
    cuisine:[],
    chef:[],
    recommeded:[],
    status:null,
    name:null,
    number:null,
    email:null,
    kycStatus:null,
    created:false,
    profileId:null,
    uid:null,
    token:null,

}

export default (state = initialState, action) => {

    switch(action.type){
        case CREATE:
            return{
                ...state,
                uid:action.userid,
                token:action.tokenid,
                profileId:action.id
            }
        case CHECK_USER:
            return{
                ...state,
                status:action.status
            }
        case USER_CUISINE:
            return{
                ...state,
                cuisine:action.data
            }
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

        case USER_RECOMMEDED:
            return{
                ...state,
                recommeded:action.data
            }
        case ADD_RECOMMEDED:
            
            const recommeded = state.recommeded
            const status1 =recommeded.includes(action.id)
            console.log('status', status1, recommeded)

            if(status1){
                console.log('list',recommeded.concat(action.id) )
                return{
                    ...state,
                    recommeded:recommeded.filter(x=> x != action.id)
                }
            }else{
                return{
                    ...state,
                    recommeded:recommeded.concat(action.id)
                }
            } 

            case SIGNUP_ACCOUNT:

                console.log("reducer", action.data.uid, action.data.id)
                
                return{
                    ...state,
                    name:action.data.name,
                    number:action.data.number,
                    email:action.data.email,
                    profileId:action.data.id,
                    kycStatus:false,
                    created:false,
                    uid:action.data.uid,
                    token:action.data.token
                }

            case ADD_KYC:
                const kyc = new Kyc(
                    action.kycDetails.id,
                    action.kycDetails.name,
                    action.kycDetails.phone,
                    action.kycDetails.adharNo,
                    action.kycDetails.adharURL,
                    action.kycDetails.fssiNo,
                    action.kycDetails.fssiUrl,
                    action.kycDetails.panNo,
                    action.kycDetails.panUrl,
                    action.kycDetails.Bank,
                    action.kycDetails.Branch,
                    action.kycDetails.AccName,
                    action.kycDetails.Accno,
                    action.kycDetails.IFSC,
                    action.kycDetails.chefId,
                    action.kycDetails.status
                )
                return{
                    ...state,
                    kyc:state.kyc.concat(kyc),
                    kycStatus:action.kycDetails.status
                }
            case FETCH_STATUS:
                const data=action.data.filter(x=>x.chefId==action.uid)
                if(data.length!=0){
                    return{
                        ...state,
                        kycStatus:data[0].status,
                        kyc:data
                    }
                }
                else{
                    return state
                }
            case FETCH_CHEF:
                return{
                    ...state,
                    chef:action.pData.filter(x=>x.uid === action.uid)
                }
            case UPDATE_CHEF:
                const chefIndex = state.chef.findIndex(
                    chef => chef.id === action.data.id
                );
                const chef=new Profile(
                    state.chef[chefIndex].id,
                    action.data.name,
                    state.chef[chefIndex].email,
                    state.chef[chefIndex].phone,
                    action.data.cuisine,
                    state.chef[chefIndex].type,
                    state.chef[chefIndex].address,
                    state.chef[chefIndex].useraddress,
                    state.chef[chefIndex].created,
                    state.chef[chefIndex].kyc,
                    state.chef[chefIndex].uid,
                    state.chef[chefIndex].lat,
                    state.chef[chefIndex].long,
                    state.chef[chefIndex].pincode,
                    action.data.imguri,
                    action.data.bguri,
                    action.data.recommeded

                )
                const copychef=[...state.chef]
                copychef[chefIndex]=chef
                return{
                    ...state,
                    chef:copychef
                }

        default:
            return state
    }

}