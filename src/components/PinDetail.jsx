/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiTwotoneDelete, AiOutlineHeart, AiFillHeart, AiOutlineEye, AiFillEyeInvisible} from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs"
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
// import {io} from "socket.io-client"


const PinDetail = ({ user }) => {
  const navigate = useNavigate();
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [liked, setLiked] = useState(false);

  // const socket = io("http://localhost:5000");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

      const isLoggedInUser = User && User.sub === pinDetail?.postedBy?._id;
      const isHidden = pinDetail?.isHidden;


  let alreadySaved = pinDetail?.save?.filter(
    (item) => item?.postedBy?._id === User?.sub
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];


  // const handleNotification = (type) => {
  //   type === 1 && setLiked(true);
  //   socket.emit("sendNotification", {
  //     senderName:  user,
  //     receiverName: pinDetail?.postedBy.userName,
  //     type, 
  //   });
  // };

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
          // handleNotification(1);
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

  const hidePin = (id) => {
    client
      .patch(id)
      .set({ isHidden: true })
      .commit()
      .then(() => {
        window.location.reload(false);
      });
  };
  const unhidePin = (id) => {
    client
      .patch(id)
      .set({ isHidden: false })
      .commit()
      .then(() => {
        window.location.reload(false);
      });
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
          // handleNotification(2);
        });
    }
  };
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Socket connection established");
  //   });
  // }, []);
  
  if (!pinDetail) {
    return <Spinner message="Loading Recipe..." />;
  }

  return (
    <>
       {pinDetail && (
        <div
          className=" flex xl:flex-row flex-col m-auto bg-white w-full border rounded-lg float-root"
        >
           {user?.isAdmin === true ? (null) : 
              pinDetail.postedBy?._id !== User.sub ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href ='mailto:nutrisipe@gmail.com?subject=Report Recipe';
                }}
                className="bg-white pl-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none" style={{ color: '#dc2626'}}
              >
                <BsExclamationCircle />
              </button>
            ) : null
              }

{pinDetail.postedBy?._id === user.sub ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(pinDetail._id);
                      navigate("/home");
                    }}
                    className= "bg-white pl-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none" style={{ color: '#dc2626'}}
                  >
                    <AiTwotoneDelete />
                  </button>
                ) : user?.isAdmin === true ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(pinDetail._id);
                      navigate("/home");
                    }}
                    className= "bg-white pl-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none" style={{ color: '#dc2626'}}
                  >
                    <AiTwotoneDelete />
                  </button>
                ) : null
                }
           <div className="justify-center align-center items-center md:items-start flex w-full float-left px-4">
            <img
              className="rounded-t-3xl rounded-b-lg  py-10 flex-row "
              src={pinDetail?.image && urlFor(pinDetail?.image).url()}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5  float-right">
            <div className="w-full  float-root ">
              <div className="w-48 float-left">
                <Link
                  to={`/user-profile/${pinDetail?.postedBy._id}`}
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg"
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
              </div>


              <div className="float-right pt-2">
                {alreadySaved?.length !== 0 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      Unsave(pinDetail._id);
                    }}
                    class= "mt-5 bg-nOrange opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
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
                    class= "mt-5 bg-nOrange opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    <AiOutlineHeart />
                  </button>
                )}

               
               
                  <>
                      {isLoggedInUser && (
                        <>
                          {isHidden ? (
                            <button  className="pl-2" onClick={() => unhidePin(pinDetail._id)}>
                              < AiFillEyeInvisible /> </button>
                          ) : (
                            <button className="pl-2" onClick={() => hidePin(pinDetail._id)}>
                            < AiOutlineEye /></button>
                          )}
                        </>
                      )}
                    </>
              </div>
            </div>


            <div className="align-right pt-16">
              <div>
                <h1 className="text-4xl font-bold break-words  uppercase">
                  {pinDetail.title}
                </h1>
              </div>
              <p className="mt-3 py-4 capitalize font-semibold">
                {pinDetail.about}
              </p>
              {/* border for ingre */}
             {/* border for ingre */}
             <div className="flex justify-left items-left flex-col border bg-gray-100 px-4 pb-4">
                <div className="container">
                  <table className="border-separate border-spacing-4 table-auto">

                    <thead className="  uppercase font-bold ">
                      <tr className="text-center" >
                        <th className="text-left">
                          ingredients
                        </th>

                        <th className="pl-9">
                          amount
                        </th>
                      </tr>
                    </thead>


                    {pinDetail?.ingredientListPost.map((info) => {
                      return (
                        <tbody>
                          <tr key={info?._key} >

                            <td className="text-left">
                              {info.ingredientName}
                            </td>

                            <td className="text-center pl-9">
                              {info.purchasedWeight}g
                            </td>


                          </tr>
                        </tbody>
                      );
                    })}

                  </table>
                </div>

                <p className="font-semibold mb-1 ml-1 ">
                  {" "}
                  Procedure:{" "}
                </p>
                {pinDetail.procedure.map((item, i) => (
                 
                  <ol
                    className="ml-2.5 list-disc pl-4"
                    key={i}
                  >
                    <li className="capitalize" key={i}>
                      {item}
                    </li>
                  </ol>
                  
                ))}


