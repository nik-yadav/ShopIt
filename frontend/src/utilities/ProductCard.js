import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartSlice";
import { API } from "../backend";

function ProductCard({ product, onSelect }) {
  const [imageSrc, setImageSrc] = useState("");
  // let imageData = "";
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const { _id, brand, name, rating, reviews, price, mrp, off } = product;
  // console.log(`product/photo/${_id}`);
  // console.log(brand);
  useEffect(() => {
    if (!_id) return;
    fetch(`${API}/product/photo/${_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.success) {
          product.imageSrc = `${API}/images/${data.imageName}`;
          setImageSrc(product.imageSrc);
          // console.log(data.imageName);
        }
      });
    //     .then((data) => {
    //       // const url = URL.createObjectUrl(data.photo);
    //       console.log(data);
    //       setImageData(data);
    //       // setImageData(URL.createObjectURL(data));
    //       // console.log(data);
    //     });
  }, []);

  // const imageSrc = (() => {
  //   if (!product.imageSrc){}
  //     return "https://imgs.search.brave.com/aMhXcStaFIX3MeLAoqCkjesqSEYRvzToNnAOWOvMoos/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/ODk2NzUxMC9waG90/by9zdHlsaXNoLWJs/b25kZS1naXJsLXdl/YXJpbmctd2hpdGUt/dC1zaGlydC1hbmQt/Z2xhc3Nlcy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VXRj/azFoSkJWS3EwU2pC/cGlBbHFBTmlodHdJ/X0pJeE4xZ0NKU2lK/M1p1cz0";
  //   return product.imageSrc;
  // })();
  return (
    <div className="card  bg-base-100 hover:shadow-2xl border border-gray-100">
      <figure
        className="w-full flex items-center justify-center bg-blue-gray-50 p-2"
        style={{ height: "250px" }}
      >
        <img
          style={{ maxHeight: "200px", maxWidth: "100%" }}
          src={imageSrc}
          alt="Shoes"
          onClick={() => {
            onSelect(product);
          }}
        />
        {/* {imageData} */}
      </figure>
      <div className="card-body flex flex-col gap-1 p-3 text-center">
        <h2 className="card-title font-bold">{brand}</h2>
        <p className="font-medium">{name}</p>

        <div className="flex justify-center items-center">
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="ml-2 text-sm font-bold text-gray-900">{rating}</p>
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
          <Link
            to="#"
            className="text-sm font-medium text-gray-900 underline hover:no-underline"
          >
            {reviews} reviews
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="currency">&#8377;</div>
          <div className="price text-3xl font-medium mr-1"> {price}</div>
          <div className="mrp text-sm self-end font-medium text-gray-600 mr-2">
            M.R.P: &#8377; <span className="line-through">{mrp}</span>
          </div>
          <div className="off self-end text-sm">({off}% off)</div>
        </div>

        <div>
          <button
            className="flex mt-6 w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#E1AD01]"
            onClick={() => {
              dispatch(addToCart(product));
              console.log(cart);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
