import axios from "axios";
import { apilist } from "../api/config";

export const TopHeadlines =async () => {
  try{
    const response = await axios.get(apilist["top-headlines"])
    return response.data.articles;
  }catch(error){
    console.log(error)
  }
}


export const CrunhHeadliness = () => async (dispatch) => {
  try{
    const response = await axios.get(apilist["tech-crunch"])
     dispatch({
      type:"NEWS_CRUNCH_HEADLINES",
      payload:response.data
     })
  }catch(error){
    console.log(error)
  }
}


export const AppleHeadlinesApi = () => async(dispatch) => {
  try{
    const response = await axios.get(apilist["apple-headlines"])
    dispatch({
      type:"NEWS_APPLE_HEADLINES",
      payload:response.data
    })
  }catch(error){
    console.log(error)
  }
}

