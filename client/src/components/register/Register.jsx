import "./register.css"
import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";

import UserContext from "../../contexts/UserContext";;
import useForm from "../../hooks/useForm";

export default function Register() {
    const {onRegisterHandler } = useContext(UserContext)
    const navigate = useNavigate()

    const registerClickAction = ({ email, password, rePass }) => {

        if (!email || !password || !rePass) {
            alert('All fields are required')
            return
        }

        if (password !== rePass) {
            alert('Passwords do not match')
            return
        }

        try {
            onRegisterHandler({ email, password })
            navigate('/')
        } catch (err) {

            alert(err.message)
        }
    }

    const {
        data,
        dataSetterHandler,
        formAction
    } = useForm(registerClickAction, {
        email: '',
        password: '',
        rePass: ''
    })


    return (
        <section className="register-page">
            <div className="register-card">
                <h2 className="register-title">Create your account</h2>

                <form className="register-form" action={formAction}>
                    <div className="register-form-item">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="register-form-input"
                            type="email"
                            id="email"
                            name="email"
                            onChange={dataSetterHandler}
                            value={data.email}
                            placeholder="example@mail.com"
                        />
                    </div>

                    <div className="register-form-item">
                        <label className="register-form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="register-form-input"
                            type="password"
                            id="password"
                            name="password"
                            onChange={dataSetterHandler}
                            value={data.password}
                        />
                    </div>

                    <div className="register-form-item">
                        <label className="register-form-label" htmlFor="repass">
                            Repeat password
                        </label>
                        <input
                            className="register-form-input"
                            type="password"
                            id="repass"
                            name="rePass"
                            onChange={dataSetterHandler}
                            value={data.rePass}
                        />
                    </div>

                    <button type="submit" className="btn register-btn">
                        Register
                    </button>
                </form>
                <NavLink to="/login" className="register-redirect-link">
                    Already registered? Login here.
                </NavLink>
            </div>
        </section>
    );

}