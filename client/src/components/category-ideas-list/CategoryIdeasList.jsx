import { useParams } from "react-router"
import './categoryIdeasList.css'
const categories = {
    'workout' : {
        categoryType: 'workout',
        categoryAbout: 'Workout',
        imageUrl: '/images/categoryWorkout.jpg',
        shortInfo: 'Effective and fast workouts to do at home.There will be as for all levels beginners to advance.'
    },
    'lifestyle' : {
        categoryType: 'lifestyle',
        categoryAbout: 'Lifestyle',
        imageUrl: '/images/healthyLifeStyle.jpg',
        shortInfo: 'Here you can find what you can change in dayli routines and habits , to feel better.'
    },
    'food' : {
        categoryType: 'food',
        categoryAbout: 'Food',
        imageUrl: '/images/healthyFood.jpg',
        shortInfo: 'You will find easy,health and simple recipies to try at home , and to adjust to your diet.'
    },
    'mindful' : {
        categoryType: 'mindful',
        categoryAbout: 'Mindful Set',
        imageUrl: '/images/mindfulSet.png',
        shortInfo: 'You will find tips , about how to create a better connect between mind and body , how to meditate , how to do manifistations etc...'
    },
}

const ideasInCategory = [
    {
        _id: '1',
        title: '10-Minute Full Body Workout',
        imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.UKJEzYaeLjM1nVYy5mALewHaE7?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
        conciseContext: 'A quick and effective workout targeting all major muscle groups.'
    },
    {
        _id: '2',
        title: '12-Minute Full Body Workout',
        imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.7PPlBrxoWsdLe01tt2cZbAHaE0?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
        conciseContext: 'A quick and effective workout targeting all major muscle groups.'
    },
    {
        _id: '3',
        title: '13-Minute Full Body Workout',
        imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.UKJEzYaeLjM1nVYy5mALewHaE7?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
        conciseContext: 'A quick and effective workout targeting all major muscle groups.'
    },
    {
        _id: '4',
        title: '14-Minute Full Body Workout',
        imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.AHjdBpv-Rc34JuDYhcxDhQHaE7?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
        conciseContext: 'A quick and effective workout targeting all major muscle groups.'
    },
]

export default function CategoryIdeasList() {

    const { categoryName } = useParams()    
    console.log(categories[categoryName]);
    
    const curerentCategory = categories[categoryName]
    
    
    
    
    
    return (
        <section className="category-ideas">
            <nav>
                <ul className="back-nav">
                    <li className="back-btn" onClick={() => console.log('back to previous page')}>← Back</li>
                </ul>
            </nav>
            <div>
                <header className="category-ideas-header">
                    <h2>{curerentCategory?.categoryAbout}</h2>
                    <p>{curerentCategory?.shortInfo}</p>
                </header>
            </div>

            <ul className="category-ideas-grid">
                {ideasInCategory.map((idea) => (
                    <li
                     key={idea._id} 
                     className="category-idea-card"
                     onClick={() => console.log('details page fore idea' + idea._id)}
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