import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Form, redirect, Link } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  //The request.formData() method returns a promise that resolves to a FormData object. Since it returns a promise, you need to use await to wait for the promise to resolve and get the FormData object.
  const formData = await request.formData(); //get the formData from request
  const data = Object.fromEntries(formData); //convert form data to an obj
  try {
    const response = await customFetch.post(`/auth/local/register/`, data);
    // console.log(response);
    toast.success("account created successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || "please check your info";
    toast.error(errorMessage);
    // console.error(error.response.data.error.message);
    return null;
  }
  return null;
};
const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          label="username"
          name="username"
          type="text"
          defaultValue="username"
        />
        <FormInput
          label="email"
          name="email"
          type="email"
          defaultValue="text@test.com"
        />
        <FormInput label="password" name="password" type="password" />
        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
