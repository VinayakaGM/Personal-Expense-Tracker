import axios from "axios";
import { useState } from "react";
import STYLE from "./Login.module.css"


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
});

const { email, password } = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async e => {
    e.preventDefault();
    try {
        const res = await axios.post('/api/users/login', formData);
        localStorage.setItem('token', res.data.token);
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
                <input type="password" name="password" value={password} onChange={onChange} />
            </div>
            <button type="submit" className={STYLE.login_btn}>Login</button>
        </form>
    </div>
  )
}

export default Login