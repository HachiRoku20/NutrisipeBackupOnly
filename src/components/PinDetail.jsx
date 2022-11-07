/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiTwotoneDelete, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReactTooltip from "react-tooltip";
import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import {
  pinDetailMorePinQuery,
  pinDetailQuery,
  ingredientBaseValue,
  fetchIngredientValue,
} from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  let alreadySaved = pinDetail?.save?.filter(
    (item) => item?.postedBy?._id === User?.sub
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      navigate("/");
    });
  };

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: User?.sub,
            postedBy: {
              _type: "postedBy",
              _ref: User?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          setSavingPost(false);
          fetchPinDetails();
        });
    }
  };

  // unsave a post
  const Unsave = (id) => {
    const ToRemove = [`save[userId=="${User.sub}"]`];
    client
      .patch(id)
      .unset(ToRemove)
      .commit()
      .then(() => {
        setSavingPost(false);
        fetchPinDetails();
      });
  };

  const deleteComment = (id) => {
    const ToRemove = [`comments[comment=="${id}"]`];
    client
      .patch(pinId)
      .unset(ToRemove)
      .commit()
      .then(() => {
        fetchPinDetails();
        setComment("");
        setAddingComment(false);
      });
    // window.location.reload();
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) {
    return <Spinner message="Loading Recipe" />;
  }

  return (
    <>
      {pinDetail && (
        <div
          className=" flex xl:flex-row flex-col m-auto bg-white w-full border rounded-lg float-root"
        >
          
          <div className="justify-center align-center items-center md:items-start flex-initial w-4/5 float-left">
            <img
              className="rounded-t-3xl rounded-b-lg px-10 py-10"
              src={pinDetail?.image && urlFor(pinDetail?.image).url()}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5  align-right float-right">
          <div className="w-auto align-right  ">
            {alreadySaved?.length !== 0 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  Unsave(pinDetail._id);
                }}
                className=" mt-5 bg-nOrange opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
              >
                <AiFillHeart />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(pinDetail._id);
                }}
                type="button"
                className="mt-5 bg-gray-400 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
              >
                <AiOutlineHeart />
              </button>
            )}

            {pinDetail.postedBy?._id === User.sub && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePin(pinDetail._id);
                  navigate("/home");
                }}
                className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
              >
                <AiTwotoneDelete />
              </button>
            )}
            <div >
              <div>
                <h1 className="text-4xl font-bold break-words mt-3 uppercase">
                  {pinDetail.title}
                </h1>
              </div>
              <p className="mt-3 py-4 capitalize font-semibold">
                {pinDetail.about}
              </p>
              {/* border for ingre */}
              <div className="flex justify-left items-left flex-col border bg-gray-100">
                
                  
                    <p 
                      className="font-bold ml-2.5 ">
                      {" "}Ingredients:{" "}
                    </p>

                    {pinDetail?.ingredientListPost.map((info) => {
                      return (
                        <div key={info?._key} className="float-root flex ml-2.5">
                         
                         
                            <li className="float-left py-4 capitalize flex flex-nowrap">{info.ingredientName}</li>
                            <li className="float-middle mx-3 pt-4 flex flex-nowrap ">{info.amount}</li>                     
                            <li className="float-middle pt-4 flex flex-nowrap">{info.metric}</li>
                         
                        </div>
                      );
                    })}
                  
                
                <p  className="font-semibold mb-1 ml-2.5">
                  {" "}
                  Procedure:{" "}
                </p>
                {pinDetail.procedure.map((item, i) => (
                  <ol
                    className="ml-2.5"
                    key={i}
                  >
                    <li className="capitalize" key={i}>
                      {item}
                    </li>
                  </ol>
                ))}
              </div>

              <div className="p-1 mt-3 border-2 border-black font-sans w-full">
                <div className="text-4xl font-extrabold leading-none">
                  Nutrition Facts
                </div>

                <div className="flex justify-between font-bold border-b-8 border-black"></div>
                <div className="flex justify-between items-end font-extrabold">
                  <div>
                    
                    <div className="text-4xl">Calories </div>
                  </div>
                  <div className="text-5xl">
                    {pinDetail?.nutritionPost?.calories}g
                  </div>
                </div>
                <div className="border-t-4 border-black text-sm pb-1">
                  <hr className="border-gray-500" />
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold ">Total Fat </span>
                      {pinDetail?.nutritionPost?.totalfat} g
                    </div>
                  </div>
                  <hr className="border-gray-500" />
                  <div className="flex justify-between">
                    <div>
                      {" "}
                      <span> Saturated Fat </span>
                      {pinDetail?.nutritionPost?.saturatedfat} g
                    </div>
                  </div>
                  <hr className="border-gray-500" />
                  <div>
                    <span className="italic">Trans Fat </span>
                    {pinDetail?.nutritionPost?.transfat} g
                  </div>
                  <hr className="border-gray-500" />
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold">Cholesterol </span>
                      {pinDetail?.nutritionPost?.cholesterol} mg
                    </div>
                  </div>
                  <hr className="border-gray-500" />
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold">Sodium </span>
                      {pinDetail?.nutritionPost?.sodium} mg
                    </div>
                  </div>
                  <hr className="border-gray-500" />
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold">Total Carbohydrate </span>
                      {pinDetail?.nutritionPost?.totalcarb} g
                    </div>
                  </div>
                  <hr className="border-gray-500" />
                  <div className="flex justify-between">
                    <div className="pl-4">
                      Dietary Fiber {pinDetail?.nutritionPost?.dietaryFiber} g
                    </div>
                  </div>
                  <hr className="border-gray-500" />
                  <div className="pl-4">
                    Total Sugar {pinDetail?.nutritionPost?.sugar} g
                    <div className="pl-4">
                      <hr className="border-gray-500" />
                    </div>
                  </div>
                  <hr className="border-gray-500" />
                  <div>
                    <span className="font-bold">Protein </span>
                    {pinDetail?.nutritionPost?.protein} g
                  </div>
                </div>
                <div className="border-t-8 border-black pt-1 text-sm">
                  <div className="flex justify-between">
                    <div>
                      Vitamin A {pinDetail?.nutritionPost?.vitaminA} mcg
                    </div>
                  </div>
                  <hr className="border-gray-500" />
                  <div className="flex justify-between">
                    <div>
                      Vitamin C {pinDetail?.nutritionPost?.vitaminC} mcg
                    </div>
                  </div>
                  <hr className="border-gray-500" />
                  <div className="flex justify-between">
                    <div>Calcium {pinDetail?.nutritionPost?.calcium} mcg</div>
                  </div>
                  <hr className="border-gray-500" />
                  <div className="flex justify-between">
                    <div>Iron {pinDetail?.nutritionPost?.iron} mg</div>
                  </div>
                  <div className="border-t-4 border-black flex leading-none text-xs pt-2 pb-1">
                    <div className="pr-1">*</div>
                    <div>
                    This nutrient fact estimation is based on System's nutrition database.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to={`/user-profile/${pinDetail?.postedBy._id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg "
            >
              <img
                src={pinDetail?.postedBy.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-semibold capitalize">
                {pinDetail.postedBy?.userName}
              </p>
            </Link>
            <h2 className="mt-5 text-2xl"> Comments </h2>
            <div className="min-h-100 overflow-y-auto h-40 w-auto">
              {pinDetail?.comments?.map((comment, i) => (
                <div
                  className="flex  gap-2 mt-5 items-center bg-white w-full rounded-lg  "
                  key={i}
                >
                  
                  <Link to={`/user-profile/${comment?.postedBy._id}`} className="flex">
                  <div className=" w-full float-root">
                    <div className="float-left ">
                      <div className="flex flex-nowrap "> 
                    <img
                      src={comment.postedBy?.image}
                      alt="user-profile"
                      className="pointer-events-none  w-10 h-10 rounded-full align-top cursor-pointer  "
                    />
                     </div></div>

                     <div className="font-bold  float-left">
                      <div className="flex flex-nowrap ml-2"> 
                      {comment.postedBy?.userName}
                      </div> </div>
                  
                 
                  <div className="float-middle ml-2">
                  <div  className="align-left mt-6 ml-6">
                    <p className=" break-all ml-4 ">{comment.comment}</p>
                  </div>
                  </div>
                  </div>
                  </Link>
                  <div className="flex flex-col mt-6">
                    {comment?.postedBy?._id === user._id ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteComment(comment?.comment);
                        }}
                        className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                      >
                        <ReactTooltip />
                        <p data-tip="Delete Comment">
                          <AiTwotoneDelete />
                        </p>
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className=" fixed w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-nOrange text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;
