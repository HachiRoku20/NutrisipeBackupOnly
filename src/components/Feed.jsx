import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery, userQuery, userFollowingPost } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles = 'bg-nGreen text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [text, setText] = useState('All');
  const [activeBtn, setActiveBtn] = useState('All');
  const { userId } = useParams();
  const { categoryId } = useParams();

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo?.sub]);


  useEffect(() => {
    setLoading(true);
    let query;
    if (categoryId) {
      query = searchQuery(categoryId);
    } else if (text === 'All') {
      query = feedQuery;
    } else {
      query = userFollowingPost(userInfo?.sub);
    }
    client.fetch(query).then((data) => {
      setPins(data);
      setLoading(false);
    });
  }, [text, userId, categoryId, userInfo?.sub]);

  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} recipes to your feed...`} />
    );
  }
  return (
    
    <div>
      <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('All');
              }}
              className={`${activeBtn === 'All' ? activeBtnStyles : notActiveBtnStyles}`}
              
            >
              All
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('Following');
              }}
              className={`${activeBtn === 'Following' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Following
            </button>
          </div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
      {pins?.length == 0 &&
        <div className="mt-10 text-center text-xl ">No Recipes Found!</div>
      }
    </div >
  );
};

export default Feed;