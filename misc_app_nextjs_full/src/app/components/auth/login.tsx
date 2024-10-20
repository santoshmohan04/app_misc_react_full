import './auth.css';

export default function Login() {
    return (
        <div className="outer-box">
            <div className="inner-box">
                <header className="signup-header">
                    <h1>Login</h1>
                </header>
                <main className="signup-body">
                    <form
                    >
                        <div className="mb-3 mt-3">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd">Password:</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    id="pwd"
                                    placeholder="Enter password"
                                    name="pswd"
                                />
                                <a
                                    className="input-group-text"
                                >
                                    <em
                                        id="changePassIcon"
                                    >
                                    </em>
                                </a>
                            </div>
                        </div>
                        <div className="form-check mb-3">
                            <label className="form-check-label">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="remember"
                                />
                                Remember me
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mb-3"
                        >
                            Submit
                        </button>
                    </form>
                </main>

                <footer className="signup-footer">
                    <p>Already have an Account? <a href="/signup">Signup</a> </p>
                </footer>

            </div>
            <div className="circle c1"></div>
            <div className="circle c2"></div>
        </div>
    )
}