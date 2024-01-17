import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const GOOGLEMAPSKEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
const CLOUDINARY = import.meta.env.VITE_CLOUDINARY_ADDRESS;
const BASEURL = import.meta.env.VITE_BASEURL;

function AddPlaceButton({ onPlaceAdded }) {
  const [showForm, setShowForm] = useState(false);
  console.log("hey");

  const schema = yup.object().shape({
    name: yup.string().required(),
    location: yup.string().required(),
    mood: yup.string().required(),
    review: yup.string().required(),
    image: yup.mixed().required("An image file is required"),
  });

  const handleToggle = () => {
    setShowForm(!showForm);
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    setFieldValue("image", file);
    console.log("hey");
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLEMAPSKEY, // COME BACK TO THIS
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);

  // get lat and lng from the place selected with autocomplete - currently overwrites the location field with co-ords
  const handlePlaceSelect = (setFieldValue) => () => {
    console.log(autocomplete);
    console.log("hello");

    const place = autocomplete.getPlace();
    if (place && place.geometry) {
      const { lat, lng } = place.geometry.location;
      setFieldValue("location", `${lat()}, ${lng()}`);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  const handleSubmitForm = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("file", values.image);
    formData.append("upload_preset", "default");
    // send the image to Cloudinary
    axios
      .post(
        CLOUDINARY, // SECURE THIS
        formData
      )
      // then send response url to the backend
      .then((response) => {
        const imageUrl = response.data.secure_url;
        const dataToSend = { ...values, image: imageUrl };
        return axios.post(BASEURL, dataToSend); // SECURE THIS
      })
      .then((response) => {
        setSubmitting(false);
        resetForm();
        setShowForm(false);
        onPlaceAdded();
        console.log("Work??");
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
      });
  };

  const formStyle = {
    display: showForm ? "block" : "none",
  };

  return (
    <>
      <div className="addPlaceForm" style={formStyle}>
        <h1>Add A Place</h1>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmitForm}
          initialValues={{
            name: "",
            location: "",
            mood: "",
            review: "",
          }}
        >
          {({
            handleSubmit,
            setFieldValue,
            handleChange,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Location</Form.Label>
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      setAutocomplete(autocomplete);
                    }}
                    onPlaceChanged={handlePlaceSelect(setFieldValue)}
                  >
                    <Form.Control
                      type="text"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      isInvalid={touched.location && !!errors.location}
                    />
                  </Autocomplete>
                  <Form.Control.Feedback type="invalid">
                    {errors.location}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Mood</Form.Label>
                  <Form.Select
                    name="mood"
                    value={values.mood}
                    onChange={handleChange}
                    isInvalid={touched.mood && !!errors.mood}
                  >
                    <option value="">choose a mood</option>
                    <option value="healthy">Healthy</option>
                    <option value="cosy">Cosy</option>
                    <option value="saucy">Saucy</option>
                    <option value="naughty">Naughty</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.mood}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="review"
                    value={values.review}
                    onChange={handleChange}
                    isInvalid={touched.review && !!errors.review}
                    className="custom-textarea"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.review}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="addPlaceBtn">
        <Button
          className="circular-button"
          variant={showForm ? "danger" : "success"}
          onClick={handleToggle}
        >
          {showForm ? "X" : "＋"}
        </Button>
      </div>
    </>
  );
}

export default AddPlaceButton;
