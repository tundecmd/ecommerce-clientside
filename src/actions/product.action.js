import axiosInstance from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductBySlug = slug => {
    return async dispatch => {
        const res = await axiosInstance.get(`/products/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            });
        } else {
            
        }
        // console.log(`res`, res)
    }
}

export const getProductPage = payload => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            console.log('2', payload);
            const res = await axiosInstance.get(`/page/${cid}/${type}`);
            console.log('', res)
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                console.log(page);
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                })
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                })
            }
            // console.log(`res`, res)
        } catch (error) {
            console.log(error);
        }
    }
}