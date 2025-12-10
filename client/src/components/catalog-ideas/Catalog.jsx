import { useNavigate } from 'react-router';
import './catalog.css';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Catalog() {

    const navigate = useNavigate()
    const { categories } = useContext(UserContext)

    return (
        <section className="catalog-ideas">
            <h2 className="catalog-title">Just choose your category , and enjoy others people have shared and tried</h2>

            <div className='catalog-ideas-scroller'>
                <ul className="catalog-ideas-list">
                    {Object.values(categories).map((category) => (
                        <li
                            key={category.categoryType}
                            className="catalog-idea-item"
                            onClick={() => navigate(`/ideas/${category.categoryType}`)}
                        >
                            <div className="catalog-idea-image-wrapper">
                                <img
                                    src={category.imageUrl}
                                    alt={category.categoryType}
                                    className="catalog-idea-image"
                                />
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