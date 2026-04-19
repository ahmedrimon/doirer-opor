import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const SendParcel = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const serviceCenters = useLoaderData();

    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    console.log(regions)

    const senderRegion = watch('senderRegion')
    const recieverRegion = watch('recieverRegion')

    const districtByRegion = region => {
        const districtRegion = serviceCenters.filter(c => c.region === region);
        const district = districtRegion.map(d => d.district)
        return district;
    }

    const handleSendParcel = data => {
        console.log(data)

        const isDocument = data.parcelType === 'document'
        const isSameDistrict = data.senderDistrict === data.recieverDistrict
        const parcelWeight = parseFloat(data.parcelWeight)

        let cost = 0;

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
            console.log('cost', cost)
        }
        Swal.fire({
                title: "Are you sure?",
                text: `You have to pay ${cost}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm It"
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    title: "Thanks",
                    text: "Your order on the way",
                    icon: "success"
                });
            });
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

                        {/* select Regions */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>

                            <select {...register('senderRegion')} defaultValue="Pick a browser" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* select Districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender District</legend>

                            <select {...register('senderDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>
                    </fieldset>


                    {/* Reciever Details */}
                    <fieldset className="fieldset">
                        <h1 className='text-2xl mt-5'>Reciever Details</h1>
                        <label className="label">Reciever Details</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="Reciever Name" />

                        <label className="label">Reciever email</label>
                        <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Reciever Email" />

                        <label className="label">reciever Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Reciever Address" />

                        {/* select Regions */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Reciever Regions</legend>

                            <select {...register('recieverRegion')} defaultValue="Pick a browser" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* select Districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Reciever District</legend>

                            <select {...register('recieverDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(recieverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>
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