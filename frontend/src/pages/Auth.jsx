// import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Input } from '../components/ui/input';
import banffImg from "../Images/banff.jpeg"
import { useDispatch, useSelector } from 'react-redux';
import { addUser, login } from '../store/userSlice';

export default function Auth() {
    const { type } = useParams(); // <-- get 'login' or 'create'
    const isLogin = type === 'login';

    const nav = useNavigate()
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.users.loggedIn)
    const logInError = useSelector(state => state.users.logInError)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        const email = (e.target[0].value)
        const password = (e.target[1].value)

        // try {
        //     const response = await axios.post({
        //         url: 'localhost:5000/api/users/addUser',
        //         data: {
        //             email: email,
        //             password: password
        //         }
        //     })
        // } catch (err) {
        //     console.error("error", err)
        // }
        if (isLogin) {
            dispatch(login({email, password}))
        } else {
            console.log("creating acc")
            dispatch(addUser({email, password}))
            
            nav("/setup")
        }
    }

    useEffect(() => {
        if (loggedIn) {
            nav("/")
        }
    }, [loggedIn, nav])
        
    useEffect(() => {
        if (logInError) {
            alert("Login details are invalid");
        }
    }, [logInError]);

    return <div className='flex'>
        <div className='max-w-3/4'>
            <img src={banffImg} alt="" />
        </div>
        <div className='flex flex-col mx-auto text-left justify-center'>
            <Link className='text-3xl font-bold mb-12' to="/">TrailMate</Link>
            <h2 className='font-semibold mb-4'>{isLogin ? "Nice to see you again" : "Create your Account"}</h2>
            <form className='flex flex-col' id="form" onSubmit={(e) => handleSubmit(e)}>
                <div className='mb-4'>
                    <div className='mb-4'>
                        <p className='mb-2 text-xs ml-2 text-gray-500'>Login</p>
                        <Input id="email" name="email" placeholder="Email" className="outline rounded hover:bg-accent focus:bg-accent" type="email" />
                    </div>
                    <div className='mb-4'>
                        <p className='mb-2 text-xs ml-2 text-gray-500'>Password</p>
                        <Input id="password" name="password" placeholder="Enter password" className="outline rounded hover:bg-accent focus:bg-accent" type="password" />
                    </div>
                </div>
                <button className="outline w-full text-sm rounded bg-[#588157] text-[#fff] font-semibold p-2 cursor-pointer" type="submit">{isLogin ? "Sign in" : "Create Account"}</button>
            </form>
            <hr className='my-4' />
            <p className='text-xs'>{isLogin ? "Don't have an account? " : "Already have an account? "}<a className='text-[#0000EE] cursor-pointer' onClick={() => nav(isLogin ? '/auth/create' : '/auth/login')} >{isLogin ? "Sign up here" : "Log in here"}</a></p>
        </div>
    </div>
}