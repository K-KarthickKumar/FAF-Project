import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import "./UserProfile.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { addCartCourses } from '../../features/courses/courseSlice';
function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const handleTitleChange = (e) => {
        setTitle(e.target.value); // Update title state on radio button change
    };
    const [id, setid] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [designation, setDesignation] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const baseUrl = useSelector(state => state.login.baseUrl);
    useEffect(() => {
        fetchProfileData();
        loadCountries();
    }, []);
    useEffect (()=>{
        fetchCartData();
       
      },[]);
   
      function fetchCartData() {
        // return async () => {
            axios.get(`${baseUrl}gkt/faf/cart/${localStorage.getItem("userEmail")}`)
            .then(res =>{
              dispatch(addCartCourses(res.data.courses));
              console.log("cart data message", res.data);
            })
            .catch(err =>{
              console.log(err);
            })
         
      }
   
    const fetchProfileData = async () => {
        try {
            const response = await fetch(`${baseUrl}gkt/faf/userProfile/get/${localStorage.getItem("userEmail")}`); // Replace with your API endpoint
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            // Set the fetched data to state variables as needed
            setTitle(data.title);
            setid(data.id);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setContact(data.mobileNo);
            setAddress(data.address);
            setDesignation(data.company);
            const countryOptions = Country.getAllCountries().map((country) => ({
                value: country.isoCode,
                label: country.name,
            }));
            setCountries(countryOptions);
            const selectedCountryOption = countryOptions.find(
                (country) => country.label === data.country
            );
            setSelectedCountry(selectedCountryOption);
            // Load states for the selected country
            if (selectedCountryOption) {
                const stateOptions = State.getStatesOfCountry(selectedCountryOption.value).map(
                    (state) => ({
                        value: state.isoCode,
                        label: state.name,
                    })
                );
                setStates(stateOptions);
                const selectedStateOption = stateOptions.find(
                    (state) => state.label === data.state
                );
                setSelectedState(selectedStateOption);
                // Load cities for the selected state
                if (selectedStateOption) {
                    const cityOptions = City.getCitiesOfState(
                        selectedCountryOption.value,
                        selectedStateOption.value
                    ).map((city) => ({
                        value: city.name,
                        label: city.name,
                    }));
                    setCities(cityOptions);
 
                    const selectedCityOption = cityOptions.find(
                        (city) => city.label === data.city
                    );
                    setSelectedCity(selectedCityOption);
                }
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = id
            ? `${baseUrl}gkt/faf/userProfile/updateById` // Update profile
            : `${baseUrl}gkt/faf/userProfile/storeUserProfile`; // Submit profile
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id || undefined, // Include id only for update
                    title: title,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobileNo: contact,
                    address: address,
                    company: designation,
                    country: selectedCountry?.label,
                    state: selectedState?.label,
                    city: selectedCity?.label,
                }),
            });
            // Check if the response status is 201 Created
            if (response.status === 200) {
                const result = await response.json();
                toast(
                    id ? `Profile for ${firstName}${lastName} Updated Successfully` : `Profile for ${firstName} ${lastName} Created Successfully`,
                    { autoClose: 3000, type: "success", closeButton: true, theme: "colored" }
                );
 
                usrprofile(); // Reset form fields
                navigate("/courseList");
                console.log('Profile submission successful:', result);
            } else {
                // Handle other response statuses
                toast(
                    "Failed to create your profile.",
                    { autoClose: 3000, type: "error", closeButton: true, theme: "colored" }
                );
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            toast(
                "Error while creating , please try again later.",
                { autoClose: 3000, type: "error", closeButton: true, theme: "colored" }
            );
        }
    };
    function usrprofile() {
        setTitle('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setContact('');
        setAddress('');
        setDesignation('');
        setSelectedCountry(null);
        setSelectedState(null);
        setSelectedCity(null);
    }
    const loadCountries = () => {
        const countryOptions = Country.getAllCountries().map((country) => ({
            value: country.isoCode,
            label: country.name,
        }));
        setCountries(countryOptions);
    };
    // Fetch states based on selected country
    useEffect(() => {
        if (selectedCountry) {
            const stateOptions = State.getStatesOfCountry(selectedCountry.value).map(
                (state) => ({
                    value: state.isoCode,
                    label: state.name,
                })
            );
            setStates(stateOptions);
            if (selectedState && !stateOptions.find((state) => state.value === selectedState.value)) {
                setSelectedState(null); // Reset state if not found in options
            }
 
            setCities([]);
        }
    }, [selectedCountry]);
    // Fetch cities based on selected state
    useEffect(() => {
        if (selectedState) {
            const cityOptions = City.getCitiesOfState(
                selectedCountry.value,
                selectedState.value
            ).map((city) => ({
                value: city.name,
                label: city.name,
            }));
            setCities(cityOptions);
            if (selectedCity && !cityOptions.find((city) => city.value === selectedCity.value)) {
                setSelectedCity(null); // Reset city if not found in options
            }
        }
    }, [selectedState, selectedCountry]);
    return (
        <div className='container-fluid' style={{ height: "100vh", backgroundColor: "#010134", overflow: "auto", padding: "0px" }}>
            <Header />
            <div className="container user">
                <form className="user-form" onSubmit={handleSubmit} id="profile">
                    <h2 style={{ fontFamily: "sans-serif", textAlign: "center" }}>Add Profile</h2>
                    <div className="title-options mt-2">
                        <label style={{ fontFamily: "serif" }}>
                            <input
                                type="radio"
                                name="title"
                                value="Mr"
                                checked={title === 'Mr'}
                                onChange={handleTitleChange}
                            />
                            Mr
                        </label>
                        <label style={{ fontFamily: "serif" }}>
                            <input
                                type="radio"
                                name="title"
                                value="Ms"
                                checked={title === 'Ms'}
                                onChange={handleTitleChange}
                            />
                            Ms
                        </label>
                        <label style={{ fontFamily: "serif" }}>
                            <input
                                type="radio"
                                name="title"
                                value="Mrs"
                                checked={title === 'Mrs'}
                                onChange={handleTitleChange}
                            />
                            Mrs
                        </label>
                        <label style={{ fontFamily: "serif" }}>
                            <input
                                type="radio"
                                name="title"
                                value="Dr"
                                checked={title === 'Dr'}
                                onChange={handleTitleChange}
                            />
                            Dr
                        </label>
                        <label style={{ fontFamily: "serif" }}>
                            <input
                                type="radio"
                                name="title"
                                value="Prof"
                                checked={title === 'Prof'}
                                onChange={handleTitleChange}
                            />
                            Prof
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" style={{ fontFamily: "sans-serif" }}>First Name <span style={{ color: "red" }}>*</span></label>
                        <input style={{ fontFamily: "serif" }} className='form-control' type="text" id="name" placeholder="Enter your name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" style={{ fontFamily: "sans-serif" }}>Last Name <span style={{ color: "red" }}>*</span></label>
                        <input style={{ fontFamily: "serif" }} className='form-control' type="text" id="name" placeholder="Enter your name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" style={{ fontFamily: "sans-serif" }}>Email <span style={{ color: "red" }}>*</span></label>
                        <input style={{ fontFamily: "serif" }} className='form-control' type="email" id="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact" style={{ fontFamily: "sans-serif" }}>Contact <span style={{ color: "red" }}>*</span></label>
                        <input
                            style={{ fontFamily: "serif" }}
                            type="tel" // Change type to 'tel'
                            id="mobile"
                            placeholder="Enter your contact number"
                            required
                            className='form-control'
                            value={contact}
                            onChange={(e) => {
                                // Allow only numbers (0-9)
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) { // Regex to test if value is all digits
                                    setContact(value);
                                }
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" style={{ fontFamily: "sans-serif" }}>Address</label>
                        <input style={{ fontFamily: "serif" }} className='form-control' type="text" id="address" placeholder="Enter your Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ fontFamily: "sans-serif" }}>
                        <label htmlFor="designation">Designation</label>
                        <input style={{ fontFamily: "serif" }} className='form-control' type="text" id="designation" placeholder="Enter your designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="designation" style={{ fontFamily: "sans-serif" }}>Country</label>
                        <Select
                            style={{ fontFamily: "serif" }}
                            options={countries}
                            value={selectedCountry}
                            onChange={(country) => setSelectedCountry(country)}
                            placeholder="Select Country"
                            isSearchable
                            
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="designation" style={{ fontFamily: "sans-serif" }}>State</label>
                        <Select
                            style={{ fontFamily: "serif" }}
                            options={states}
                            value={selectedState}
                            onChange={(state) => setSelectedState(state)}
                            placeholder="Select State"
                            isSearchable
                            
                            isDisabled={!selectedCountry} // Disable until a country is selected
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="designation" style={{ fontFamily: "sans-serif" }}>City</label>
                        <Select
                            style={{ fontFamily: "serif" }}
                            options={cities}
                            value={selectedCity}
                            onChange={(city) => setSelectedCity(city)}
                            placeholder="Select City"
                            isSearchable
                            
                            isDisabled={!selectedState} // Disable until a state is selected
                        />
                    </div>
                    <button type="submit" style={{ backgroundColor: "#010134", color: "white", fontFamily: "sans-serif",width:"100%" }}>{id ? "Update" : "Submit"}</button>
                </form>
            </div>
        </div>
    )
}
export default UserProfile;