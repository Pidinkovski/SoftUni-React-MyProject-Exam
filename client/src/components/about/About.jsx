import { useContext } from 'react';
import useForm from '../../hooks/useForm';
import './about.css';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router';

const initialValues = {
    email: '',
    description: '',
    category: ''
}

export default function About() {
    const { user, isAuthenticated } = useContext(UserContext)
    const onSendHandler = (currentData) => {

        currentData.email = currentData.email.trim();
        currentData.category = currentData.category.trim();
        currentData.description = currentData.description.trim();

        if (!currentData.email || !currentData.category || !currentData.description) {
            return toast.error('All field are required')
        }
        if (currentData.email !== user.email) {
            return toast.error('Canno use different email than yours')
        }

        toast.success(`Your request was succesfully send.
            Thanks you ${user.email} `)

        setData({
            email: '',
            category: '',
            description: '',
        });
    }
    const { data, formAction, dataSetterHandler, setData } = useForm(onSendHandler, initialValues)

    return (
        <section className="about">
            <h1 className='about-text-header'>More about Us</h1>

            <p className='about-text-header'>
                We're a community-driven platform for sharing practical ideas in Fitness, Lifestyle and Food.
                Post your idea, help others, and get inspired.You can always check all the new ideas , also people are giving their opinions by comments and...who knows maybe you can find your new passion here.
            </p>
            <p className='about-text-header'><strong>Also if it is easier for you , you can always come to our office , and have discussion with some of our professionals.</strong></p>
            <div className="about-grid">
                {isAuthenticated ? (
                    <div className="about-card">
                        <h2 className='little-header'>Get advice</h2>
                        <p className='text-after-header'>
                            If you have any different question , or different theme that we dont have in the categories , feel free to write us  , we will be happy to help.
                        </p>

                        <form className="about-form" action={formAction}>
                            <label>
                                Your email :
                                <input
                                    type="email"
                                    name='email'
                                    onChange={dataSetterHandler}
                                    value={data.email}
                                    placeholder="Type your email here"
                                />
                            </label>

                            <label>
                                Category :
                                <input
                                    type='text'
                                    name='category'
                                    onChange={dataSetterHandler}
                                    value={data.category}
                                    placeholder='different than the existing one'
                                />
                            </label>

                            <label>
                                Message :
                                <textarea
                                    name='description'
                                    onChange={dataSetterHandler}
                                    value={data.description}
                                    placeholder="Describe your idea and what you want advice on..."
                                    rows="4" />
                            </label>

                            <button type="submit">Send</button>
                        </form>
                    </div>)
                    : (<div className="about-locked">
                        <p className="about-locked-text">
                            You need to be logged in ,if you want to write us an email.
                        </p>

                        <NavLink className="about-locked-btn" to="/login">
                            Log in here
                        </NavLink>
                    </div>)}
                <div className="about-card">
                    <h2>Where to find us</h2>
                    <p>Plovdiv, Bulgaria</p>

                    <div className="map">
                        <iframe
                            title="Google Map"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps?q=42.1354,24.7453&z=16&output=embed"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}