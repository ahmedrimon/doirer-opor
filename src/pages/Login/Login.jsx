import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import UseAuth from '../../hooks/UseAuth';

const Login = () => {

    const {signIn} = UseAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = data => {
        signIn(data.email, data.password)
        .then(res => 
            console.log(res.user))
            navigate(location?.state || '/')
        .catch(error => console.log(error))
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign In!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">

                                <label className="label">Email</label>
                                <input type="email" {...register('email')} className="input" placeholder="Email" />

                                <label className="label">Password</label>
                                <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                                {errors.password?.type === "required" && (
                                    <p className='text-red-500'>Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className='text-red-500'>Password must be 6 character</p>
                                )}

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Sign In</button>
                            </fieldset>
                            <p>New Here! <Link to="/register" className="text-blue-400 underline">Register</Link> </p>
                        </form>
                                <p className="divider">OR</p>
                                <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;