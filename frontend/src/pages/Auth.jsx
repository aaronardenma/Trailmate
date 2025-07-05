import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Input } from '../components/ui/input';
import banffImg from "../Images/banff.jpeg";
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../store/authSlice';
import { setUser } from '../store/userSlice';

export default function Auth({ handleLogInSuccess }) {
    const { type } = useParams();
    const isLogin = type === 'login';

    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (isLogin) {
            // login
            try {
                const response = await fetch('http://localhost:5001/api/users/login/auth', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log(data)
                if (response.ok && data.success) {
                    dispatch(setUser(data.user));
                    dispatch(setAuthenticated());
                    
                    handleLogInSuccess();
                    console.log(data.user)
                    localStorage.setItem('user_id', data.user._id)
                    nav("/");
                } else {
                    alert(data.message || "Login failed");
                }
            } catch (err) {
                console.error("Login error:", err);
                alert("Login error. Please try again.");
            }
        } else {
            // register
            try {
                const response = await fetch('http://localhost:5001/api/users/register/auth', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    dispatch(setUser({ email: data.user, profileCompleted: false }));
                    dispatch(setAuthenticated());
                    nav("/setup");
                } else {
                    alert(data.message || "Registration failed");
                }
            } catch (err) {
                console.error("Registration error:", err);
                alert("Registration error. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="md:w-3/5 w-full">
                <img
                    src={banffImg}
                    alt="Scenic trail"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="md:w-2/5 w-full flex flex-col justify-center p-8 md:p-16 bg-white">
                <Link className='text-3xl font-bold mb-12' to="/">TrailMate</Link>
                <h2 className='font-semibold mb-4'>
                    {isLogin ? "Nice to see you again" : "Create your Account"}
                </h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <p className='mb-2 text-xs ml-2 text-gray-500'>Login</p>
                        <Input id="email" name="email" placeholder="Email" type="email" required />
                    </div>
                    <div className='mb-4'>
                        <p className='mb-2 text-xs ml-2 text-gray-500'>Password</p>
                        <Input id="password" name="password" placeholder="Password" type="password" required />
                    </div>
                    <button className="outline w-full text-sm rounded bg-[#588157] text-white font-semibold p-2 cursor-pointer" type="submit">
                        {isLogin ? "Sign in" : "Create Account"}
                    </button>
                </form>
                <hr className='my-4' />
                <p className='text-xs'>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <a className='text-[#0000EE] cursor-pointer' onClick={() => nav(isLogin ? '/auth/create' : '/auth/login')}>
                        {isLogin ? "Sign up here" : "Log in here"}
                    </a>
                </p>
            </div>
        </div>
    );
}
