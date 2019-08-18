import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios'
// You may see this as (import Yup from 'yup') in some tutorials, the above method seems less buggy

function LoginForm({ errors, touched, values, isSubmitting }) {
  return (
    <Form>
      <div>
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <Field component="select" name="meal">
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="platinum">Platinum</option>
      </Field>
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      <button disabled={isSubmitting}>Submit</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password, meal, tos }) {
    return {
      username: email || "",
      password: password || "",
      meal: meal || "silver",
      tos: tos || ""
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required!"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
    if (values.email === "alreadytaken@atb.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://yourdatabaseurlgoeshere.com", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;
