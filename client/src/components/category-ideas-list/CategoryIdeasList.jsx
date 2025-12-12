import { useNavigate, useParams } from "react-router"
import './categoryIdeasList.css'
import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import useFetchOnMount from "../../hooks/useFetchOnMount"

const BASE_URL = 'http://localhost:3030'


export default function CategoryIdeasList() {

    const { categoryName } = useParams()
    const navigate = useNavigate()

    const { categories } = useContext(UserContext)
    const curerentCategory = categories[categoryName]


    let {
        currentData,
        setCurrentData
    } = useFetchOnMount(`${BASE_URL}/data/ideas`, [])

    currentData = currentData.filter(idea => idea.category === categoryName)
    
    return (
        <section className="category-ideas">
            <nav>
                <ul className="back-nav">
                    <li className="back-btn" onClick={() => navigate('/ideas')}>← Back</li>
                </ul>
            </nav>
            <div>
                <header className="category-ideas-header">
                    {currentData.length !== 0
                        ? (<div>
                            <h2>{curerentCategory?.categoryAbout}</h2>
                            <p>{curerentCategory?.shortInfo}</p>
                        </div>)
                        : (<div>
                            <p >There are no ideas added yet</p>
                        </div>)}
                </header>
            </div>

            <ul className="category-ideas-grid">
                {currentData.map((idea) => (
                    <li
                        key={idea._id}
                        className="category-idea-card"
                        onClick={() => navigate(`/ideas/${categoryName}/${idea._id}/details`)}
                    >
                        <div className="idea-image-wrapper">
                            <img
                                src={idea.imageUrl}
                                alt={idea.title}
                                className="idea-image"
                            />

                            <div className="idea-overlay">
                                <h3 className="idea-title">{idea.title}</h3>
                                <p className="idea-short">
                                    {idea.conciseContext}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </section>

    )
}