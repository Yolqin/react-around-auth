import  React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        props.handleRegister(email, password);
        if(localStorage.getItem('jwt')) {
            history.push('/');
        }
    }

    return (
        <div className="auth">
            <form
                action="#"
                id="register"
                name="register"
                onSubmit={handleSubmit}
                className="auth__form"
                noValidate
            >
                <h3 className="auth__header">Sign up</h3>
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
                           className="auth__input auth__input_type_email"
                           placeholder="Password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           required
                    />
                    <span id="password-error" className="auth__field auth__field_error"></span>
                <button type="submit"
                        aria-label="user-login"
                        className="auth__button"
                        onClick={props.toggleToolTip}>Sign up</button>
                <Link to='/signin' className="auth__link">Already a member? Log in here!</Link>
            </form>
        </div>
    )
}

export default Register;