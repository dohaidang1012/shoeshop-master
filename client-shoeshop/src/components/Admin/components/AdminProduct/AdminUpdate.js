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
import { Select } from "antd";

function AdminUpdate(props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const detailProduct = useSelector((state) => state.getProductById.product);
  const SelectList = useSelector((state) => state.selectList.List);
  const [activeTypeProduct, setActiveTypeproduct] = useState(undefined);
  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    setColorList(detailProduct?.colors);
    setSizeList(detailProduct?.sizes);
    return () => {};
  }, [detailProduct]);

  useEffect(() => {
    dispatch(getproductById(id));

    return () => {
      dispatch(removeProductById());
    };
  }, [dispatch, id]);

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
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("brand", data.brand);
    <input
      required
      {...register("brand")}
      placeholder="Brand"
      type="string"
    ></input>;
    formData.append(
      "type",
      activeTypeProduct ? activeTypeProduct : detailProduct.type
    );
    formData.append("image", image);
    formData.append("_id", id);
    colorList?.forEach((color) => {
      formData.append("colors", color);
    });
    sizeList?.forEach((size) => {
      formData.append("sizes", size);
    });

    // formData.append("os", data.os);
    // formData.append("ram", data.ram);
    // formData.append("battery", data.battery);
    // formData.append("rom", data.rom);
    // formData.append("camera", data.camera);
    // formData.append("special", data.special);
    // formData.append("design", data.design);
    // formData.append("screen", data.screen);

    await dispatch(saveProduct(formData));
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct
          ? activeTypeProduct === item.name
            ? `filter-menu-firm-item active`
            : "filter-menu-firm-item"
          : detailProduct.type === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img}></img>
    </div>
  );

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };
  const handleChangeSize = (value) => {
    setSizeList(value);
  };
  const handleChangeColor = (value) => {
    setColorList(value);
  };
  console.log(detailProduct)
  return (
    <div className="admin-create">
      <span>Update Product</span>
      {detailProduct ? (
        <form
          className="admin-create-product"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <input
            required
            {...register("name")}
            placeholder="Name"
            defaultValue={detailProduct.name}
          ></input>
          <input
            required
            {...register("amount")}
            placeholder="Amount"
            type="number"
            defaultValue={detailProduct.amount}
          ></input>
          <input
            required
            {...register("price")}
            placeholder="Price"
            type="number"
            defaultValue={detailProduct.price}
          ></input>
          <input
            required
            {...register("salePrice")}
            placeholder="SalePrice"
            type="number"
            defaultValue={detailProduct.salePrice}
          ></input>
          <input
            required
            defaultValue={detailProduct.brand}
            {...register("brand")}
            placeholder="Brand"
            type="string"
          ></input>
          <Select
            placeholder="Select color"
            mode="multiple"
            size={"middle"}
            onChange={handleChangeColor}
            style={{ width: 200 }}
            value={colorList}
            options={colors}
            defaultValue={detailProduct.colors}
          />
          <br />
          <Select
            placeholder="Select size"
            mode="multiple"
            value={sizeList}
            size={"middle"}
            onChange={handleChangeSize}
            style={{ width: 200 }}
            defaultValue={detailProduct.sizes}
            options={sizes}
          />
          <br />
          <div className="filter-menu-firm">
            {List ? List.map((item) => MenuFirmProduct(item)) : ""}
          </div>

          {SelectList && SelectList.length > 0
            ? SelectList.map((item) => (
                <div className="select-type">
                  <select
                    {...register(`${item.property}`)}
                    defaultValue={detailProduct[`${item.property}`]}
                  >
                    {item.options.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </select>
                </div>
              ))
            : ""}

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

export default AdminUpdate;
const colors = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "purple", label: "Purple" },
  { value: "pink", label: "Pink" },
  { value: "brown", label: "Brown" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
];

const sizes = [
  { value: "30", label: "30" },
  { value: "31", label: "31" },
  { value: "32", label: "32" },
  { value: "33", label: "33" },
  { value: "34", label: "34" },
  { value: "35", label: "35" },
  { value: "36", label: "36" },
  { value: "37", label: "37" },
  { value: "38", label: "38" },
  { value: "39", label: "39" },
  { value: "40", label: "40" },
  { value: "41", label: "41" },
  { value: "42", label: "42" },
  { value: "43", label: "43" },
];
