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
            <p className='catalog-content-text'>These are the common categories types  , they are very spacefull and we can talk much in them.</p>
            <p className='catalog-content-text'>In every tab , you will see what is it about , and what is the context of it.There's always place for as newbies , as advanced users.</p>
            <p className='catalog-context-last'>So dont worry , be free to read and educate , its always better to ask and learn.</p>

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
            <p className='catalog-last-text font-bold   '>DONT FORGET if you have something that you think worked for your and makes you feel better , it will be pleasure to share with us.</p>
        </section>
    )
}