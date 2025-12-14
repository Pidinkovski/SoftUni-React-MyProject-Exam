import { useNavigate, useParams } from "react-router"
import './categoryIdeasList.css'
import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import useFetchOnMount from "../../hooks/useFetchOnMount"
import Loading from "../loading/Loading"

const BASE_URL = 'http://localhost:3030'


export default function CategoryIdeasList() {

    const { categoryName } = useParams()
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const pageSize = 3;
    const offset = (page - 1) * pageSize

    const { categories } = useContext(UserContext)
    const curerentCategory = categories[categoryName]
    const searchPart = encodeURIComponent(`category="${categoryName}"`)

    const { currentData: totalIdeasCount, isLoading: countIsLoading } = useFetchOnMount(`${BASE_URL}/data/ideas?where=${searchPart}`, [categoryName])


    let {
        currentData: ideasPaged,
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
                        : (<div className="empty-state">
                            <h3 className="empty-title">No ideas added yet</h3>
                            <p className="empty-text">Be the first one to share an idea in this category.</p>
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
            <div className="pagination  mt-10 flex items-center justify-center gap-6 ">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(state => state - 1)}
                    className="
                        flex items-center gap-2
                        px-4 py-2
                        text-sm font-medium
                        bg-white text-gray-700
                        rounded-lg
                        shadow-sm
                        hover:bg-gray-100
                        disabled:opacity-40
                        disabled:cursor-not-allowed"
                >←</button>
                <span className="px-4 py-2
                        text-sm font-semibold
                        text-gray-700
                        bg-white/70
                        rounded-lg"
                >{page} / {totalPages || 1}</span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(state => state + 1)}
                     className="
                        text-sm font-medium
                        bg-white text-gray-700
                        hover:bg-gray-100
                        disabled:opacity-40
                        disabled:cursor-not-allowed"
                >→</button>
            </div>

        </section>

    )
}