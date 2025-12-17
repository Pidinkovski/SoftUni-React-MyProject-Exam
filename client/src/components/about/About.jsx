import './about.css';

export default function About() {
    return (
        <section className="about">
            <h1 className='about-text-header'>More about Us</h1>

            <p className='about-text-header'>
                We're a community-driven platform for sharing practical ideas in Fitness, Lifestyle and Food.
                Post your idea, help others, and get inspired.You can always check all the new ideas , also people are giving their opinions by comments and...who knows maybe you can find your new passion here.
                
                <p><strong>Also if it is easier for you , you can always come to our office , and have discussion with some of our educated people.</strong></p>
               
            </p>

            <div className="about-grid">
                <div className="about-card">
                    <h2 className='little-header'>Get advice</h2>
                    <p className='text-after-header'>
                        If you have any different question , or different theme that we dont have in the categories , feel free to write us  , we will be happy to help.
                    </p>

                    <form className="about-form" action={(e) => e.preventDefault()}>
                        <label>
                            Your email
                            <input type="email" placeholder="Type your email here"  />
                        </label>

                        <label>
                            Category
                        <input type='text' name='category' placeholder='different than the existing one' />
                        </label>

                        <label>
                            Message
                            <textarea placeholder="Describe your idea and what you want advice on..." rows="4"  />
                        </label>

                        <button type="submit">Send</button>
                    </form>
                </div>

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