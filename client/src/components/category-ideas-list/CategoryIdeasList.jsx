import { useNavigate, useParams } from "react-router"
import './categoryIdeasList.css'
import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import useFetchOnMount from "../../hooks/useFetchOnMount"
import Loading from "../loading/Loading"
import useRequest from "../../hooks/useRequest"

const BASE_URL = 'http://localhost:3030'


export default function CategoryIdeasList() {

    const { categoryName } = useParams()
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const pageSize = 4;
    const offset = (page - 1) * pageSize

    const { categories } = useContext(UserContext)
    const curerentCategory = categories[categoryName]
    const searchPart = encodeURIComponent(`category="${categoryName}"`)

    const { currentData : totalIdeasCount, isLoading: countIsLoading } = useFetchOnMount(`${BASE_URL}/data/ideas?where=${searchPart}`, [categoryName])
    
    
    let {
        currentData : ideasPaged,
        isLoading
    } = useFetchOnMount(`${BASE_URL}/data/ideas?where=${searchPart}&offset=${offset}&pageSize=${pageSize}`, [categoryName, page])
    const totalPages = Math.ceil((Number(totalIdeasCount.length) || 0) / pageSize)

    if (isLoading || countIsLoading) {
        return <Loading />;
    }

    
    return (
        <section className="category-ideas">
            <nav>
                <ul className="back-nav">
                    <li className="back-btn" onClick={() => navigate('/ideas')}>← Back</li>
                </ul>
            </nav>
            <div>
                <header className="category-ideas-header">
                    {ideasPaged.length !== 0
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
                {ideasPaged.map((idea) => (
                    <li
                        key={idea._id}
                        className="category-idea-card"
                        onClick={() => navigate(`/ideas/${idea._id}/details`)}
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
            <div className="pagination">
                <button disabled={page === 1} 
                onClick={() => setPage(state => state - 1)}
                >Prev</button>
                <span>{page} / {totalPages || 1}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(state => state + 1)}>Next</button>
            </div>

        </section>

    )
}