import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../backend";
export const tokenVerify = createAsyncThunk(
  "auth/tokenverify",
  async (body, thunkArgs) => {
    const data = await fetch(`${API}/authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(err);
      });
  }
);
