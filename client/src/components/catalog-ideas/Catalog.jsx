import { useNavigate } from 'react-router';
import './catalog.css';


const categories = [
    { categoryType: 'workout',
         categoryAbout: 'Workout', 
         imageUrl: '/images/categoryWorkout.jpg' ,
         shortInfo : 'Effective and fast workouts to do at home.There will be as for all levels beginners to advance.'
        },
    { categoryType: 'lifestyle', 
        categoryAbout: 'Lifestyle', 
        imageUrl: '/images/healthyLifeStyle.jpg',
         shortInfo : 'Here you can find what you can change in dayli routines and habits , to feel better.' 
    },
    { categoryType: 'food', 
        categoryAbout: 'Food',
        imageUrl: '/images/healthyFood.jpg',
         shortInfo : 'You will find easy,health and simple recipies to try at home , and to adjust to your diet.'
    },
    { categoryType: 'mindfull',
         categoryAbout: 'Mindful Set',
         imageUrl: '/images/mindfulSet.png',
         shortInfo : 'You will find tips , about how to create a better connect between mind and body , how to meditate , how to do manifistations etc...' },
]

export default function Catalog() {

    const navigate = useNavigate()

    return (
        <section className="catalog-ideas">
            <h2 className="catalog-title">Just choose your category , and enjoy others people have shared and tried</h2>

            <div className='catalog-ideas-scroller'>
                <ul className="catalog-ideas-list">
                    {categories.map((category) => (
                        <li
                            key={category.categoryType}
                            className="catalog-idea-item"
                            onClick={()=> navigate(`/ideas/${category.categoryType}`)}
                            >
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