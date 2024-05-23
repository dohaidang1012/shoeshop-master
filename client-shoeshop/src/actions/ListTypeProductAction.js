import axios from 'axios'
import { axiosClient } from 'services/config.services';

export const getAllTypeProduct = () => async (dispatch) => {
    try {
        const {data} = await axios.get('http://localhost:4000/typeList')
        dispatch({type: 'GET_ALL_TYPE_PRODUCT', payload: data})
    } catch (error) {
    }
}

export const paginationCategory = (page) => async (dispatch) => {
    try {
      const data = await axiosClient.get(
        `/typeList/pagination/${page}`
      );
      dispatch({ type: "PAGINATION_CATEGORY", payload: data });
    } catch (error) {
    }
  };

export const CreateNewTypeProduct = (type) => async (dispatch) => {
    try {
        const {data} = await axios.post(`http://localhost:4000/typeList/create`, type)
        dispatch({type: 'CREATE_NEW_TYPE_PRODUCT', payload: data})
    } catch (error) {
    }
}

export const deleteTypeProduct = (type) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`http://localhost:4000/typeList/delete/${type._id}`)
        dispatch({type: 'DELETE_TYPE_PRODUCT', payload: data})
    } catch (error) {
    }
}

export const EditTypeProduct = (type) => async (dispatch) => {
    try {
        const {data} = await axios.put(`http://localhost:4000/typeList/update`, type)
        dispatch({type: 'EDIT_TYPE_PRODUCT', payload: data})
    } catch (error) {
    }
}

export const getTypeProductById = (id) => async(dispatch) => {
    try {
        const {data} = await axiosClient.get(`/typeList/${id}`)
        dispatch({type: 'GET_TYPE_PRODUCT_BY_ID', payload: data})
    } catch (error) {
        
    }
}

export const removeTypeProductById = () => (dispatch) => {
    try {
        dispatch({type: 'REMOVE_TYPE_PRODUCT_BY_ID', payload: {}})
    } catch (error) {
        console.log(error)
    }
}