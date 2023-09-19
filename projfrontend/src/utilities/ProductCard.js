import React from "react";
import { Link } from "react-router-dom";

function ProductCard({
  product: { brand, name, rating, reviews, price, mrp, off },
}) {
  return (
    <div className="card w-80 h-96 bg-base-100 hover:shadow-2xl border border-gray-100">
      <figure>
        <img
          src="https://imgs.search.brave.com/aMhXcStaFIX3MeLAoqCkjesqSEYRvzToNnAOWOvMoos/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/ODk2NzUxMC9waG90/by9zdHlsaXNoLWJs/b25kZS1naXJsLXdl/YXJpbmctd2hpdGUt/dC1zaGlydC1hbmQt/Z2xhc3Nlcy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VXRj/azFoSkJWS3EwU2pC/cGlBbHFBTmlodHdJ/X0pJeE4xZ0NKU2lK/M1p1cz0"
          alt="Shoes"
        />
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
          <div class="currency">&#8377;</div>
          <div class="price text-3xl font-medium mr-1"> {price}</div>
          <div className="mrp text-sm self-end font-medium text-gray-600 mr-2">
            M.R.P: &#8377; <span className="line-through">{mrp}</span>
          </div>
          <div className="off self-end text-sm">({off}% off)</div>
        </div>

        {/* <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div> */}
      </div>
    </div>
  );
}

export default ProductCard;
