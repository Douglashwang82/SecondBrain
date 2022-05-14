import React from 'react'
import {useNavigate, useParams} from 'react-router-dom';
type Props = {}

const Profile = (props: Props) => {
    let navigate = useNavigate();
    let {username} = useParams();
  return (
      <div>
    <div>Profile</div>
    <h2>This is the profile page, user: {username}</h2>
    <button onClick={() => navigate("/")}>Back</button>
    </div>
  )
}

export default Profile