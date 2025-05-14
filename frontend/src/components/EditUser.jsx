import React from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../store/useStore";
import api from "../lib/axios";

const schema = z
  .object({
    department: z.string().min(1, "Department is required"),
    username: z.string().min(4, "Minimum of 4 characters"),
    userrole: z.string().min(1, "User Role is required"),
    isActive: z.string().min(1, "Status is required"),
    firstname: z.string().min(3, "First Name is required"),
    lastname: z.string().min(3, "Last Name is required"),
    dob: z.string().optional(),
  });

const EditUser = ({ open, onClose, user }) => {

    const { dataChange,setDataChange } = useStore((state) => state);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

    const onSubmit = async (data) => {
      try {
        console.log("Edited Data:", data);
        console.log(user._id)
        const res = await api.put(`/user/edituser/${user._id}`, data);
        setDataChange(!dataChange)
        reset();
        console.log("Value: ",dataChange)
        onClose();
      } catch (error) {
        console.log("Error while submitting: ", error);
      }
    };

    const deleteUser = async()=>{
        try {
            const res = await api.delete(`/user/deleteuser/${user._id}`);
            reset();
            window.location.reload();
            onClose();

          } catch (error) {
            console.log("Error while submitting: ", error);
          }
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <div>

          <div className="border border-sky-500 rounded shadow bg-white">
            <div className="bg-sky-500 text-white text-center text-3xl font-bold px-4 py-3">
              Edit User
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
                      defaultValue={user.department}
                      className="w-full border px-2 py-1 font-medium rounded"
                    >
                      <option value="" disabled hidden>
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
                      defaultValue={user.username}
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
                      defaultValue={user.userrole}
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
                      User Status<span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="w-full border-r border-b border-gray-400 p-2">
                    <select
                      defaultValue={user.isActive}
                      {...register("isActive")}
                      className="w-full border px-2 py-1 font-medium rounded"
                    >
                      <option value="" disabled selected hidden>
                        SELECT STATUS
                      </option>
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                    {errors.isActive && (
                      <p className="text-red-500 text-sm">
                        {errors.isActive.message}
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
                    defaultValue={user.firstname}
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
                      Last Name<span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="w-full border-r border-b border-gray-400 p-2">
                    <input
                    defaultValue={user.lastname}
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
                    defaultValue={user.dob}
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
                  <p>Save</p>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={deleteUser}
                  className="bg-red-600 text-white  px-10 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditUser;
