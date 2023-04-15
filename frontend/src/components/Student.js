import { useState, useContext } from 'react';
import swal from 'sweetalert';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student({ history }){
    const [formData, setFormData] = useState(null);
    const { setCurrentUser } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const age_options = [5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18];
    
    const handleChange = (e) => {
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
        //setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(e.target.value )
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('/api/users/login', formData);
        setCurrentUser(response.data);
        sessionStorage.setItem('user', response.data);
        setError(null);
        history.push('/');
        } catch (error) {
        swal(`Oops!`, 'Something went wrong.');
        setError(error.response.data.message);
        }
  };

    return(
        <div id="login">
        <h1>Student Registration</h1>
            <form onSubmit={handleLogin}>
                <label id="email">Email </label>
                <input
                type="email"
                name="email"
                onChange={handleChange}
                ></input>
                <label>
                    How Old are You?:
                    <select value={null} onChange={handleChange}>
                    <option value="">How old are you?</option>
                    {age_options.map((age) => (
                        <option key={age} value={age}>
                        {age}
                        </option>
                    ))}
                    </select>
                </label>
                <div id="passlabel">
                <label className="passwordLabel">Password </label>
                <input
                    className="passwordInput"
                    type="password"
                    name="password"
                    onChange={handleChange}
                ></input>
                </div>
                {error && <p>Error: {error}</p>}
                <div>
                <button className="loginBtn" type="submit">
                    <img
                    id="loginImg"
                    src="https://cdn-icons-png.flaticon.com/512/854/854184.png"></img>
                </button>
                </div>
            </form>
            <div>
                <p>New Here</p>
                <Link to="/register">Click here to make an account</Link>
            </div>
    </div>
    )
}

export default Student