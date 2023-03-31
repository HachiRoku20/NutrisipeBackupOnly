/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-alert, no-console */
import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { searchChosenIngredientQuery } from "../utils/data";
import { client } from "../client";
import { categories } from "../utils/data";
import Spinner from "./Spinner";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingIngredient, setLoadingIngredient] = useState(false);
  const [fields, setFields] = useState();
  const [ingredientFields, setIngredientFields] = useState();
  const [nonIngredientFields, setNonIngredientFields] = useState(false);
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [procedure, setProcedure] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [yieldAmount, setYieldAmount] = useState("");

  //INDICATOR FOR NON INGREDIENT MODAL
  const [nonIngredient, setNonIngredient] = useState(false);

  const [dropdownClick, setDropdownClick] = useState(true);

  //Ingredient Label For Users
  const [nonChosenIngredient, setNonChosenIngredient] = useState("");
  const [nonChosenAmount, setNonChosenAmount] = useState("");
  //Full Ingredient Object storage after search -- TEMPORARY STORAGE
  const [chosenIngredient, setChosenIngredient] = useState("");
  const [chosenIngredientObject, setchosenIngredientObject] = useState();
  const [ingredientDropDown, setIngredientDropDown] = useState([]);
  const [amount, setAmount] = useState("");
  const [finalRecipeObject, setFinalRecipeObject] = useState([]);
  const [finalNonRecipeObject, setFinalNonRecipeObject] = useState([]);
  const [nutrientTable, setNutrientTable] = useState([]);

  const ModalHandlerOpen = () => {
    setModalOpen(true);
    // console.log(finalRecipeObject);
    // console.log(nutrientTable)
    const listadd = finalRecipeObject.concat(finalNonRecipeObject);
    console.log(listadd)
  };
  const ModalHandlerClose = () => {
    setModalOpen(false);
  };

  //INGREDIENT SEARCH == SHOW DROPDOWN
  useEffect(() => {
    if (chosenIngredient !== "") {
      setLoadingIngredient(true);
      const query = searchChosenIngredientQuery(chosenIngredient.toLowerCase());
      client.fetch(query).then((data) => {
        //CHECK FOR DROPDOWN CLICK REMOVES DOUBLE DROPDOWN SHOWING
        if (dropdownClick) {
          setIngredientDropDown(data);

          setLoadingIngredient(false);
          console.log(ingredientDropDown)
        } else {
          setIngredientDropDown([]);

          setLoadingIngredient(false);
        }
      });
      //RESET EVERYTHING IF TEXTBOX IS EMPTY
    } else {
      setIngredientDropDown([]);

      setLoadingIngredient(false);
    }
  }, [chosenIngredient]);

  // CHANGE INGREDIENT WHEN DROPDOWN IS CLICKED && RESET DROPDOWNSTATE
  const ChooseIngredientHandler = (a) => {
    setChosenIngredient(a.foodItem);
    setchosenIngredientObject(a);
    setIngredientDropDown([]);
  };

  // Handlers when to Open And Close Dropdown when selected -- AVOIDS DOUBLE SEARCHING DROPDOWN
  const dropdownClickHandlerOpen = () => {
    setDropdownClick(true);
  };
  const dropdownClickHandlerClose = () => {
    setDropdownClick(false);
  };

  const nonIngredientHandler = () => {
    setNonIngredient(true);
  };

  const nonIngredientHandlerClose = () => {
    setNonIngredient(false);
  };
  //SAVE NON INGREDIENTS TO LIST NO NUTRIENT VALUE
  const nonIngredientConfirm = () => {
    if (nonChosenIngredient && nonChosenAmount) {
      const doc = {
        ingredientName: "* " + nonChosenIngredient,
        ediblePortionWeight: 0,
        purchasedWeight: nonChosenAmount,
      };

      const newArray = [...finalNonRecipeObject, doc];
      setFinalNonRecipeObject(newArray);

      setNonChosenIngredient("");
      setNonChosenAmount("");
      setIngredientDropDown([]);
      setNonIngredient(false);
    } else {
      setNonIngredientFields(true);

      setTimeout(() => {
        setNonIngredientFields(false);
      }, 4000);
    }
  };

  //Handler For Ingredient List Button -- MAIN STORAGE OF FULL INGREDIENT OBJECT -- USES PUSH AND MAKES ARRAY OF OBJECTS TO BE MANIPULATED FOR FINAL RESULT

  const handleIngredientList = () => {
    if (
      chosenIngredientObject && amount
    ) {

      const doc = {
        ingredientName: chosenIngredientObject.foodItem,
        purchasedWeight: Number(amount),
        ediblePortionWeight: Number(amount) * (chosenIngredientObject.ediblePortion / 100),
        energy: (chosenIngredientObject.energy * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        prot: (chosenIngredientObject.prot * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        fat: (chosenIngredientObject.fat * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        carb: (chosenIngredientObject.carb * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        calcium: (chosenIngredientObject.calcium * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        phos: (chosenIngredientObject.phos * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        iron: (chosenIngredientObject.iron * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        vitA: (chosenIngredientObject.vitA * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        thia: (chosenIngredientObject.thia * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        ribo: (chosenIngredientObject.ribo * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        nia: (chosenIngredientObject.nia * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        vitC: (chosenIngredientObject.vitC * 0.01) * (Number(amount) * (chosenIngredientObject.ediblePortion / 100)),
        _key: chosenIngredientObject._key,
      };

      const newArray = [...finalRecipeObject, doc];
      setFinalRecipeObject(newArray);

      setChosenIngredient("");
      setchosenIngredientObject();

      setIngredientDropDown([]);
      setAmount("");
    } else {
      setIngredientFields(true);

      setTimeout(() => {
        setIngredientFields(false);
      }, 4000);
    }
  };

  // USE EFFECT FOR CONSTANT RECALCULATION FOR SUM OF ALL NUTRIENTS IN THE FinalRecipeObject
  // NUTRIENT TABLE = SUM OF ALL NUTRIENTS IN FINAL RECIPE OBJECT
  useEffect(() => {
    if (finalRecipeObject.length !== 0) {
      var add = finalRecipeObject.reduce(function (
        previousValue,
        currentValue
      ) {
        return {
          ediblePortionWeight: previousValue.ediblePortionWeight + currentValue.ediblePortionWeight,
          energy: previousValue.energy + currentValue.energy,
          prot: previousValue.prot + currentValue.prot,
          fat: previousValue.fat + currentValue.fat,
          carb: previousValue.carb + currentValue.carb,
          calcium: previousValue.calcium + currentValue.calcium,
          phos: previousValue.phos + currentValue.phos,
          iron: previousValue.iron + currentValue.iron,
          vitA: previousValue.vitA + currentValue.vitA,
          thia: previousValue.thia + currentValue.thia,
          ribo: previousValue.ribo + currentValue.ribo,
          nia: previousValue.nia + currentValue.nia,
          vitC: previousValue.vitC + currentValue.vitC,
        };
      });

      // DIVISION FOR YIELD AMOUNT
      var addFinal = {
        ediblePortionWeight: add.ediblePortionWeight / yieldAmount,
        yieldAmount: yieldAmount,
        energy: add.energy / yieldAmount,
        prot: add.prot / yieldAmount,
        fat: add.fat / yieldAmount,
        carb: add.carb / yieldAmount,
        calcium: add.calcium / yieldAmount,
        phos: add.phos / yieldAmount,
        iron: add.iron / yieldAmount,
        vitA: add.vitA / yieldAmount,
        thia: add.thia / yieldAmount,
        ribo: add.ribo / yieldAmount,
        nia: add.nia / yieldAmount,
        vitC: add.vitC / yieldAmount,
      }

      setNutrientTable(addFinal);
    }
  }, [finalRecipeObject, yieldAmount]);

  const deleteFinalRecipeObjectHandler = (i) => {
    let newDataArr = [...finalRecipeObject];
    newDataArr.splice(i, 1);
    setFinalRecipeObject(newDataArr);
  };

  const deleteFinalNonRecipeObjectHandler = (i) => {
    let newDataArr = [...finalNonRecipeObject];
    newDataArr.splice(i, 1);
    setFinalNonRecipeObject(newDataArr);
  };

  // handle procedure

  const handleProcedureAdd = () => {
    const qwe = [...procedure, []];
    setProcedure(qwe);
  };
  const handleProcedureChange = (onChangeValue, u) => {
    const inputdata = [...procedure];
    inputdata[u] = onChangeValue.target.value;
    setProcedure(inputdata);
  };
  const handleProcedureDelete = (u) => {
    const deleteProcedure = [...procedure];
    deleteProcedure.splice(u, 1);
    setProcedure(deleteProcedure);
  };

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    const listadd = finalRecipeObject.concat(finalNonRecipeObject)

    if (
      title &&
      about &&
      procedure &&
      imageAsset?._id &&
      category &&
      finalRecipeObject &&
      finalRecipeObject.length != 0
    ) {
      const doc = {
        _type: "pin",
        _key: uuidv4(),
        title,
        about,
        procedure,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
        ingredientListPost: listadd,
        nutritionPost: nutrientTable,
        isHidden: false
      };
      client.create(doc).then(() => {
        navigate("/");
        console.log(doc);
      });
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      <div className=" flex lg:flex-row flex-col justify-center items-start bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full mt-32">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-blue-400 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg font-semibold">Click to upload</p>
                  </div>

                  <p className="mt-3 text-gray-400 text-xs">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                    TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1 lg:pl-5 mt-5 w-full ">
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <div className="flex flex-1 flex-col gap-6  mt-2 w-auto">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your recipe a title"
              className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
            />
          </div>

          <div className="flex flex-1 flex-col gap-6  mt-5 w-auto">
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Recipe Description"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 "
            />
          </div>




          <label class="block uppercase tracking-wide text-gray-700 text-xs font-semibold pt-4">
            number of serving
          </label>
          <div className="flex flex-nowrap  pb-4 ">
            <input
              type="number"
              step="1"
              min="0"
              value={yieldAmount}
              onChange={(e) => setYieldAmount(e.target.value)}
              placeholder="Yield Amount"
              className=" block p-2 w-36 h-9 bg-white outline-none border rounded-lg "
              onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
            />
          </div>
          <div className="h-auto grid  content-evenly w-auto float-root flex items-stretch ">
            {/* NUTRIENT MODULE */}
            {ingredientFields && (
              <p className="text-nGreen mr-5 text-medium transition-all duration-150 ease-in ">
                Please add all ingredient fields.
              </p>
            )}


            <div className="float-left py-4 bg-gray-200 rounded pl-3 pr-3">
              <p className="font-semibold ">Add Ingredient to the list: </p>


              <label class="block uppercase tracking-wide text-gray-700 text-xs font-semibold mt-4">
                Search
              </label>
              <div className="flex flex-nowrap flex-1 flex-col gap-6 w-auto ">
                <input
                  type="text"
                  onChange={(e) => {
                    setChosenIngredient(e.target.value);
                    dropdownClickHandlerOpen();
                  }}
                  onBlur={() => dropdownClickHandlerClose()}
                  placeholder="Search Ingredient"
                  value={chosenIngredient}
                  className="outline-none text-base sm:text-lg border-b-2 border-gray-200  rounded-md"
                />
              </div>

              {/* DISPLAY ALERT IF NO INGREDIENTS FOUND */}
              <div>
                {ingredientDropDown.length == 0 &&
                  chosenIngredient !== "" &&
                  !loadingIngredient &&
                  dropdownClick && (
                    <div className="text-xs">NO INGREDIENTS FOUND</div>
                  )}

                {/* DISPLAY WHEN LOADING SEARCH INGREDIENTS */}
                {loadingIngredient && <div className="text-xs "> <Spinner message="Loading Ingredients" /></div>}

                {/* DROPDOWN BAR FOR INGREDIENT SEARCH */}
                 

                <div className="border bg-gray-100 min-h-100 overflow-y-auto max-h-24 w-auto ">
                  {ingredientDropDown?.map((item) => (
                    <div
                      className="opacity-70 hover:opacity-100"
                      onClick={() => {
                        ChooseIngredientHandler(item);
                        dropdownClickHandlerClose();
                      }}
                      key={item?._key}
                    >
                      {item?.foodItem} 
                      
                    </div>
                  ))}
                </div>
                
              </div>
              {/* amount */}
              {ingredientDropDown.length == 0 && (
                <div className="float-left py-4  ">
                  <label class="block  tracking-wide text-gray-700 text-xs font-semibold ">
                    Amount (g)
                  </label>
                  <div className=" flex flex-nowrap ">
                    {/* <div class="flex flex-nowrap"> */}
                    <input
                      type="number"
                      step="1"
                      min="0"
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Grams"
                      value={amount}
                      className="  block p-2 w-24 h-9 bg-white outline-none border rounded-lg "
                      onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                    />
                    {/* </div> */}
                    <div>
                      <div className="flex flex-nowrap pl-8">
                        {/* metric */}


                        <button
                          className="text-nGreen hover:text-white hover:bg-nGreen  w-24 h-6 float-left py-1  mt-2 text-xs font-bold text-center text-white bg-gray-50 rounded-full border "
                          onClick={() => handleIngredientList()}
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="float-root">
              <div className="float-left flex flex-nowrap mb-8 ">
                {!nonIngredient && (
                  <button
                    onClick={() => nonIngredientHandler()}
                    className="text-nGreen underline underline-offset-1 opacity-70 hover:opacity-100"
                  >
                    Ingredient not in database? Add without nutrition data.
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* modal  */}
          {nonIngredient && (
            <div
              className="fixed inset-0 bg-black-500 bg-opacity-30 backdrop-blur-lg  flex flex-col 
    justify-center items-center  "
            >
              <div className="fixed bg-gray-100 rounded-md h-auto w-auto ">
                <div className="p-1 border-2 border-black font-sans w-full">
                  <div className="h-auto grid  content-evenly w-auto float-root flex items-stretch ">
                    <p>
                      This Ingredient will not be included in the nutrition fact
                      estimation.
                    </p>

                    {nonIngredientFields && (
                      <p className="text-nGreen mr-5 text-medium transition-all duration-150 ease-in ">
                        Please add all ingredient fields.
                      </p>
                    )}
                    <div className="float-left py-4 ">
                      <div className="flex flex-nowrap flex-1 flex-col gap-6 w-auto ">
                        <input
                          type="text"
                          onChange={(e) => {
                            setNonChosenIngredient(e.target.value);
                          }}
                          placeholder="Ingredients"
                          value={nonChosenIngredient}
                          className="outline-none text-base sm:text-lg border-b-2 border-gray-200 "
                        />
                      </div>

                      <div className="float-left py-4 ">
                        <div className=" flex flex-nowrap ">
                          {/* <div class="flex flex-nowrap"> */}
                          <input
                            type="number"
                            step="1"
                            min="0"
                            onChange={(e) => setNonChosenAmount(e.target.value)}
                            placeholder="Amount"
                            value={nonChosenAmount}
                            className="  block p-2 w-24 h-9 bg-white outline-none border rounded-lg "
                            onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                          />
                          <div>
                            <div class="flex flex-nowrap pl-8">
                              <button
                                className="text-nGreen hover:text-white hover:bg-nGreen w-24 h-6 float-left py-1 ml-6 mt-2 text-xs font-bold text-center text-white bg-gray-50 rounded-full border border-nGreen"
                                onClick={() => nonIngredientConfirm()}
                              >
                                ADD
                              </button>
                            </div>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      href="mailto:nutrisipe@gmail.com?subject=Request an ingredient"
                      className="text-nGreen underline underline-offset-1"
                    >
                      Send Ingredient Email Request Instead?
                    </a>
                    <div className="mt-3 pb-4">
                      <button
                        className="ml-2 transition ease-in-out delay-150 w-24 border border-blue-300 rounded-full bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nRed "
                        onClick={() => nonIngredientHandlerClose()}
                      >
                        close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-left items-left flex-col  w-full ">
            <p className="font-semibold"> Ingredient List: </p>
            {/* {finalRecipeObject.map((info, i) => {
              return (
                <div key={i} className="float-root  flex full">
                  <div className=" float-left  py-4 ">
                    <div

                      className="capitalize flex flex-nowrap ml-2.5"
                    >
                      {info.ingredientName}
                    </div>
                  </div>
                  <div className="float-middle py-4 ">
                    <div

                      className=" flex flex-nowrap ml-2.5"
                    >
                      {info.ediblePortionWeight + "g"}
                    </div>
                  </div>
                  <div className="float-middle py-4 ">
                    <div

                      className=" flex flex-nowrap ml-2.5"
                    >
                      {info.purchasedWeight + "g"}
                    </div>
                  </div>
                  <button
                    className=" pt-1 text-nRed mx-4  text-xs font-bold text-center  p-1 "
                    onClick={() => deleteFinalRecipeObjectHandler(i)}
                  >
                    Delete
                  </button>
                </div> */}


            {/* {finalNonRecipeObject.map((info, i) => {
              return (
                <div key={i} className="float-root  flex full">
                  <div className=" float-left  py-4 ">
                    <div

                      className="capitalize flex flex-nowrap ml-2.5"
                    >
                      {info.ingredientName}
                    </div>
                  </div>
                  <div className="float-middle py-4 ">
                    <div

                      className=" flex flex-nowrap ml-2.5"
                    >
                      {info.ediblePortionWeight + "g"}
                    </div>
                  </div>
                  <div className="float-middle py-4 ">
                    <div

                      className=" flex flex-nowrap ml-2.5"
                    >
                      {info.purchasedWeight + "g"}
                    </div>
                  </div>
                  <button
                    className=" pt-1 text-nRed mx-4  text-xs font-bold text-center  p-1 "
                    onClick={() => deleteFinalNonRecipeObjectHandler(i)}
                  >
                    Delete
                  </button>
                </div>
              );
            })} */}

            <div class="flex flex-col">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <thead class="bg-white border-b">
                        <tr>
                          <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                            Ingredients
                          </th>
                          <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                            As Purchased
                          </th>
                          <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                            Edible Weight
                          </th>
                          <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-left">

                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {finalRecipeObject.map((info, i) => {
                          return (
                            <tr key={i} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{info.ingredientName}</td>

                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {info.purchasedWeight + "g"}
                              </td>
                              <td class="text-sm text-gray-900 font-simibold px-6 py-4 whitespace-nowrap">
                                {info.ediblePortionWeight.toFixed(1) + "g"}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <button
                                  className=" pt-1 text-nRed mx-4  text-xs font-bold text-center  p-1 "
                                  onClick={() => deleteFinalRecipeObjectHandler(i)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>

                          );
                        })}

                        {finalNonRecipeObject.map((info, i) => {
                          return (
                            <tr key={i} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{info.ingredientName}</td>
                              <td class="text-sm text-gray-900 font-simibold px-6 py-4 whitespace-nowrap">
                                {info.ediblePortionWeight + "g"}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {info.purchasedWeight + "g"}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <button
                                  className=" pt-1 text-nRed mx-4  text-xs font-bold text-center  p-1 "
                                  onClick={() => deleteFinalRecipeObjectHandler(i)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {" "}
          </div>

          {ModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col 
            justify-center items-center  "
            >
              <div className="fixed bg-gray-100 rounded-md h-auto w-96 ">
                <div className="p-1 border-2 border-black font-sans w-full">
                  <div className="text-4xl font-extrabold leading-none">
                    Nutrition Facts
                  </div>

                  <div className="flex justify-between font-bold border-b-8 border-black"></div>
                  <div className="flex justify-between items-end ">
                    <table className='w-full'>


                      <tbody className="w-full">
                        <tr className="text-center">

                          <td className="flex justify-start  uppercase font-extrabold">Serving Size:</td>
                          <td>{(nutrientTable.ediblePortionWeight).toFixed(0)}g</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start  uppercase font-extrabold">number of serving:</td>
                          <td>{nutrientTable.yieldAmount}</td>
                        </tr>

                        <tr className="text-center border-t-2 border-black">

                          <td className="flex justify-start   font-extrabold">Energy</td>
                          <td>{(nutrientTable.energy).toFixed(0)}kcal</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start  font-extrabold">Protein</td>
                          <td>{(nutrientTable.prot).toFixed(1)}g</td>
                        </tr>
                        <tr className="text-center">

                          <td className="flex justify-star   font-extrabold">Fat</td>
                          <td>{(nutrientTable.fat).toFixed(1)}g</td>
                        </tr>

                        <tr className="text-center ">

                          <td className="flex justify-start   font-extrabold">Carbohydrate</td>
                          <td>{(nutrientTable.carb).toFixed(1)}g</td>
                        </tr>

                        <tr className="text-center border-t-4 border-black">

                          <td className="flex justify-start font-bold">Calcium</td>
                          <td>{(nutrientTable.calcium).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Phosporus</td>
                          <td>{(nutrientTable.phos).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Iron</td>
                          <td>{(nutrientTable.iron).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Vitamin A</td>
                          <td>{(nutrientTable.vitA).toFixed(1)}mcg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Thiamine</td>
                          <td>{(nutrientTable.thia).toFixed(1)}mg</td>
                        </tr>
                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Riboflavin</td>
                          <td>{(nutrientTable.ribo).toFixed(1)}mg</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Niacin</td>
                          <td>{(nutrientTable.nia).toFixed(1)}mg NE</td>
                        </tr>

                        <tr className="text-center">

                          <td className="flex justify-start font-bold">Vitamin C</td>
                          <td >{(nutrientTable.vitC).toFixed(1)}mg</td>
                        </tr>

                      </tbody>


                    </table>
                    <hr className="border-gray-500 mt-36" />

                  </div>
                </div>

                <div className="mt-3 mb-4">
                  <button
                    className="ml-2 transition ease-in-out delay-150 w-24 border border-blue-300 rounded-full bg-nGreen  text-white hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nOrange duration-300"
                    onClick={ModalHandlerClose}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          )}
          {!ModalOpen && finalRecipeObject.length != 0 && yieldAmount != 0 && (
            <button
              className="mt-5 text-white w-24 h-7.5 float-left py-1 px-1  text-xs font-bold text-center text-white bg-nOrange opacity-70 hover:opacity-100 rounded-full border border-blue-300"
              onClick={ModalHandlerOpen}
            >
              See Nutrients
            </button>
          )}

          {/* div for procedures */}
          <div className="flex flex-1 flex-col gap-2 mt-2 w-full py-4">
            <label className=" font-semibold">Procedure</label>
            {procedure.map((data, u) => (
              <div className="flow-root">
                {/* textarea for procedures */}
                <textarea
                  key="u"
                  id="message"
                  rows="4"
                  className="float-left block w-full h-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
                  placeholder="Procedure"
                  value={data}
                  onChange={(e) => handleProcedureChange(e, u)}
                />
                {/* button for x procedures */}
                <button
                  onClick={() => handleProcedureDelete(u)}
                  className="text-nRed w-5 h-5 float-right px-1 mx-1 mt-1 text-xs font-bold text-center text-white bg-gray-50 rounded-lg border border-red-200"
                >
                  x
                </button>
              </div>
            ))}
            {/* button for add procedures */}
            <button
              className="text-nGreen hover:text-white hover:bg-nGreen w-24 h-7.5 float-left py-1  text-xs font-bold text-center text-white bg-gray-50 rounded-full border border-nGreen opacity-70 hover:opacity-100"
              onClick={() => handleProcedureAdd()}
            >
              ADD
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">
                Choose Recipe Category
              </p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white ">
                  Select Category
                </option>
                {categories.map((item) => (
                  <option
                    className="text-base border-0 outline-none capitalize  bg-gray-100 text-black "
                    value={item.name}

                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              {fields && (
                <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
                  Please input all fields.
                </p>
              )}
              <button
                type="button"
                onClick={savePin}
                className="transition ease-in-out delay-150 w-36 border border-blue-300 rounded-full bg-nGreen text-white hover:text-white hover:-translate-y-1 hover:scale-110 opacity-70 hover:opacity-100 "
              >
                Upload Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CreatePin;


