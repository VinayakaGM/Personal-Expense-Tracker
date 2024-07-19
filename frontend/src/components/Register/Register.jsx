import { useState } from "react";
import axios from "axios";
import STYLE from "./Register.module.css"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/register", formData);
      localStorage.setItem("token", res.data.token);
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
          name="username"
          value={username}
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
    </div>
  );
};

export default Register;
