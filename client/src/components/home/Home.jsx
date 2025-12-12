import './home.css'

import useFetchOnMount from '../../hooks/useFetchOnMount';
import { useNavigate } from 'react-router';
import Loading from '../loading/Loading';

const BASE_URL = 'http://localhost:3030'

export default function Home() {

  const searchPart = encodeURIComponent('idea=ideaId:ideas')
  const { currentData ,isLoading } = useFetchOnMount(`${BASE_URL}/data/likes?load=${searchPart}`, [])
  const navigate = useNavigate()

  function getIdeasCount(likes) {

    const ideasWithProps = new Map()

    for (const like of likes) {
      const ideaId = like.ideaId;
      const title = like.idea?.title;

      if (!ideasWithProps.has(ideaId)) {
        ideasWithProps.set(ideaId, { ideaId, count: 0, title });
      }


      ideasWithProps.get(ideaId).count += 1;
    }

    return [...ideasWithProps.values()]
      .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title))
      .slice(0, 3);
  }

  const populizedIdeas = getIdeasCount(currentData);

  if(isLoading){
    return <Loading/>;
  }

  return (
    <section className="home">
      <div className="home-header-title">
        <h1>Welcome to Healty Lifestyle</h1>
      </div>

      <div className='home-center-text'>
        <p>If you want to improve your overall health and lifestyle, you are on the right place.</p>
        <p>Here you can find ideas about simple or advance workouts, lifestyle tips , how to stay healty and some delicious food recipies</p>
        <p>Also if you have something helpfull in mind , you can always share with us.</p>
      </div>
      <div className="home-popular">
        <p className='home-popular-title'>Here you can find also the most liked ideas : </p>
        <ul className="home-popular-list">
          {populizedIdeas?.map(idea => <li 
          key={idea?.ideaId} 
          className="home-popular-item"
          onClick={() => navigate(`/ideas/${idea.ideaId}/details`)}
          >
            <h3 className='home-popular-idea-title'>{idea?.title}</h3>
            <p className='home-popular-idea-likes'>Likes : {idea.count}</p>
          </li>)}

        </ul>
      </div>
    </section>
  )
}