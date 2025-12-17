import './commentItem.css'
export default function CommentItem({
    content,
    email,

}) {
    return (
        <>
           <li className="comment-item">
                    <div className="comment-header">
                        <span className="comment-author">{email}</span>
                    </div>

                    <p className="comment-text">
                       {content}
                    </p>
                </li>
                </>
    )
}