import React, { useEffect, useState } from "react";
import { API } from "../backend";
// import { log } from "console";

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
  const [imageData, setImageData] = useState(null);
  const [categories, setCategories] = useState([{}]);

  // function convertToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // }

  const handleChange = (e) => {
    const data = { ...formData, [e.target.name]: e.target.value };
    setFormData(data);
  };

  const handleImage = async (e) => {
    // e.target.parentElement.setAttribute("class", "hidden");
    if (e.target.parentElement.querySelector("img"))
      e.target.parentElement.querySelector("img").remove();
    e.target.parentElement
      .querySelector("label")
      .setAttribute("class", "hidden");
    // console.log(e.target.closest("input"));
    const newImage = document.createElement("img");
    newImage.style.height = "300px";
    newImage.style.width = "300px";
    // newImage.style.objectFit = "none";

    const imageFile = e.target.files[0];
    // newImage.src = imageFile;
    newImage.src = URL.createObjectURL(imageFile);
    e.target.parentElement.appendChild(newImage);

    setImageData(imageFile);
    // console.log(newImage.src);

    // setFormData({ ...formData, imageFile: e.target.files[0] });

    e.target.parentElement.querySelector("button").style.display = "block";

    // const replaceImagebtn = document.createElement("button");
    // replaceImagebtn.addEventListener("click", handleImage);
    // replaceImagebtn.textContent = "replace image";
    // replaceImagebtn.classList =
    //   "block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

    // replaceImagebtn.addEventListener("click", () => {
    //   e.preventDefault();
    //   e.parentElement.querySelector("input").click();
    // });

    // e.target.parentElement.appendChild(replaceImagebtn);

    // newImage.src = URL.createObjectURL(e.target.value);
    console.log(e.target.parentElement.querySelector("label"));
    // console.log(e.target.parentElement);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, user } = JSON.parse(localStorage.getItem("jwt"));

    let formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    // console.log(ima)

    formDataToSend.append("photo", imageData);
    // formData.photo = imageData;
    // console.log(imageData);

    // console.log(JSON.stringify(formData));

    fetch(`${API}/product/create/${user._id}`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
      },
      body: formDataToSend,
    }).then((response) => {
      if (response) {
        alert("Product added successfully");
      }
    });
  };

  useEffect(() => {
    fetch(`${API}/categories`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let list = data.map((category) => ({
          id: category._id,
          name: category.name,
        }));
        setCategories(list);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="isolate bg-white px-6 py-3 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add Product
        </h2>
      </div>
      <form className="mx-auto mt-10 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="mt-2.5 sm:col-span-2 flex flex-col items-center">
            <label
              htmlFor="image"
              className="text-sm font-semibold leading-6 text-gray-900 flex flex-col items-center p-5 rounded-2xl bg-green-50 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Choose image to upload
            </label>
            <input
              type="file"
              name="image"
              id="image"
              autoComplete="given-name"
              className="hidden w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              // onChange={handleChange}
              value={formData.image}
              accept="image/png, image/jpeg"
              onChange={handleImage}
            />
            <button
              className="hidden w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => {
                e.preventDefault();
                e.target.parentElement.querySelector("input").click();
              }}
            >
              replace image
            </button>
          </div>
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
                <option key={0} value="" disabled={true}>
                  Select
                </option>
                {categories.map((category) => (
                  <option key={category.name} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
