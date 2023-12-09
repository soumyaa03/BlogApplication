import React, { useRef } from "react"
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png"
import { Link } from "react-router-dom";
import { Toaster,toast} from "react-hot-toast";
import axios from "axios";
const UserAuthForm = ({type}) => {

    let emailRegex = /^\w+([.-]?\w+)*@([.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const authForm = useRef();

    const register = (serverRoute, formData) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({data}) => {
            console.log(data)
        })
        .catch(({response}) => {
            toast.error(response.data.error)
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        let serverRoute = type === "sign-in" ? "/login" : "/register"

        //form data
        let form = new FormData(authForm.current)
        let formData = {}

        for(let [key,value] of form.entries()){
            formData[key] = value;

        }
        
        let {fullname , email, password} = formData;

        //form validation

        if(fullname){
            if(fullname.length < 3){
                return toast.error("Fullname must be at least 3 character long")
            }
        }

        if(!email.length){
            return toast.error("Enter email")
        }

        if(!emailRegex.test(email)){
            return toast.error("Email is invalid")
        }

        if(!passwordRegex.test(password)){
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter")
        }

        register(serverRoute,formData)

    }

    return (
        <section className="h-cover flex items-center justify-center">
            <Toaster/>
            <form ref={authForm} className="w-[80%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalize text-center mb-16">
                    {type === "sign-in" ? "Welcome back" : "Join us today"}
                </h1>

                {
                    type !== "sign-in" ?
                    <InputBox
                        name="fullname"
                        placeholder="Full Name"
                        type="text"
                        icon="fi-rr-user"
                    />
                    : ""
                }

                    <InputBox
                        name="email"
                        placeholder="Email"
                        type="email"
                        icon="fi-rr-envelope"
                    />

                    

                    <InputBox
                        name="password"
                        placeholder="Password"
                        type="password"
                        icon="fi-rr-key"
                    />

                    <button className="btn-dark center mt-14"
                     type="submit"
                     onClick={handleSubmit}
                     >
                        {type.replace("-"," ")}
                    </button>

                    <div className="relative w-full flex items-center gap-2 my-8 opacity-10 uppercase text-black font-bold">
                        <hr className="w-1/2 border-black" />
                        <p>OR</p>
                        <hr className="w-1/2 border-black" />
                    </div>

                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                        <img src={googleIcon} className="w-5"/>
                        continue with google
                    </button>

                    {
                        type === "sign-in" ? 
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            {"Don't have an account ?"}
                            <Link to="/signup" className="underline text-black text-xl ml-1">
                                Join us today
                            </Link>
                        </p>

                        :

                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Already a member ?
                            <Link to="/signin" className="underline text-black text-xl ml-1">
                                Sign in here
                            </Link>
                        </p>
                    }

            </form>

        </section>
    )
}

export default UserAuthForm;