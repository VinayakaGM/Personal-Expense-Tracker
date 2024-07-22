import { useState } from "react";
import axios from "axios";
import STYLE from "./Register.module.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/users/register", formData);
      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      toast.success("Registered successfully !", {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);

      if (!name || !email || !password) {
        toast.error("Please fill all the fields", {
          position: "top-center",
      });
      }

    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className={STYLE.register_container}>
      <h1 className={STYLE.register_title}>Register</h1>
      <form onSubmit={onSubmit} className={STYLE.register_form}>
      <div className={STYLE.form_control}>
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        />
      </div>
      <div className={STYLE.form_control}>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} />
      </div>
      <div className={STYLE.form_control}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
      </div>
      <button type="submit" className={STYLE.register_btn}>Register</button>
    </form>
    <ToastContainer />
    </div>
  );
};

export default Register;
