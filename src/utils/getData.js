import { setData } from "../app/slices/photographerSlice";

export const getData = async(dispatch) => {
    const response = await fetch("/data/photographers.json");
    const responseJS = await response.json();
    dispatch(setData(responseJS));
};