import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  getproductById,
  removeProductById,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory, useParams } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { EditTypeProduct, getTypeProductById, removeTypeProductById } from "actions/ListTypeProductAction";

function AdminUpdateCategory(props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const { productTypeById } = useSelector((state) => state.allTypeProduct);
  console.log(productTypeById)
  useEffect(() => {
    dispatch(getTypeProductById(id))
    return () => {
      dispatch(removeTypeProductById());
    };
  }, [dispatch, id ]);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, []);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, []);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append("name", data.name || productTypeById.name);
    formData.append("image", image);
    formData.append("_id", id);

    await dispatch(EditTypeProduct(formData));
    history.push("/admin/category");
  };

  return (
    <div className="admin-create">
      <span>Edit category</span>
      {productTypeById ? (
        <form
          className="admin-create-product"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <input
            {...register("name")}
            placeholder="Name"
            defaultValue={productTypeById.name}
          ></input>
          <img src={productTypeById.img} height={60} width={60} alt=""  key={productTypeById.img}/>
          <input
            type="file"
            {...register("image")}
            onChange={handleFileImageChange}
          ></input>
          <button type="submit">Update Product</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminUpdateCategory;
