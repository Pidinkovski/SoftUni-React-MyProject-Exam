import useFetchOnMount from '../../hooks/useFetchOnMount'
import './home.css'

const BASE_URL = 'http://localhost:3030'

export default function Home() {

    const { currentData } = useFetchOnMount(`${BASE_URL}/data/ideas`, [])

    // currentData.sort((a, b) => b.likes.length - a.likes.length || b.title.localeCompare(a.title))
    // const popularIdeas = currentData.slice(0, 3)


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
                {/* <ul className="home-popular-list">
                    {popularIdeas?.map(idea => <li key={idea?._id} className="home-popular-item">
                        <h3 className='home-popular-idea-title'>{idea?.title}</h3>
                        <p className='home-popular-idea-likes'>Likes : {idea.likes?.length}</p>
                    </li>)}

                </ul> */}
            </div>
        </section>
    )
}