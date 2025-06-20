import axios from 'axios'
import { useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userSlice';

export default function Login() {
    // const [hasAccount, setHasAccount] = useState(false)
    const nav = useNavigate()
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.users.loggedIn)

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

        dispatch(login({email, password}))
    }
        useEffect(() => {
            if (loggedIn) {
                nav("/")
            }
        }, [loggedIn, nav])


    return <div>
        <div>
            {/* <img src="" alt="" /> */}
        </div>
        <div className='flex flex-col items-center' >
            <h1 className='text-3xl font-bold'>TrailMate</h1>
            <h2>{isLogin ? "Nice to see you again" : "Create your Account"}</h2>
            <form className='flex flex-col items-center' id="form" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>
                        <p>Email:</p>
                        <Input type='email'></Input>
                        {/* <input id="email" name="email" className="outline rounded hover:bg-accent focus:bg-accent" type="email" /> */}
                    </div>
                    <div>
                        <p>Password</p>
                        <Input type='password'></Input>
                        {/* <input id="password" name="password" className="outline rounded" type="password" /> */}
                    </div>
                </div>
                <button className="outline rounded p-2 mt-2 cursor-pointer" type="submit">Sign in</button>
            </form>
            <p>Don't have an account? <Link className='text-[#0000EE]' to={"/create-account"}>Sign up here</Link></p>
        </div>
    </div>
}