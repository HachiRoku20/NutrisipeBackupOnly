import React, { useState, useEffect } from "react";
import { allIngredientsQuery, searchIngredientQuery } from "../utils/data";
import { client } from "../client";
import { AiTwotoneDelete, AiOutlineClose } from 'react-icons/ai';

const ReadIngredient = ({ uploadSuccessAlert, setuploadSuccessAlert }) => {
  const [ingredientList, setIngredientList] = useState();
  const [searchIngredientTerm, setSearchIngredientTerm] = useState("");
  const [refresher, setRefresher] = useState(0)
  const [ModalOpen, setModalOpen] = useState(false);
  const ingredientFetchHandler = () => {
    client.fetch(allIngredientsQuery).then((data) => {
      setIngredientList(data);
    });
  };

  const ModalHandlerClose = () => {
    setModalOpen(false);
  };
  const ModalHandlerOpen = () => {
    setModalOpen(true);
  };

  //SEARCH BAR QUERY GETTER
  useEffect(() => {
    if (searchIngredientTerm !== "") {
      const query = searchIngredientQuery(searchIngredientTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setIngredientList(data);
        console.log(ingredientList);
      });
    } else {
      client.fetch(allIngredientsQuery).then((data) => {
        setIngredientList(data);

        console.log(ingredientList);
      });
    }
  }, [searchIngredientTerm, refresher, uploadSuccessAlert, setuploadSuccessAlert]);


  const deleteDatabaseIngredient = (key) => {

    client
      .delete({ query: `*[_type == "ingredientData" && _key == "${key}"]` })
      .then(() => {
        setRefresher(refresher + 1);

      });

  };


  return (
    //SEARCH BAR
    <div >
      {ModalOpen && (
        <div className=" fixed inset-0 bg-white bg-opacity-100 backdrop-blur-sm 
      items-center overflow-y-auto overflow-x-auto h-full w-full">
          <button
            className="ml-2 transition ease-in-out delay-150 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mt-2 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={ModalHandlerClose}

          >
            <AiOutlineClose />
          </button>

          <div className="flex font-bold text-3xl pb-4 justify-center items-center mx-2 "> SEARCH INGREDIENT TO DATABASE</div>

          <input
            type="text"
            onChange={(e) => setSearchIngredientTerm(e.target.value)}
            placeholder="Search an Ingredient"
            value={searchIngredientTerm}
            className="outline-none text-xl sm:text-3l w-full font-bold border-b-2 justify-center items-center border-gray-200 p-2"
          />

          {/* DISPLAY INGREDIENTS */}



          <div className=" inset-0 bg-white bg-opacity-100 backdrop-blur-sm items-center overflow-y-auto overflow-x-auto h-full w-auto ">
            <table className="w-full min-w-screen max-w-screen sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-nOrange ">
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4 "
                  >
                    Food Item
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Alt Name
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4 "
                  >
                    Edible Portion
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Energy
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Protein
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Fat
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Carbohydrate
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Calcium
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Phosporus
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    iron
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Vitamin A
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Thiamine
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Riboflavin
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Niacin
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >
                    Vitamin C
                  </th>
                  <th

                    className="text-sm font-semibold text-gray-900 px-6 py-4"
                  >

                  </th>
                </tr>


              </thead>


              <tbody >
                {ingredientList?.map((item) => (
                  <tr key={item?._key} className="bg-white border-b text-center ">

                    <td className="text-sm font-bold text-gray-900 px-6 py-4 ">
                      {item.foodItem}
                    </td>
                    <td className="ext-sm font-medium text-gray-900 px-6 py-4">
                      {item.altName}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4" >
                      {item.ediblePortion}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.energy}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.prot}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.fat}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.carb}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.calcium}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.phos}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.iron}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.vitA}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.thia}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.ribo}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.nia}
                    </td>
                    <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                      {item.vitC}
                    </td>
                    <td >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDatabaseIngredient(item?._key);
                        }}
                        className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                      >
                        <AiTwotoneDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>



            </table>
          </div>


        </div>
      )}
      {!ModalOpen && (
        <button
          className="mt-5 text-white w-24 h-7.5 float-left py-1 px-1  text-xs font-bold text-center text-white bg-nOrange opacity-70 hover:opacity-100 rounded-full border border-blue-300"
          onClick={ModalHandlerOpen}
        >
          Show Database
        </button>
      )}
    </div>


  );
};

export default ReadIngredient;
