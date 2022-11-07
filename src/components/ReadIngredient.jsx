import React, { useState, useEffect } from "react";
import { allIngredientsQuery, searchIngredientQuery } from "../utils/data";
import { client } from "../client";
import { AiTwotoneDelete } from 'react-icons/ai';

const ReadIngredient = ({uploadSuccessAlert, setuploadSuccessAlert}) => {
  const [ingredientList, setIngredientList] = useState();
  const [searchIngredientTerm, setSearchIngredientTerm] = useState("");
  const [refresher, setRefresher] = useState(0)
  const ingredientFetchHandler = () => {
    client.fetch(allIngredientsQuery).then((data) => {
      setIngredientList(data);
    });
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
      .delete({query: `*[_type == "ingredientAdmin" && _key == "${key}"]`})
      .then(() => {
        setRefresher(refresher + 1);

      });

  };


  return (
    //SEARCH BAR
    <div className="border-t-8 border-black pt-1 text-sm w-full">
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">

<div className='font-bold text-3xl pb-4'> SEARCH INGREDIENT TO DATABASE</div>
      <div className="border-t-3 border-black pt-1 text-sm "></div>
      <input
        type="text"
        onChange={(e) => setSearchIngredientTerm(e.target.value)}
        placeholder="Search an Ingredient"
        value={searchIngredientTerm}
        className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
      />

      {/* DISPLAY INGREDIENTS */}
     

              {ingredientList?.map((item) => (
                <div key={item?.key} className="container">
                  <table className='w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5'></table>
                  <thead lassName="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-nOrange  ">
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4 w-24"
                      >
                        {item?.ingAdminName}
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Base Size{" "}
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Calories
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        TotalFat
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Saturated Fat
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Trans Fat
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Cholesterol
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Sodium
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Total Carb
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Dietary Fiber
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Sugar
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Protein
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Vitamin A
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Vitamin C
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Calcium
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4"
                      >
                        Iron
                      </th>
                      <th

                        className="text-sm font-semibold text-gray-900 px-6 py-4 w-full "
                      >
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
                      </th>
                    </tr>
                  </thead>

                  {item?.baseSize?.map((c) => (
                   
                      <tbody key={c?._key} className="bg-white border-b text-center">
                        <tr>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4 w-32"></td>
                        <td className="text-sm font-medium text-gray-900 px-6 py-4">
                          {c.baseSizeNum}
                        </td>
                        <td className="ext-sm font-medium text-gray-900 px-6 py-4">
                          {c.calories}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.totalfat}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.saturatedfat}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.transfat}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.cholesterol}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.sodium}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.totalcarb}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.dietaryFiber}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.sugar}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.protein}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.vitaminA}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.vitaminC}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.calcium}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 px-6 py-4">
                          {c.iron}
                        </td>
                      </tr>
                    </tbody>
                  ))}



                </div>
              ))}

            </div>
          </div>
      
    
  );
};

export default ReadIngredient;
