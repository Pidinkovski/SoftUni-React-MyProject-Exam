import "./login.css"
import { NavLink, useNavigate } from "react-router";
import { useContext, useState } from "react";

import useForm from "../../hooks/useForm";
import UserContext from "../../contexts/UserContext";

export default function Login() {

    const navigate = useNavigate()
    const [isSending , setIsSending] = useState(false)
    const { onLoginHandler } = useContext(UserContext)

    const loginActionClick =  async({email , password}) => {
        if(!email || !password){
            alert('All fields are required')
            return
        }
        
        try {
            setIsSending(true)
            await onLoginHandler({ email, password })
            
        } catch (err) {
            return alert('Invalid name or password')
        }
        finally {
            setIsSending(false)
        }
        navigate('/')
    }
    const {
        data,
        dataSetterHandler,
        formAction
    } = useForm(loginActionClick , {
        email : '',
        password : ''
    })
    
    return (
        <section className="login-page">
            <div className="login-card">
                <h2 className="login-title">Create your account</h2>

                <form className="login-form" action={formAction}>
                    <div className="login-form-item">
                        <label className="login-form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="login-form-input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@mail.com"
                            onChange={dataSetterHandler}
                            value={data.email}
                        />
                    </div>

                    <div className="login-form-item">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="login-form-input"
                            type="password"
                            id="password"
                            name="password"
                            onChange={dataSetterHandler}
                            value={data.password}
                        />
                    </div>
                    <button type="submit" disabled={isSending} className="btn login-btn">
                        {isSending ? 'Loggin in' : 'Login'}
                    </button>
                </form>
                <NavLink to="/register" className="login-redirect-link">
                    Not registered yet ? Register here.
                </NavLink>
            </div>
        </section>
    );

}