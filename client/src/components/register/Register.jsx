import { NavLink } from "react-router";
import "./register.css"
export default function Register() {
    return (
        <section className="register-page">
            <div className="register-card">
                <h2 className="register-title">Create your account</h2>

                <form className="register-form" action="">
                    <div className="register-form-item">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="register-form-input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@mail.com"
                            required
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
                            required
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
                            required
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