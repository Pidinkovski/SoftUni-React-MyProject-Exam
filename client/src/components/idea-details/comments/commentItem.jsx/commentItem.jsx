import { useContext } from 'react'
import './commentItem.css'
import UserContext from '../../../../contexts/UserContext'
export default function CommentItem({
    content,
    email,
    _ownerId,
    onDelete,
    _id
}) {
    const {user} = useContext(UserContext)
    const isOwner = _ownerId === user._id
    
    return (
        <>
           <li className="comment-item">
                    <div className="comment-header">
                        <span className="comment-author">{email}</span>
                    </div>
                    {isOwner && (
                    <button
                        className="comment-delete"
                        onClick={() => onDelete(_id)}
                        title="Delete comment"
                    >
                        ✕
                    </button>
                )}
                    <p className="comment-text">
                       {content}
                    </p>
                </li>
                </>
    )
}