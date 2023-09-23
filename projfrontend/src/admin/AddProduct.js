import React, { useState } from "react";
import { API } from "../backend";

const product = {
  brand: "",
  name: "",
  category: "",
  price: 100,
  stock: 10,
  description: "",
};

function AddProduct() {
  const [formData, setFormData] = useState(product);

  const handleChange = (e) => {
    const data = { ...formData, [e.target.name]: e.target.value };
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, user } = JSON.parse(localStorage.getItem("jwt"));

    fetch(`${API}/product/create/${user._id}`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
      },
      body: formData,
    }).then((response) => {
      if (response) {
        alert("Product added successfully");
      }
    });
  };

  return (
    <div className="isolate bg-white px-6 py-3 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add Product
        </h2>
      </div>
      <form className="mx-auto mt-10 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Brand name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="brand"
                id="brand"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.brand}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Product name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="productName"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-2.5">
              <select
                id="category"
                name="category"
                className="h-full w-full rounded-md border-0 bg-transparent bg-none py-2 pl-4 pr-9 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={handleChange}
                value={formData.category}
              >
                <option value="" disabled={true}>
                  Select
                </option>
                <option value="polo">Polo</option>
                <option value="nike">Nike</option>
                <option value="half sleeves">half sleeves</option>
                <option value="full sleeves">full sleeves</option>
              </select>
            </div>
          </div>
          {/* <div className="sm:col-span-2">
            <label
              htmlFor="price"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="price"
                id="price"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="price"
                id="price"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.price}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Stock
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="stock"
                id="stock"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.stock}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                name="description"
                id="description"
                rows="4"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.description}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
