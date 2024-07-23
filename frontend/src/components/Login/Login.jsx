import axios from "axios";
import { useState } from "react";
import STYLE from "./Login.module.css"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please fill all the fields", {
          position: "top-center",
        });
        return;
      }
      if (email.length < 13 || password.length < 8) {
        toast.error("Please enter valid email and password", {
          position: "top-center",
        });
        return;
      }
      const res = await axios.post('http://localhost:4000/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      console.log(res.data);
      toast.success("LoggedIn successfully !", {
        position: "top-center",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className={STYLE.login_container}>
      <h1 className={STYLE.login_title}>Login</h1>
      <form onSubmit={onSubmit} className={STYLE.login_form}>
        <div className={STYLE.form_control}>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className={STYLE.form_control}>
          <label>Password</label>
          <div className={STYLE.password_input_wrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={STYLE.toggle_password_btn}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button type="submit" className={STYLE.login_btn}>Login</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login