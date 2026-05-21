// Import React Router components and React Hooks
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

// Import components
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

// Import constants, API functions, and temperature context
import { apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, removeItem } from "../../utils/api";
import * as auth from "../../utils/auth";

// Import context consts
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// App() is the 2nd highest parent in the hierarchy
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
  const [coordinates, setCoordinates] = useState(null);

  // UseState hooks for user authorization
  // userData is for form inputs (login/signup forms); holds temporary data that user types in
  const [userData, setUserData] = useState({ email: "", password: "" });
  // currentUser stores actual user profile info that comes back from server after succesful login
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Token function constants
  const TOKEN_KEY = "jwt";
  // setToken add's token to local storage after successfuly login
  const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };
  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  // Registration handler
  const handleRegistration = ({ email, password, name, avatar }) => {
    auth
      .register({ email, password, name, avatar })
      .then((data) => {
        console.log(data); // For debugging
        setCurrentUser(data); // data is the entire user object
        closeActiveModal();
        setIsLoggedIn(true); // Log the user in
        navigate("/profile");
      })
      .catch(console.error);
  };

  // Login handler
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize({ email, password })
      .then((data) => {
        console.log(data);
        if (data.token) {
          setToken(data.token); // Save the token to local storage
          setCurrentUser(data.user);
          closeActiveModal();
          setIsLoggedIn(true); // Log the user in
          navigate("/profile");
        }
      })
      .catch(console.error);
  };

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

  // Function that opens up confirmation modal
  const handleDeleteClick = () => {
    setActiveModal("confirmation-modal");
  };
  // Function that opens registration modal
  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  // Function that opens log in modal
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  // Function that closes any active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Function that creates an object of input values and then
  // adds that data to page using addItem method
  const onAddItem = (inputValues, resetForm) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        resetForm();
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
      });
  };

  // Handler to delete item using its id from array using filter method
  const handleDeleteItem = (itemToDelete) => {
    removeItem(itemToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((i) => i._id !== itemToDelete._id),
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item", error);
      });
  };

  // UseEffect hook to check if there is a token in localStorage
  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then(({ user: { _id, email, name, avatar } }) => {
        console.log({ user: { _id, email, name, avatar } }); // For debugging
        // If response is successful, log the user in and save their data to state
        setIsLoggedIn(true);
        setCurrentUser({ _id, email, name, avatar });
      })
      .catch((error) => {
        console.error("Failed to log in", error);
        removeToken();
      });
  }, []);

  // useEffect hook for getting user location
  useEffect(() => {
    if (!coordinates) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default coordinates
          setCoordinates({ latitude: 40.670448, longitude: -73.393837 });
        },
      );
    }
  }, [coordinates]);

  // useEffect hook for getting weather data with coordinates
  useEffect(() => {
    if (coordinates) {
      getWeather(coordinates, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch((error) => {
          console.error("Failed to get weather data:", error);
        });
    }
  }, [coordinates]);

  // useEffect hook for getting clothing items
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch((error) => {
        console.error("Failed to get items from server:", error);
      });
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

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />
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
                  <ProtectedRoute
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                  >
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
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
            onDelete={handleDeleteItem}
            onConfirmation={handleDeleteClick}
          />
          <ConfirmationModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            onDelete={handleDeleteItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            buttonText="Sign Up"
            onRegister={handleRegistration}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            buttonText="Log In"
            onLogin={handleLogin}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
