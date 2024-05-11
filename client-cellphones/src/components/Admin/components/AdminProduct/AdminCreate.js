import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  editCurrentPage,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";
import { Select } from "antd";

function AdminCreate(props) {
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState("");
  const SelectList = useSelector(state => state.selectList.List)
  const { pages } = useSelector((state) => state.allProduct.product);
  const { List } = useSelector((state) => state.allTypeProduct);
  const [colorList, setColorList] = useState([])
  const [sizeList, setSizeList] = useState([])
  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();
    if(!activeTypeProduct || !image) {
      alert('Chưa có hình ảnh và loại giày')
      return 
    }
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("brand", data.brand);
    formData.append("type", activeTypeProduct);
    formData.append("image", image);

    formData.append("os", data.os);
    formData.append("ram", data.ram);
    formData.append("battery", data.battery);
    formData.append("rom", data.rom);
    formData.append("camera", data.camera);
    formData.append("special", data.special);
    formData.append("design", data.design);
    formData.append("screen", data.screen);
    colorList?.forEach(color => {
      formData.append("colors", color);
    })
    sizeList?.forEach(size => {
      formData.append("sizes", size);
    })
    await dispatch(saveProduct(formData));
    await dispatch(editCurrentPage(pages));
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct === item.name
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
    setSizeList(value)
  };
  const handleChangeColor = (value) => {
    setColorList(value)
  };
  return (
    <div className="admin-create">
      <span>Create Product</span>
      <form
        className="admin-create-product"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <input required {...register("name")} placeholder="Name"></input>
        <input required
          {...register("amount")}
          placeholder="Amount"
          type="number"
        ></input>
        <input required {...register("price")} placeholder="Price" type="number"></input>
        <input required
          {...register("salePrice")}
          placeholder="SalePrice"
          type="number"
        ></input>
        <input required
          {...register("brand")}
          placeholder="Brand"
          type="string"
        ></input>
         <Select placeholder="Select color" 
            mode="multiple"
            size={'middle'}
            onChange={handleChangeColor}
            style={{ width: 200 }} value={colorList}
            options={colors}
          />
          <br />
          <Select placeholder="Select color"
            mode="multiple" value={sizeList}
            size={'middle'}
            onChange={handleChangeSize}
            style={{ width: 200 }}
            options={sizes}
        />
        <div className="filter-menu-firm">
          {
            List ? (List.map((item) => MenuFirmProduct(item))) : ''
          }
        </div>

        {SelectList && SelectList.length > 0
          ? SelectList.map((item) => (
              <div className="select-type">
                <select {...register(`${item.property}`)}>
                  <option>{item.name}</option>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminCreate;
const colors = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'orange', label: 'Orange' },
  { value: 'purple', label: 'Purple' },
  { value: 'pink', label: 'Pink' },
  { value: 'brown', label: 'Brown' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' }
];

const sizes = [
  { value: '30', label: '30' },
  { value: '31', label: '31' },
  { value: '32', label: '32' },
  { value: '33', label: '33' },
  { value: '34', label: '34' },
  { value: '35', label: '35' },
  { value: '36', label: '36' },
  { value: '37', label: '37' },
  { value: '38', label: '38' },
  { value: '39', label: '39' }
];
