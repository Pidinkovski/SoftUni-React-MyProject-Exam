import { NavLink } from "react-router";
import "./login.css"
export default function Login() {
    return (
        <section className="login-page">
            <div className="login-card">
                <h2 className="login-title">Create your account</h2>

                <form className="login-form" action="">
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
                        />
                    </div>
                    <button type="login-submit" className="btn login-btn">
                        login
                    </button>
                </form>
                <NavLink to="/register" className="login-redirect-link">
                    Not registered yet ? Register here.
                </NavLink>
            </div>
        </section>
    );

}