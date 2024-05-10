import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { deleteTypeProduct, paginationCategory } from 'actions/ListTypeProductAction';
import { paginationProduct } from 'actions/ProductAction';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Category = (props) => {
  const { category, number } = props;
    const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.allProduct.currentPage);

  const handleDeleteProductCategory = async (category) => {
    await dispatch(deleteTypeProduct(category));
    dispatch(paginationCategory(1))
  };

  return (
    <tr>
    <td>{number + 1}</td>
    <td>
      <img src={category.img}></img>
    </td>
    <td>{category.name}</td>
    <td
      className="delete-product"
      onClick={(e) => handleDeleteProductCategory(category)}
    >
      <DeleteOutlined />
    </td>
    <td className="update-product">
      <Link to={`/admin/category/update/${category._id}`}>
        <EditOutlined></EditOutlined>
      </Link>
    </td>
  </tr>
  )
}

export default Category