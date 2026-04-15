import React from 'react';
import UseAuth from '../../hooks/UseAuth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const Register = () => {

    const { register, handleSubmit } = useForm()
    const { createUser, updateUserProfile } = UseAuth()
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (data) => {

        const profileImg = data.photo[0];
        console.log(profileImg)

        // console.log('Here are the data', data.photo[0])
        // console.log(createUser)

        createUser(data.email, data.password)
            .then(res => {
                console.log(res.user)
                // store the image
                const formData = new FormData();
                formData.append('image', profileImg)

                // post the image with axios
                const imageApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBb}`
                axios.post(imageApi, formData)
                .then(res => {
                    console.log("after image data" ,res.data)

                    //update user profile
                    const userProfile = {
                        displayName: data.name,
                        photoUrl: res.data.data.url
                    }
                    updateUserProfile(userProfile)
                    .then(() => {
                        console.log('user updated done')
                        navigate(location.state || '/')
                    })
                    .then(error => console.log(error))
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">

                                <label className="label">Name</label>
                                <input type="text" {...register('name')} className="input" placeholder="name" />

                                <label className="label">Upload Profile Photo</label>
                                <input type="file" {...register('photo')} className="file-input file-input-primary" placeholder="file" />

                                <label className="label">Email</label>
                                <input type="email" {...register('email')} className="input" placeholder="Email" />

                                <label className="label">Password</label>
                                <input type="password" {...register('password')} className="input" placeholder="Password" />

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                            <p>Already have an account! <Link state={location.state} to="/login" className="text-blue-400 underline">Sign In</Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;