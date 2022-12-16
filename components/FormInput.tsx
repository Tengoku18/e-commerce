import { Field } from "formik";

interface InputField {
  name: string;
  type: string;
  labelName: string;
  placeholder?: string;
}

const FormInput = ({ labelName, name, type, placeholder }: InputField) => {
  return (
    <div className="flex flex-col ">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 "
      >
        {" "}
        {labelName}{" "}
      </label>
      <Field
        className="block mt-1  appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
