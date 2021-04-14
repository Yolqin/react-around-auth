import  React from 'react';
import { Link, useHistory} from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        props.handleLogin(email, password);
        if (localStorage.getItem('jwt')) {
            history.push('/');
        }
    }

    return (
        <div className="auth">
            <form
                action="#"
                id="login"
                name="login"
                onSubmit={handleSubmit}
                className="auth__form"
            >
                <h3 className="auth__header">Log in</h3>
                    <input id="email"
                           type="email"
                           name="email"
                           className="auth__input auth__input_type_email"
                           placeholder="Email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           required
                    />
                    <span id="email-error" className="auth__field auth__field_error"></span>
                    <input id="password"
                           type="password"
                           name="password"
                           className="auth__input auth__input_type_password"
                           placeholder="Password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           required
                    />
                    <span id="password-error" className="auth__field auth__field_error"></span>
x
                <button type="submit"
                        aria-label="user-login"
                        className="auth__button">Log in</button>
                <Link to='/signup' className="auth__link">Not a member yet? Sign up here!</Link>
            </form>
        </div>
    )
}

export default Login;