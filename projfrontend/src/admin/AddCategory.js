import React, { useEffect, useState } from "react";
import { API } from "../backend";
import {
  TrashIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

function AddCategory() {
  const [categories, setCategories] = useState([{}]);
  const [open, setOpen] = useState({
    status: false,
    operation: "",
    id: "",
  });
  const [newCategory, setNewCategory] = useState({ name: "" });
  const { token, user } = JSON.parse(localStorage.getItem("jwt"));

  const handleRemove = (categoryId) => {
    fetch(`${API}/category/${categoryId}/${user._id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(() => {
        let updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
      })
      .catch((err) => {
        console.log("unable to fetch", err);
      });
  };

  const handleOperation = () => {
    let url = `${API}/category/create/${user._id}`;
    let method = "POST";
    if (!open.operation) return;
    else if (open.operation === "Update") {
      url = `${API}/category/${open.id}/${user._id}`;
      method = "PUT";
    }

    fetch(url, {
      method,
      headers: {
        Accept: "applicaton/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.category.name + ` was ${open.operation}d successfully`);
        setCategories((prevState) => {
          // filter out the existing info of modified category
          let updatedState = prevState.filter(
            (category) => category.id !== data.category._id
          );

          // push the latest info recieved from server into the state
          updatedState.push({
            id: data.category._id,
            name: data.category.name,
            createdAt: new Date(data.category.createdAt).toString(),
            updatedAt: new Date(data.category.updatedAt).toString(),
          });
          return updatedState;
        });
      });
  };

  const handleClick = (operation, id) => {
    if (operation === "Create") setOpen({ operation, status: true });
    else
      setOpen({
        operation,
        status: true,
        id,
      });
    console.log(open);
  };

  useEffect(() => {
    fetch(`${API}/categories`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let list = data.map((category) => {
          return {
            id: category._id,
            name: category.name,
            createdAt: new Date(category.createdAt).toString(),
            updatedAt: new Date(category.updatedAt).toString(),
          };
        });
        setCategories(list);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="flex flex-col p-10">
        <div className="flex justify-between items-center mb-5 ml-5">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Categories
          </h2>
          <button
            className="p-2 bg-gray-100 text-gray-800 hover:bg-[#E1AD01] hover:text-white font-medium border border-gray-400 rounded-2xl shadow-xl"
            onClick={() => {
              handleClick("Create");
            }}
          >
            + Add Category
          </button>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="w-full table-fixed text-left text-sm font-light">
                <thead className="border-b bg-gray-900 text-white font-medium">
                  <tr>
                    <th scope="col" className="px-3 py-4">
                      #
                    </th>
                    <th scope="col" className="px-3 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-4">
                      Created At
                    </th>
                    <th scope="col" className="px-3 py-4">
                      Updated At
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={index} className="border-b hover:bg-green-50">
                      <td className="px-3 py-4 font-semibold">{index + 1}</td>
                      <td className="px-3 py-4 uppercase">{category.name}</td>
                      <td className="px-3 py-4">{category.createdAt}</td>
                      <td className="px-3 py-4">{category.updatedAt}</td>
                      <td className="px-3 py-4">
                        <TrashIcon
                          className="h-5 w-5 cursor-pointer"
                          onClick={() => {
                            handleRemove(category.id);
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <PencilSquareIcon
                          className="h-5 w-5 cursor-pointer"
                          onClick={() => {
                            handleClick("Update", category.id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {open.status && (
        <div className="absolute grid place-items-center inset-0">
          <form className="relative w-5/12 px-8 pt-14 pb-12 mb-4 bg-white border shadow-md rounded">
            <div className="absolute right-4 top-2 flex items-center">
              <button
                type="button"
                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setOpen({ ...open, status: false })}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            <h2 className="text-3xl font-bold text-center mb-10 tracking-tight text-gray-900 sm:text-4xl">
              {open.operation} Category
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category name"
              >
                Category name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category name"
                type="text"
                placeholder="Category"
                value={newCategory.name}
                onChange={(e) => {
                  setNewCategory({ name: e.target.value });
                }}
              />
            </div>

            <button
              className="bg-[#E1AD01] hover:bg-gray-100 hover:text-gray-800 hover:border border-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-2"
              type="button"
              onClick={handleOperation}
            >
              {open.operation}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AddCategory;
