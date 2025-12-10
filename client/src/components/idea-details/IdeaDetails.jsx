import './ideaDetails.css'

export default function IdeaDetails() {
    return (
        <section className="idea-details-page">
            <div className="idea-details-card">
                <nav>
                    <ul className="back-nav">
                        <li className="back-btn" onClick={() => console.log('back to previous page')}>← Back</li>
                    </ul>
                </nav>
                <header className="idea-details-header">
                    <h2 className="idea-details-title">Idea title here</h2>

                    <div className="idea-details-meta">
                        <span className="idea-owner">
                            by <strong>Owners name</strong>
                        </span>

                        <span className="idea-likes">
                            Like <span>count of likes</span> likes
                        </span>
                    </div>
                </header>

                <div className="idea-details-body">
                    <h3 className="idea-section-title">Description</h3>
                    <p className="idea-description">wrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegq
                        wrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegq
                        wrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegqwrjegjqwegkwqgkqjegq
                    </p>
                </div>

                <footer className="idea-details-footer">
                    <div className="idea-actions-left">
                        <button className="btn like-btn">Like</button>
                    </div>

                    <div className="idea-actions-right">
                        <button className="btn edit-btn">Edit</button>
                        <button className="btn delete-btn">Delete</button>
                    </div>

                </footer>
            </div>
        </section>
    )
}