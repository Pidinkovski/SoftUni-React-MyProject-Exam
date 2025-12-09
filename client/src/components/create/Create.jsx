import './create.css';

const categories = [
    { value: 'workouts', categoryAbout: 'Workouts', imageUrl: '/images/categoryWorkout.jpg' },
    { value: 'lifestyle', categoryAbout: 'Lifestyle', imageUrl: '/images/healthyLifeStyle.jpg' },
    { value: 'food', categoryAbout: 'Food', imageUrl: '/images/healthyFood.jpg' },
    { value: 'mindfull', categoryAbout: 'Mindful Set', imageUrl: '/images/mindfulSet.png' },
]
export default function Create() {

    return (
        <section className="create-page">
            <div className="create-card">
                <h2 className="create-title">Create a New Idea</h2>

                <form className="create-form">

                    <div className="form-item">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input
                            className="form-input"
                            id="title"
                            type="text"
                            name="title"
                        />
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="imageUrl">Image URL</label>
                        <input
                            className="form-input"
                            id="imageUrl"
                            type="text"
                            name="imageUrl"
                        />
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea
                            className="form-input textarea"
                            id="description"
                            name="description"
                        ></textarea>
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="conciseContent">Concise Content</label>
                        <textarea
                            className="form-input textarea"
                            id="conciseContent"
                            name="conciseContent"
                            placeholder='Say in few fords what is it about'
                        ></textarea>
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="category">Category</label>
                        <select
                            className="form-input"
                            id="category"
                            name="category"
                        >
                            {categories.map((category) => <option key={category.value} value={category.value}>{category.categoryAbout}</option>)
                            }
                        </select>
                    </div>

                    <button type="submit" className="btn create-btn">
                        Create Idea
                    </button>

                </form>
            </div>
        </section>
    )
}