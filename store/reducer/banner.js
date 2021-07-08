import Banner from "../../model/Banner"
import { ADD_BANNER, FETCH_BANNER } from "../action/banner"

const initialState={
    banner:[]
}

export default BannerHandler=(state=initialState,action)=>{
    switch(action.type){
        case ADD_BANNER:
            const newBanner=new Banner(
                action.data.id,
                action.data.name,
                action.data.description,
                action.data.imguri,
                action.data.chefid,
                action.data.dishid,
                action.data.catid,
                action.data.textid
            )
            return{
                ...state,
                banner:state.banner.concat(newBanner)
            }
        case FETCH_BANNER:
            return{
                ...state,
                banner:action.data.filter(x=>x.chefid==action.uid)
            }
        default:return state
    }
}