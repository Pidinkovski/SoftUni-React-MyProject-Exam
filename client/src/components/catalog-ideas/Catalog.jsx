import './catalog.css';

const categories = [
    { categoryType: 'workouts', categoryAbout: 'Workouts', imageUrl: '/images/categoryWorkout.jpg' },
    { categoryType: 'lifestyle', categoryAbout: 'Lifestyle', imageUrl: '/images/healthyLifeStyle.jpg' },
    { categoryType: 'food', categoryAbout: 'Food', imageUrl: '/images/healthyFood.jpg' },
    { categoryType: 'mindfull', categoryAbout: 'Mindful Set', imageUrl: '/images/mindfulSet.png' },
]
export default function Catalog() {
    return (
        <section className="catalog-ideas">
            <h2 className="catalog-title">Just choose your category , and enjoy others people have shared and tried</h2>

            <div className='catalog-ideas-scroller'>
                <ul className="catalog-ideas-list">
                    {categories.map((category) => (
                        <li
                            key={category.categoryType}
                            className="catalog-idea-item">
                            <div className="catalog-idea-image-wrapper">
                                <img src={category.imageUrl} alt={category.categoryType} className="catalog-idea-image" />
                            </div>
                            {category.categoryAbout}
                        </li>
                    ))}
                </ul>
            </div>
            <p className='catalog-last-text'>DONT FORGET if you have something that you think worked for your and makes you feel better , it will be pleasure to share with us.</p>
        </section>
    )
}