import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import FormInput from "./FormInput";
import { useRouter } from "next/router";
import * as Yup from "yup";
import "yup-phone";

interface RegisterValues {
  fullName: string;
  phoneNumber: Number | string;
  password: string;
  confirmPassword: string;
  referralCode: string;
  termsAndCondition: Boolean;
}

const RegisterForm = () => {
  const SignupSchema = Yup.object().shape({
    fullName: Yup.string().required("Please enter your full name"),
    phoneNumber: Yup.string()
      .phone("NP", true)
      .typeError("custom error")
      .required("Please enter your Phone Number"),
    password: Yup.string().required("Please enter your password"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    referralCode: Yup.string(),
    termsAndCondition: Yup.bool().oneOf(
      [true],
      "You need to accept the terms and conditions"
    ),
  });
  const initialValues: RegisterValues = {
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    termsAndCondition: false,
  };
  const router = useRouter();
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Register a new Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched, handleChange, handleSubmit }) => (
              <Form>
                <FormInput
                  name="fullName"
                  labelName="Full Name"
                  type="fullName"
                />
                <div
                  className="text-sm font-semibold  my-2
                    "
                >
                  <ErrorMessage name="fullName" />
                </div>
                <FormInput
                  name="phoneNumber"
                  labelName="Phone Number"
                  type="tel"
                  placeholder="+977 9815438919"
                />
                <div
                  className="text-sm font-semibold  my-2
                    "
                >
                  <ErrorMessage name="phoneNumber" />
                </div>
                <FormInput
                  name="password"
                  labelName="Password"
                  type="Password"
                />
                <div
                  className="text-sm font-semibold  my-2
                    "
                >
                  <ErrorMessage name="password" />
                </div>
                <FormInput
                  name="confirmPassword"
                  labelName="Confirm Password"
                  type="password"
                />
                <div
                  className="text-sm font-semibold  my-2
                "
                >
                  <ErrorMessage name="confirmPassword" />
                </div>

                <FormInput
                  name="referralCode"
                  labelName="Referral Code"
                  type="text"
                />
                <div
                  className="text-sm font-semibold  mt-2
                    "
                >
                  <ErrorMessage name="referralCode" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      id="remember-me"
                      name="termsAndCondition"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to all the{" "}
                      <span className="underline text-blue-600 ">
                        <a href="#">Terms and Conditions</a>{" "}
                      </span>
                    </label>
                  </div>
                </div>
                <div
                  className="text-sm font-semibold  mt-2
                    "
                >
                  <ErrorMessage name="termsAndCondition" />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Register
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-6">
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Already have an account
                </span>
              </div>
            </div>

            <div className="">
              <div>
                <button
                  onClick={() => {
                    router.push("/");
                    console.log("handle Click");
                  }}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 "
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
