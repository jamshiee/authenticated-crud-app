import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../lib/axios";
import useStore from "../store/useStore.js";

const schema = z
  .object({
    department: z.string().min(1, "Department is required"),
    username: z.string().min(4, "Minimum of 4 characters"),
    userrole: z.string().min(1, "User Role is required"),
    password: z.string().min(8, "Minimum of 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
    firstname: z.string().min(3, "First Name is required"),
    lastname: z.string().min(3, "Last Name is required"),
    dob: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { dataChange, setDataChange, token, setCredentials } = useStore(
    (state) => state
  );

  const setSignout = () => {
    setCredentials(null);
    localStorage.removeItem("token");
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const res = await api.post("/user/adduser", data);
      setDataChange(!dataChange);
      reset();
      console.log("Value: ", dataChange);
    } catch (error) {
      console.log("Error while submitting: ", error);
    }
  };

  return (
    <div>
      <div className="border border-sky-500 rounded shadow bg-white">
        <div className="bg-sky-500 text-white text-2xl flex justify-between font-bold px-4 py-3">
          <div>Create Users</div>
          <button
            className="bg-red-500 p-1 hover:cursor-pointer text-white rounded-md "
            onClick={setSignout}
          >
            Log out
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2">
            <div className="flex">
              <div className="ps-2 py-5 w-48 bg-slate-200 border-r border-b border-gray-400">
                <label className="font-medium">
                  Department<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-full flex items-center border-r border-b border-gray-400 p-2">
                <select
                  {...register("department")}
                  className="w-full border px-2 py-1 font-medium rounded"
                >
                  <option value="" disabled selected hidden>
                    SELECT DEPARTMENT
                  </option>
                  <option>Cardio Department</option>
                  <option>Neurology Department</option>
                  <option>Ent Department</option>
                  <option>Physio Department</option>
                </select>
                {errors.department && (
                  <p className="text-red-500 text-sm">
                    {errors.department.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="ps-2 py-5 w-48 bg-slate-200 border-r border-b border-gray-400">
                <label className="font-medium">
                  User Name<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-full border-r border-b border-gray-400 p-2">
                <input
                  type="text"
                  {...register("username")}
                  className="w-full border px-2 py-1 font-medium rounded"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="ps-2 py-5 w-48 bg-slate-200 border-r border-b border-gray-400">
                <label className="font-medium">
                  User Role<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-full border-r border-b border-gray-400 p-2">
                <select
                  {...register("userrole")}
                  className="w-full border px-2 py-1 font-medium rounded"
                >
                  <option value="" disabled selected hidden>
                    SELECT ROLE
                  </option>
                  <option>Specialist</option>
                  <option>Analyst</option>
                  <option>Operator</option>
                </select>
                {errors.userrole && (
                  <p className="text-red-500 text-sm">
                    {errors.userrole.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="ps-2 py-5 w-48 bg-slate-200 border-r border-b border-gray-400">
                <label className="font-medium">
                  Password<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-full border-r border-b border-gray-400 p-2">
                <input
                  type="password"
                  {...register("password")}
                  className="w-full border px-2 py-1 font-medium rounded"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="ps-2 py-5 w-48 bg-slate-200 border-r border-b border-gray-400">
                <label className="font-medium">
                  First Name<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-full border-r border-b border-gray-400 p-2">
                <input
                  type="text"
                  {...register("firstname")}
                  className="w-full border px-2 py-1 font-medium rounded"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="ps-2 py-5 w-48 bg-slate-200 border-r border-b border-gray-400">
                <label className="font-medium">
                  Confirm Password<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-full border-r border-b border-gray-400 p-2">
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full border px-2 py-1 font-medium rounded"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="ps-2 py-5 w-48 bg-slate-200 border-r border-b border-gray-400">
                <label className="font-medium">
                  Last Name<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-full border-r border-b border-gray-400 p-2">
                <input
                  type="text"
                  {...register("lastname")}
                  className="w-full border px-2 py-1 font-medium rounded"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="ps-2 py-5 w-48 bg-slate-200 border-r border-b border-gray-400">
                <label className="font-medium">Date of Birth</label>
              </div>
              <div className="w-full border-r border-b border-gray-400 p-2">
                <input
                  type="date"
                  {...register("dob")}
                  className="w-full border px-2 py-1 font-medium rounded"
                />
              </div>
            </div>
          </div>

          <div className="my-5 flex justify-start pl-10 gap-4">
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-sky-600 text-white px-10 py-2 rounded"
            >
              {isSubmitting ? <p className="font-bold">Saved</p> : <p>Save</p>}
            </button>
            <button
              type="reset"
              //   disabled={isSubmitting}
              onClick={() => reset()}
              className="bg-sky-600 text-white px-10 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
