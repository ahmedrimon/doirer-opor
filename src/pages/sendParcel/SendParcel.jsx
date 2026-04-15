import React from 'react';
import { Form, useForm } from 'react-hook-form';

const SendParcel = () => {

    const { register, handleSubmit, formState: {errors} } = useForm()

    const handleSendPercel = data => {
        console.log(data)
    }


    return (
        <div>
            <h1 className='text-2xl'>Send a Parcel</h1>
            <p className='text-xl'>Enter Your Parcel Details</p>

            <form onSubmit={handleSubmit(handleSendPercel)}>
                <div className='flex mt-4'>
                    <input type="radio" name="radio-1" className="radio" />
                    <p>Document</p>
                    <input type="radio" name="radio-1" className="radio ml-4" />
                    <p>Non Document</p>
                </div>
            </form>
            {/* radio button */}
            <div>
            </div>
        </div>
    );
};

export default SendParcel;