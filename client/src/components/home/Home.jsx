import './home.css'
export default function Home() {
    return (
        <section className="home">
            <div className="home-header-title">
                <h1>Welcome to Healty Lifestyle</h1>
            </div>

            <div className='home-center-text'>
                <p>If you want to improve your overall health and lifestyle, you are on the right place.</p>
                <p>Here you can find ideas about simple or advance workouts, lifestyle tips , how to stay healty and some delicious food recipies</p>
                <p>Also if you have something helpfull in mind , you can always share with us.</p>
            </div>
            <div className="home-popular">
                <p className='home-popular-title'>Here you can find also the most liked ideas : </p>
                <ul className="home-popular-list">
                    <li className="home-popular-item">Top 10 High Protein Meals</li>
                    <li className="home-popular-item">Top 10 High Protein Meals</li>
                    <li className="home-popular-item">Top 10 High Protein Meals</li>
                </ul>
            </div>
        </section>
    )
}