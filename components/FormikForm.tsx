import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/router";

import FormInput from "./FormInput";

interface MyFormValues {
  email: string;
  password: string;
}

export default function FormikForm() {
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("E-mail is Required!!"),
    password: Yup.string().required("Please enter your password").min(6),
  });

  const initialValues: MyFormValues = { email: "", password: "" };

  const router = useRouter();

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 md:text-2xl ">
            Login to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                console.log(values);
                console.log(" I am clicked");
              }}
              validateOnMount
            >
              {({ errors, touched, handleChange, handleSubmit, isValid }) => (
                <Form>
                  <FormInput name="email" labelName="E-mail" type="email" />
                  <div
                    className="text-sm font-semibold  mt-2
                    "
                  >
                    <ErrorMessage name="email" />
                  </div>
                  <br />
                  <FormInput
                    name="password"
                    labelName="Password"
                    type="Password"
                  />
                  <div
                    className="text-sm font-semibold  mt-2
                    "
                  >
                    <ErrorMessage name="password" />
                  </div>

                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={!isValid}
                      onClick={() => {
                        router.push("/products");
                      }}
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none "
                    >
                      Login
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
                    Do not have an account
                  </span>
                </div>
              </div>

              <div className="">
                <div>
                  <button
                    onClick={() => {
                      router.push("/register");
                      console.log("handle Click");
                    }}
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none "
                  >
                    Create New Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
