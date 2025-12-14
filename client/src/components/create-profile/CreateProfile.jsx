import './createProfile.css'
import useForm from "../../hooks/useForm";
import { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from 'react-router';
import userHasProfile from '../../hooks/userHasProfile';


const initialValues = {
    email: "",
    username: "",
    profilePicture: "",
    gender: "",
    Bio: "",
    years: "",
    more: "",
}

const BASE_URL = 'http://localhost:3030'

export default function CreateProfile() {
    const navigate = useNavigate()

    const { request, isPending } = useRequest()
    const { user } = useContext(UserContext)
    const {hasProfile} = userHasProfile(user?._id)
    useEffect(() => {
        if(hasProfile) {
        navigate(`/profile/${user._id}`)
    }},[hasProfile])
    
    const onCreateHandler = async () => {
        if (!data.username || !data.profilePicture || !data.gender || !data.bio || !data.years || !data.more) {
            return toast.error('All the fields are required')
        }
        const profileToSend = {
            ...data,
            email: user.email
        }

        try {
            await request(`${BASE_URL}/data/profiles`, 'POST', profileToSend, { accessToken: user.accessToken })
            navigate(`/profile/${user._id}`)
        } catch (err) {
            toast.error('There was a problem with the profile creation')
        }
    }
    const { data, formAction, dataSetterHandler } = useForm(onCreateHandler, initialValues)


    return (
        <section className="create-page">
            <div className="create-card">
                <h2 className="create-title">Create Profile</h2>

                <form className="create-form" action={formAction}>

                    <div className="form-item">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            className="form-input"
                            id="username"
                            name="username"
                            value={data.username}
                            onChange={dataSetterHandler}
                        />
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="profilePicture">Profile Picture URL</label>
                        <input
                            className="form-input"
                            id="profilePicture"
                            name="profilePicture"
                            value={data.profilePicture}
                            onChange={dataSetterHandler}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="gender">Gender</label>
                        <select
                            className="form-input"
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={dataSetterHandler}
                        >
                            <option value="">-- Select --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="Bio">Bio</label>
                        <textarea
                            className="form-input textarea"
                            id="Bio"
                            name="bio"
                            placeholder='Share a bit personal info'
                            value={data.bio}
                            onChange={dataSetterHandler}
                        />
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="years">Years of practice</label>
                        <input
                            className="form-input"
                            id="years"
                            name="years"
                            type="number"
                            placeholder='How long are u practicting healthy life/workout'
                            value={data.years}
                            onChange={dataSetterHandler}
                        />
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="more">More</label>
                        <textarea
                            className="form-input textarea"
                            id="more"
                            name="more"
                            placeholder='You can share education , certificates etc...'
                            value={data.more}
                            onChange={dataSetterHandler}
                        />
                    </div>

                    <button 
                    disabled={isPending}
                    className="create-btn" 
                    type="submit"
                    >{isPending ? 'Saving' : 'Save '}</button>
                </form>
            </div>
        </section>
    );
}