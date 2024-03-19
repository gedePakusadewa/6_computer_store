import UrlConst from "../resources/Urls.js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

const Profile = () =>{
  const [cookies, setCookie] = useCookies(['user']);

  const [profile, setProfile] = useState(null);

  useEffect(() =>{
    axios({
      method: 'get',
      url: UrlConst.PROFILE,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setProfile(res.data)
    }).catch((err) => {
      console.log("error in profile")
    })
  }, []);

  return(
    <>
      <h1>Profile</h1>
      <div>{profile.user.username}</div>
      <div>{profile.user.email}</div>
    </>
  )
}

export default Profile