<div className="p-1 mt-3 border-2 border-black font-sans w-full ">
                  <div className="text-4xl font-extrabold leading-none">
                    Nutrition Facts
                  </div>

                  <div className="flex justify-between  border-b-8 border-black"></div>
                  <div className="flex justify-between items-end ">
                    <table className='w-full'>


                      <tbody className="w-full">
                        <tr className="text-center">

                          <td className="flex justify-start  uppercase font-extrabold">Serving Size:</td>
                          <td>{(pinDetail?.nutritionPost?.ediblePortionWeight).toFixed(0)}g</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start  uppercase font-extrabold">number of serving:</td>
                          <td>{pinDetail?.nutritionPost?.yieldAmount}</td>
                        </tr>

                        <tr className="text-center border-t-2 border-black w-full">

                          <td className="flex justify-start font-extrabold  ">Energy</td>
                          <td>{(pinDetail?.nutritionPost?.energy).toFixed(0)}kcal</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-extrabold ">Protein</td>
                          <td> {(pinDetail?.nutritionPost?.prot).toFixed(1)}g</td>
                        </tr>
                        <tr className="text-center">
                          {" "}
                          <td className="flex justify-star font-extrabold ">Fat</td>
                          <td> {(pinDetail?.nutritionPost?.fat).toFixed(1)}g</td>
                        </tr>

                        <tr className="text-center ">

                          <td className="flex justify-start font-extrabold ">Carbohydrate</td>
                          <td> {(pinDetail?.nutritionPost?.carb).toFixed(1)}g</td>
                        </tr>

                        <tr className="text-center border-t-4 border-black w-full">

                          <td className="flex justify-start font-bold">Calcium</td>
                          <td> {(pinDetail?.nutritionPost?.calcium).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Phosporus</td>
                          <td>{(pinDetail?.nutritionPost?.phos).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Iron</td>
                          <td> {(pinDetail?.nutritionPost?.iron).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Vitamin A</td>
                          <td>{(pinDetail?.nutritionPost?.vitA).toFixed(1)}mcg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Thiamine</td>
                          <td>{(pinDetail?.nutritionPost?.thia).toFixed(1)}mg</td>
                        </tr>
                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Riboflavin</td>
                          <td> {(pinDetail?.nutritionPost?.ribo).toFixed(1)} mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Niacin</td>
                          <td>{(pinDetail?.nutritionPost?.nia).toFixed(1)}mg NE</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Vitamin C</td>
                          <td >{(pinDetail?.nutritionPost?.vitC).toFixed(1)}mg</td>
                        </tr>

                      </tbody>


                    </table>
                    <hr className="border-gray-500" />

                  </div>


                </div>





              </div>

              <div className="flex-col flex ">
                {/* <div className="p-1 mt-3 border-2 border-black font-sans w-full  max-w-80   ">
                  <div className="text-4xl font-extrabold leading-none">
                    Nutrition Facts
                  </div>

                  <div className="flex justify-between  border-b-8 border-black"></div>
                  <div className="flex justify-between items-end ">
                    <table className='w-full'>


                      <tbody className="w-full">
                        <tr className="text-center">

                          <td className="flex justify-start  uppercase font-extrabold">Serving Size:</td>
                          <td>{(pinDetail?.nutritionPost?.ediblePortionWeight).toFixed(0)}g</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start  uppercase font-extrabold">number of serving:</td>
                          <td>{pinDetail?.nutritionPost?.yieldAmount}</td>
                        </tr>

                        <tr className="text-center border-t-2 border-black w-full">

                          <td className="flex justify-start font-extrabold  ">Energy</td>
                          <td>{(pinDetail?.nutritionPost?.energy).toFixed(0)}kcal</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-extrabold ">Protein</td>
                          <td> {(pinDetail?.nutritionPost?.prot).toFixed(1)}g</td>
                        </tr>
                        <tr className="text-center">
                          {" "}
                          <td className="flex justify-star font-extrabold ">Fat</td>
                          <td> {(pinDetail?.nutritionPost?.fat).toFixed(1)}g</td>
                        </tr>

                        <tr className="text-center ">

                          <td className="flex justify-start font-extrabold ">Carbohydrate</td>
                          <td> {(pinDetail?.nutritionPost?.carb).toFixed(1)}g</td>
                        </tr>

                        <tr className="text-center border-t-4 border-black w-full">

                          <td className="flex justify-start font-bold">Calcium</td>
                          <td> {(pinDetail?.nutritionPost?.calcium).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Phosporus</td>
                          <td>{(pinDetail?.nutritionPost?.phos).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Iron</td>
                          <td> {(pinDetail?.nutritionPost?.iron).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Vitamin A</td>
                          <td>{(pinDetail?.nutritionPost?.vitA).toFixed(1)}mcg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Thiamine</td>
                          <td>{(pinDetail?.nutritionPost?.thia).toFixed(1)}mg</td>
                        </tr>
                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Riboflavin</td>
                          <td> {(pinDetail?.nutritionPost?.ribo).toFixed(1)} mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Niacin</td>
                          <td>{(pinDetail?.nutritionPost?.nia).toFixed(1)}mg NE</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Vitamin C</td>
                          <td >{(pinDetail?.nutritionPost?.vitC).toFixed(1)}mg</td>
                        </tr>

                      </tbody>


                    </table>
                    <hr className="border-gray-500" />

                  </div>


                </div> */}

                <div className="w-auto">

                  <h2 className="mt-5 text-2xl"> Comments </h2>
                  <div className="min-h-100 overflow-y-auto h-96 w-auto">
                    {pinDetail?.comments?.map((comment, i) => (
                      <div
                        className="flex  gap-2 mt-5 items-center bg-gray-100 w-full rounded-lg  "
                        key={i}
                      >

                        <Link to={`/user-profile/${comment?.postedBy._id}`} className="flex">
                          <div className=" w-full float-root">
                            <div className="float-left mt-2 ml-2">
                              <div className="flex flex-nowrap ">
                                <img
                                  src={comment.postedBy?.image}
                                  alt="user-profile"
                                  className="pointer-events-none  w-10 h-10 rounded-full align-top cursor-pointer  "
                                />
                              </div>
                              </div>

                            <div className="font-bold  float-left mt-4">
                              <div className="flex flex-nowrap ml-2">
                                {comment.postedBy?.userName}
                              </div> </div>


                            <div className="float-middle ml-2">
                              <div className="align-left mt-12 ">
                                <p className=" break-all  ">{comment.comment}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="flex flex-col mt-12  items-center justify-center		">
                        {comment?.postedBy?._id === user._id || user.isAdmin  ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteComment(comment?.comment);
                              }}
                              className="bg-white p-2 rounded-full w-8 h-8 flex items-end justify-center text-dark opacity-75 hover:opacity-100 outline-none"
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
                  <div className="flex flex-wrap mt-6 gap-3 w-full sm:w-full pt-6 ">
                    {/* <Link to={`/user-profile/${user._id}`}>
                      <img
                        src={user.image}
                        className=" fixed w-10 h-10 rounded-full cursor-pointer"
                        alt="user-profile"
                      />
                    </Link> */}
                    <input
                      className=" flex-1 border-gray-100 w-full outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                      type="text"
                      placeholder="Add a comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      type="button"
                      className="bg-nOrange opacity-70 hover:opacity-100 text-white rounded-full w-24 px-6 py-2 font-semibold text-base outline-none"
                      onClick={addComment}
                    >
                      {addingComment ? "Posting..." : "Post"}
                    </button>
                  </div>
                </div>
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
        <Spinner message="Loading more recipes..." />
      )}
    </>
  );
};

export default PinDetail;
