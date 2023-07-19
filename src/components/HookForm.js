import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";

let renderCount = 0;

const HookForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel:"",
      social: {
        twitter: "",
        facebook: ""
      },
      phoneNumbers: ["", ""],
    }

    // defaultValues: async () => {
    //   const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
    //   console.log(response.data,"adsfgfsd");
    //   return {
    //     username: "batman",
    //     email: response.data.email,
    //     channel: "sdsdf"
    //   }
    // }
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  renderCount++;

  return (
    <div>
      <h1>Hook Form Example ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required!" })}
          />
          <p className="error">{errors.username?.message}</p>
          <br />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Email is in Invalid Format",
              },
              validate: {
                notAdmin: (fieldValue)=> {
                return fieldValue!== "admin@gmail.com" || "Enter a different email Address"
              },notBlackListed: (fieldValue) => {
                return(
                  !fieldValue.endsWith("baddomain.com") || "This domain is not supported."
                )
              }
            }
              
              
            })}
          />
          <p className="error">{errors.email?.message}</p>
          <br />
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel:</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Channel field is required!" })}
          />
          <p className="error">{errors.channel?.message}</p>
          <br />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">twitter:</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter")}
          />
          <br />
          <br />

        </div>

        <div className="form-control">
          <label htmlFor="facebook">facebook:</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook")}
          />
          <br />
          <br />

        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number:</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers[0]")}
          />
          <br />
          <br />

        </div>

        
        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone Number:</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers[1]")}
          />
          <br />
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default HookForm;
