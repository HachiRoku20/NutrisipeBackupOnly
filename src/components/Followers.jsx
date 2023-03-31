import React, { useState, useEffect } from 'react'
import Spinner from './Spinner';
import { useParams, Link } from 'react-router-dom';
import { client } from '../client';
import { fetchUser } from '../utils/fetchUser';
import { userfollowers } from '../utils/data';

const Followers = () => {
   
  const [followers, setFollowers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState();
  const { userId } = useParams();
  const user = fetchUser();

  const fetchfollowers = () => {
    setLoading(true);
    const followers = userfollowers(userId);
    client.fetch(followers).then((data) => {
      setFollowers(data[0]);
      setLength(data[0]?.followers?.filter((index) => index.postedBy)?.length);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchfollowers();
  }, [userId]);
  
  const unfollow = (id) => {
    client
      .patch(id)
      .unset([`following[userId=="${user.sub}"]`])
      .commit()
      .catch((error) => {
        console.error(`Error while removing current user from followers: ${error.message}`);
      })
      .then(() => {
        client
          .patch(user.sub)
          .unset([`followers[userId=="${id}"]`])
          .commit()
          .catch((error) => {
            console.error(`Error while removing unfollowed user from following: ${error.message}`);
          })
          .then(() => {
            console.log('Unfollowed user removed from followers and following');
            fetchfollowers();
          });
      });
  };


  if(loading) return <Spinner message="Loading followers..." />

  if (!length) return <p className='mt-96 flex flex-col justify-center items-center text-nGreen text-2xl  transition-all duration-150 ease-in'>
    No Current Followers</p>
  

  return (
    <>
      <div className='md:flex md:flex-row '>
        {followers?.followers?.map((index, i) => (
            <div className="flex gap-2 ml-2 lg:w-1/6 md:w-full mt-5 items-center bg-white rounded-lg" key={i}>
              <Link to={`/user-profile/${index.postedBy?._id}`}>
              <img
                src={index?.postedBy?.image}
                alt="user-profile"
                className='pointer-events-none w-10 h-10 rounded-full cursor-pointer md:w-30 md:h-30 lg:w-10 ' 
              />
              </Link>
              <Link to={`/user-profile/${index.postedBy?._id}`}>
                <div className='flex flex-col'>
                  <p className='font-bold'>{index.postedBy?.userName}</p>
                </div>
              </Link>
             
            </div>
        ))}
      </div>
    </>
  )
}

export default Followers;
