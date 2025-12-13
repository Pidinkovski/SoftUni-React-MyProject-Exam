import { useNavigate, useParams } from 'react-router'
import useFetchOnMount from '../../hooks/useFetchOnMount'
import './ideaDetails.css'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import useLikes from '../../hooks/useLikeHook'
import Loading from '../loading/Loading'
import useRequest from '../../hooks/useRequest'
import { toast } from 'react-toastify'


const BASE_URL = 'http://localhost:3030'

export default function IdeaDetails() {

    const { user, isAuthenticated } = useContext(UserContext)
    const {request , isPending : isDeleting} = useRequest()
    const searchPart = encodeURIComponent('author=_ownerId:users')
    const navigate = useNavigate()
    const { ideaId } = useParams()
    const userId = user?._id
    const {likesCount , isLiked , like ,isPending} = useLikes(ideaId ,userId)
    
    const { currentData ,isLoading } = useFetchOnMount(`${BASE_URL}/data/ideas/${ideaId}?load=${searchPart}`, { author: {}, likes: [] });

    if(isLoading) {
        return <Loading />
    }

    const deleteHandler = async(ideaId) => {
        const result = confirm('Confirm you want to delete this idea');

        if(result) {
            try {
                await request(`${BASE_URL}/data/ideas/${ideaId}` , 'DELETE' , null , {accessToken : user.accessToken})
                navigate(`/ideas/${currentData.category}`)
            }catch (err) {
                toast.error('There is a problem with the deleting process')
            }

        }
    } 

    return (
        <section className="idea-details-page">
            <div className="idea-details-card">
                <nav>
                    <ul className="back-nav">
                        <li className="back-btn" onClick={() => navigate(`/ideas/${currentData.category}`)}>← Back</li>
                    </ul>
                </nav>
                <header className="idea-details-header">
                    <h2 className="idea-details-title">{currentData?.title}</h2>

                    <div className="idea-details-meta">
                        <span className="idea-owner">
                            by <strong>{currentData.author?.email}</strong>
                        </span>

                        <span className="idea-likes">
                            Likes : <span>{likesCount}</span>
                        </span>
                    </div>
                </header>

                <div className="idea-details-body">
                    <h3 className="idea-section-title">Description</h3>
                    <p className="idea-description">{currentData?.description}</p>
                </div>


                <footer className="idea-details-footer">
                    {isAuthenticated && user?.email !== currentData.author?.email &&
                        <div className="idea-actions-left">
                            <button
                             className={`like-btn ${isLiked ? 'liked' : ''}`}
                              onClick={like}
                              disabled={isPending || isLiked}
                              
                              >Like</button>
                        </div>}

                    {isAuthenticated && user?.email === currentData.author?.email &&
                        <div className="idea-actions-right">
                            <button className="btn edit-btn" onClick={() => navigate(`/ideas/${ideaId}/edit`)}>Edit</button>
                            <button 
                            disabled={isDeleting}
                            className="btn delete-btn"
                            onClick={() =>deleteHandler(ideaId)}
                            >{isDeleting ? 'Deleting' : 'Delete'}</button>
                        </div>
                    }
                </footer>
            </div>
        </section>
    )
}