import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleSendParcel = data => {
        console.log(data)
    }


    return (
        <div className='p-20'>
            <h1 className='text-2xl'>Send a Parcel</h1>
            <p className='text-xl'>Enter Your Parcel Details</p>

            <form onSubmit={handleSubmit(handleSendParcel)}>
                <div className='flex mt-4'>
                    <input type="radio" name="radio-1" className="radio" value="document" {...register('parcelType')} defaultChecked />
                    <p>Document</p>
                    <input type="radio" name="radio-2" className="radio ml-4" value="Non-document" {...register('parcelType')} />
                    <p>Non Document</p>
                </div>

                {/* parcel Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-5">
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                <div className='grid grid-col-1 md:grid-cols-2 gap-8'>
                    <fieldset className="fieldset">
                    <h1 className='text-2xl mt-5'>Sender Details</h1>
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />

                        <label className="label">Sender Email</label>
                        <input type="email" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />

                        <label className="label">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />

                        <label className="label">Sender District</label>
                        <input type="text" {...register('senderDistrict')} className="input w-full" placeholder="Sender District" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <h1 className='text-2xl mt-5'>Reciever Details</h1>
                        <label className="label">Reciever Details</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="Reciever Name" />

                        <label className="label">Reciever email</label>
                        <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Reciever Email" />

                        <label className="label">reciever Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Reciever Address" />

                        <label className="label">reciever District</label>
                        <input type="text" {...register('receiverDistrict')} className="input w-full" placeholder="reciever District" />
                    </fieldset>
                </div>

                <input type="submit" className='btn btn-success text-black' value="Send Parcel" />
            </form>
           
            <div>
            </div>
        </div>
    );
};

export default SendParcel;