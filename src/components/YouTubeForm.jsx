import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

let renderCount = 0; // to check how many times component renders

export const YouTubeForm = () => {
  //const { name, ref, onchange, onblur  } = useForm();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount },
    watch,
    getValues,
    reset
  } = useForm({
    //to set a default value of the field you can also fetch data here and showit for this watch v no.12
    defaultValues: {
      username: "jarmanjit singh",
      //for getting or storing the nested values in object for check submit form and check in console
      social: {
        twitter: "",
        facebook: "",
      },
      //for storing as a array
      phoneNumbers: ["", ""],
      //by usefield hoook for dynamic data or fields
      multipleAddress: [{ address: "" }],
      //for numeric and date values set default values
      age: 0,
      dob: new Date(),
    },
  });

  //for dynamic fields
  const { fields, append, remove } = useFieldArray({
    name: "multipleAddress",
    control,
  });

  ///////// for watching field values
  const watchUserName = watch("username");
  //for watching multiple fields
  //const watchUserName = watch(["username", "email"]);

  /////// for getValues function
  const handleGetValues = () => {
    console.log(getValues()); //for getting all field values
    console.log(getValues(["username"])); //for getting particular value
  };

  ////// for setvalue function the third arguement is for updating a state otherwise setvalue does not effect state value

  const handleSetValue = () => {
    setValue("username", "value changed", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  ///// touched state - when user go in and back out from the field then touched state is true
  ///// dirty state - and when user again go in and change field value then it is dirty state true

  const onSubmit = (data) => {
    console.log("form submitted", data);
  };

  /////// submission error handling
  const onError = (errors) => {
    console.log("Errors in console", errors);
  };

  ///// disable submission button -- when user is not interacted with form or not correct any feild validation so import isDirty and isValid from useform and place it in submission button.
  ///// other form submitting states -- isSubmitting -- when form submitting, isSubmitted, isSubmitSuccessful, submitCount


  ///// reset metod -- this method is reset values to its default values >> 1. reset on reset button 2. reset when form submiited successfully with useEffect hook.




  //this is when we show intially any value in the field and the first want is pass default values object in useform hook
  //   useEffect(() => {
  //     setValue("username", "jarmanjitsingh");
  //   }, [setValue]);

  renderCount++;
  return (
    <div>
      <h1>YouTube Form{renderCount / 2}</h1>
      <h2>Watching username : {watchUserName}</h2>

      {/* First part: learning register and handleSubmit vaildations, custom validations and error messages and devtool with control */}

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdminByJarman: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "This is email only for internal use only"
                  );
                },
                notDomainSupported: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "channel is also required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        {/* Second part : learn setting default values, storing nested objects , arrays , usefield hook for dynamic data,  */}
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>

        <div>
          <label>List of Multiple Adresses</label>
          {fields.map((field, index) => {
            return (
              <div className="form-control" key={field.id}>
                <input
                  type="text"
                  {...register(`multipleAddress.${index}.address`)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    -
                  </button>
                )}
              </div>
            );
          })}
          <button type="button" onClick={() => append({ address: "" })}>
            +
          </button>
        </div>

        {/* Third part: Now this is for numeric and date values even if we set the input type number of date then u can see in console it is type string so we can set it as below */}
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "dob is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
        <button type="button" onClick={()=> reset()}>
          Reset
        </button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValue}>
          set Username value
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
