import React, { useState } from "react";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReadIngredient from "./ReadIngredient";

const CreateIngredient = ({ user }) => {
 

  const [ingAdminName, setIngAdminName] = useState("");
  const [baseSizeMetric, setBaseSizeMetric] = useState("");
  const [calories, setCalories] = useState("");
  const [totalFat, setTotalFat] = useState("");
  const [saturatedFat, setSaturatedFat] = useState("");
  const [transFat, settransFat] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [sodium, setSodium] = useState("");
  const [totalCarbohydrates, setTotalCarbohydrates] = useState("");
  const [dietaryFiber, setDietaryFiber] = useState("");
  const [sugar, setSugar] = useState("");
  const [protein, setProtein] = useState("");
  const [vitaminA, setVitaminA] = useState("");
  const [vitaminC, setVitaminC] = useState("");
  const [calcium, setCalcium] = useState("");
  const [iron, setIron] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [uploadSuccessAlert, setuploadSuccessAlert] = useState(false);
  const [uploadFailedAlert, setuploadFailedAlert] = useState(false);

  const [baseSizeList, setBaseSizeList] = useState([]);

  const ModalHandlerOpen = () => {
    setModalOpen(true);
  };
  const ModalHandlerClose = () => {
    setModalOpen(false);
  };

  const deleteBaseSizeHandler = (i) => {
    let newDataArr = [...baseSizeList];
    newDataArr.splice(i, 1);
    setBaseSizeList(newDataArr);
  };

  // Adds Object To The BaseSizeArray AND resets states to make room for new object
  const handleAddBaseSize = () => {
    const baseSizeItem = {
      _key: uuidv4(),
      baseSizeNum: baseSizeMetric,
      calories: parseInt(calories),
      totalfat: parseInt(totalFat),
      saturatedfat: parseInt(saturatedFat),
      transfat: parseInt(transFat),
      cholesterol: parseInt(cholesterol),
      sodium: parseInt(sodium),
      totalcarb: parseInt(totalCarbohydrates),
      dietaryFiber: parseInt(dietaryFiber),
      sugar: parseInt(sugar),
      protein: parseInt(protein),
      vitaminA: parseInt(vitaminA),
      vitaminC: parseInt(vitaminC),
      calcium: parseInt(calcium),
      iron: parseInt(iron),
    };

    const newArray = [...baseSizeList, baseSizeItem];
    setBaseSizeList(newArray);
    setModalOpen(false);
    setBaseSizeMetric("");
    setCalories("");
    setTotalFat("");
    settransFat("");
    setSaturatedFat("");
    setCholesterol("");
    setSodium("");
    setTotalCarbohydrates("");
    setDietaryFiber("");
    setSugar("");
    setProtein("");
    setVitaminA("");
    setVitaminC("");
    setCalcium("");
    setIron("");

    console.log(baseSizeList);
  };

  //Handler for Uploading Ingredients to Database
  const uploadIngredient = () => {
    if (ingAdminName !== "" && baseSizeList.length !== 0) {
      const doc = {
        _type: "ingredientAdmin",
        _key: uuidv4(),
        ingAdminName,
        baseSize: baseSizeList,
      };
      client.create(doc).then(() => {
        setBaseSizeList([]);
        setIngAdminName("");
        console.log(doc);
      });
      setuploadSuccessAlert(true);

      setTimeout(() => {
        setuploadSuccessAlert(false);
      }, 8000);
    } else {
        setuploadFailedAlert(true);

      setTimeout(() => {
        setuploadFailedAlert(false);
      }, 8000);
    }
  };
  if (user?.isAdmin) {
    return (
      //UPLOAD INGREDIENT BUTTON

      <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
        <div className="font-bold text-3xl pb-4">
          {" "}
          ADD AN INGREDIENT TO DATABASE
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 ">
          <input
            type="text"
            value={ingAdminName}
            onChange={(e) => setIngAdminName(e.target.value)}
            placeholder="Ingredient Name"
            className="ooutline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2"
          />
        </div>

        {/* TABLE FOR BaseArrayList */}

        <div className="container">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="border-b">
              {/* <tbody> */}
              <tr className="bg-nGreen ">
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Base Size{" "}
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Calories
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Total Fat
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Saturated Fat{" "}
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Trans Fat
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Cholesterol
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Sodium
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Total Carb
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Dietary Fiber{" "}
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Sugar
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Protein
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Vitamin A
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Vitamin C
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Calcium
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Iron
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody class=" text-center">
              {baseSizeList.length < 1 ? (
                <tr>
                  <td colSpan={3}>No Base Size Data entered Yet</td>
                </tr>
              ) : (
                baseSizeList.map((info, i) => {
                  return (
                    <tr key={i} className="bg-white border-b text-center">
                      <td>{info.baseSizeNum}</td>
                      <td>{info.calories}</td>
                      <td>{info.totalfat}</td>
                      <td>{info.saturatedfat}</td>
                      <td>{info.transfat}</td>
                      <td>{info.cholesterol}</td>
                      <td>{info.sodium}</td>
                      <td>{info.totalcarb}</td>
                      <td>{info.dietaryFiber}</td>
                      <td>{info.sugar}</td>
                      <td>{info.protein}</td>
                      <td>{info.vitaminA}</td>
                      <td>{info.vitaminC}</td>
                      <td>{info.calcium}</td>
                      <td>{info.iron}</td>

                      <td className="text-red-300 pl-2 ">
                        <button onClick={() => deleteBaseSizeHandler(i)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {ModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col 
            justify-center items-center  "
          >
            <div className="fixed bg-gray-100 p-2 rounded-md h-96 w-96 overflow-scroll ">
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600 w-full">
                <h3 className="ml-2 text-xl font-semibold  items-center text-nGreen">
                  Add Ingredients
                </h3>

                <button
                  className="ml-2 mt-2 mx-1 px-1 text-xs font-bold text-center transition ease-in-out delay-150 w-4 h-4 border border-gray-400 rounded bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nRed duration-300"
                  onClick={ModalHandlerClose}
                >
                  X
                </button>
              </div>

              <div className="flex flex-1 flex-col pl-5 pr-5 mt-2 ">
                <input
                  type="text"
                  value={baseSizeMetric}
                  onChange={(e) => setBaseSizeMetric(e.target.value)}
                  placeholder="Base Size Metric"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                <input
                  type="number"
                  value={calories}
                  step="1"
                  min="0"
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="calories"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5   mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={totalFat}
                  onChange={(e) => setTotalFat(e.target.value)}
                  placeholder="totalFat"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={saturatedFat}
                  onChange={(e) => setSaturatedFat(e.target.value)}
                  placeholder="saturatedFat"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={transFat}
                  onChange={(e) => settransFat(e.target.value)}
                  placeholder="transFat"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full "
                />
              </div>
              <div className="flex flex-1 flex-col pl-5 pr-5  mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={cholesterol}
                  onChange={(e) => setCholesterol(e.target.value)}
                  placeholder="cholesterol"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5  mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={sodium}
                  onChange={(e) => setSodium(e.target.value)}
                  placeholder="sodium"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={totalCarbohydrates}
                  onChange={(e) => setTotalCarbohydrates(e.target.value)}
                  placeholder="total Carbohydrates"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={dietaryFiber}
                  onChange={(e) => setDietaryFiber(e.target.value)}
                  placeholder="dietaryFiber"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                  placeholder="sugar"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5  mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  placeholder="protein"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2  w-full"
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={vitaminA}
                  onChange={(e) => setVitaminA(e.target.value)}
                  placeholder="vitaminA"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={vitaminC}
                  onChange={(e) => setVitaminC(e.target.value)}
                  placeholder="vitaminC"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2  w-full"
                />
              </div>
              <div className="flex flex-1 flex-col pl-5 pr-5  mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={calcium}
                  onChange={(e) => setCalcium(e.target.value)}
                  placeholder="calcium"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                />
              </div>
              <div className="flex flex-1 flex-col  pl-5 pr-5 mt-2 ">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={iron}
                  onChange={(e) => setIron(e.target.value)}
                  placeholder="iron"
                  className="outline-none text-xl sm:text-3l font-bold border-b-2 border-gray-200 p-2 w-full"
                />
              </div>

              <div className="mt-3">
                <button
                  className="ml-5 transition ease-in-out delay-150 w-24 border border-blue-300 rounded-full bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nGreen duration-300"
                  onClick={handleAddBaseSize}
                >
                  CONFIRM
                </button>

                <button
                  className="ml-2 transition ease-in-out delay-150 w-24 border border-blue-300 rounded-full bg-gray-200  text-gray-400 hover:text-white hover:-translate-y-1 hover:scale-110 hover:bg-nRed duration-300"
                  onClick={ModalHandlerClose}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}

        {!ModalOpen && (
          <button
            className="mt-5 text-nGreen w-24 h-7.5 float-left py-1 px-1  text-xs font-bold text-center text-white bg-gray-50 rounded-full border border-blue-300"
            onClick={ModalHandlerOpen}
          >
            Add Base Size
          </button>
        )}

        {uploadSuccessAlert && (
          <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
            Ingredient Successfully addedd to the database.
          </p>
        )}

        {uploadFailedAlert && (
          <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
            Please input all required fields.
          </p>
        )}

        <div className="flex justify-end items-end mt-5">
          <button
            type="button"
            onClick={uploadIngredient}
            className="mb-3 transition ease-in-out delay-150 w-36 border rounded-full bg-nGreen text-white hover:text-white font-bold hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-nOrange"
          >
            Add To Database
          </button>
        </div>

        <ReadIngredient
          uploadSuccessAlert={uploadSuccessAlert}
          setuploadSuccessAlert={setuploadSuccessAlert}
        />
      </div>
    );
  } else {
    return (
      <p className="text-nGreen mr-5 text-xl transition-all duration-150 ease-in ">
        Unauthorized Access
      </p>
    );
  }
};

export default CreateIngredient;
