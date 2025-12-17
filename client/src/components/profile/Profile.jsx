import './profile.css'
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import useRequest from "../../hooks/useRequest";
import { useParams } from "react-router";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";

export default function Profile() {
    const {userId} = useParams()
    const {user} = useContext(UserContext)
    
    const {request , isPending} = useRequest()
    const [profiler , setProfiler] = useState([])
    
    const serachParm = encodeURIComponent(`_ownerId="${userId}"`);

    useEffect(() => {
        if(userId !== user._id) {
        return
    }
        const controller = new AbortController()
        const getData = async () => {
            try{
            const data = await request(`http://localhost:3030/data/profiles?where=${serachParm}` ,'GET' , null , {signal : controller.signal})
            setProfiler(data[0])
            }
            catch(err) {
                if (err.name === 'AbortError') {
                    return
                    }
                 toast.error('Count not load profile')
            }
        }
        getData();
        return () => {
            controller.abort()
        }
    }, [userId])

    if(isPending) {
        return <Loading />
    }
    
    return (
       <section className="profile-page">
  <div className="profile-card">
    <h2 className="profile-title">Profile</h2>

    <div className="profile-layout">
      <div className="profile-left">
        {profiler?.profilePicture ? (
          <img
            className="profile-avatar"
            src={profiler.profilePicture}
            alt="Profile"
          />
        ) : (
          <div className="profile-avatar profile-avatar--placeholder">No image</div>
        )}
      </div>

      <div className="profile-right">
        <p className="profile-row"><strong>Email :</strong> <span>{profiler?.email}</span></p>
        <p className="profile-row"><strong>Username :</strong> <span>{profiler?.username}</span></p>
        <p className="profile-row"><strong>Gender :</strong> <span>{profiler?.gender}</span></p>
        <p className="profile-row"><strong>Years of experience :</strong> <span>{profiler?.years}</span></p>

        <div className="profile-block">
          <p className="profile-label"><strong>Bio :</strong></p>
          <p className="profile-text">{profiler?.bio}</p>
        </div>

        <div className="profile-block">
          <p className="profile-label"><strong>More :</strong></p>
          <p className="profile-text">{profiler?.more}</p>
        </div>
      </div>
    </div>
  </div>
</section>
    );

}