// Importing components, constants and destructured items
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

import { getItems } from "../../utils/api";
import { addItem } from "../../utils/api";
import { removeItem } from "../../utils/api";

import Profile from "../../components/Profile/Profile";

function App() {
  // UseState hooks for setting data
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    city: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Function that handles toggle switch change using a ternary operator
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Function that  adds 'preview'
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Function that adds 'add-garment' when called
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  // Function that closes any active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Function that creates an object of input values and then
  // adds that data to page using addItem method
  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };
    // Need to use data below because the returned 'data' contains id
    addItem(newCardData).then((data) => {
      console.log("About to update state with:", data);
      console.log("Current clothingItems:", clothingItems);
      // console.log("addItem returns:", data);
      // console.log("Is it an array?", Array.isArray(data));
      setClothingItems([data, ...clothingItems]);
      closeActiveModal();
    });
  };

  // useEffect hook for getting data with coordinates/apiKey and filtering it
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
        // console.log("getItems returns:", data);
        // console.log("Is it an array?", Array.isArray(data));
      })
      .catch(console.error);
  }, []);

  // useEffect hook for Escape key and overlay click modal-closing features
  useEffect(() => {
    // If no modal is active, don't attach listeners
    if (!activeModal) return;

    // Defining handlers
    const handleEscapeKey = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };
    const handleOverlayClick = (evt) => {
      if (evt.target.classList.contains("modal__is-opened")) {
        closeActiveModal();
      }
    };
    // Attaching listeners
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOverlayClick);
    };

    // Dependency array ensures this runs only when modal state changes
  }, [activeModal]);

  // The HTML returned with COMPONENTS and PROPS
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          buttonText="Add garment"
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
