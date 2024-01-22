
const initialState = {
    techCrunch:{},
    appleHeadlines:{}
}

export const NewsApiReducer = (state = initialState,action) => {
   switch(action.type){
    case 'NEWS_CRUNCH_HEADLINES':
        return{
            ...state,
            techCrunch:action.payload
        }
        case 'NEWS_APPLE_HEADLINES':
            return{
                ...state,
                appleHeadlines:action.payload
            }
        default:
            return state;
   }
}