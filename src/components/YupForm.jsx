// npm i yup @hookform/resolvers

import React from "react";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().required("User Name is required"),
    email: yup.string().email("Invalid Email format").required("Email is required"),
    channel: yup.string().required("channel is required")
})

const YupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
        username: "",
        email: "",
        channel: ""
    },
    resolver: yupResolver(schema)

  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Yup Form </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default YupForm;
