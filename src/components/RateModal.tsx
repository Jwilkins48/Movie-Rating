import { useEffect, useState } from "react";
import {
  serverTimestamp,
  addDoc,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

type RateModalProps = {
  rateModal: boolean;
  name: string;
  genre: string;
  setRateModal: (ratedModal: boolean) => void;
};

export function RateModal({
  rateModal,
  name,
  genre,
  setRateModal,
}: RateModalProps) {
  const [formData, setFormData] = useState({
    rating: "",
    date: "",
  });

  const onCloseClick = () => {
    setRateModal(false);
  };

  const onRateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const rating = e.currentTarget.id;
    setFormData((prevState) => ({
      ...prevState,
      rating: rating,
    }));
  };

  const onDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const date = e.currentTarget.value;
    setFormData((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.rating !== "") {
      //Add timestamp
      const formDataCopy = {
        ...formData,
        genre: genre,
        movieName: name,
        timestamp: serverTimestamp(),
      };

      // Add form data to collection
      await addDoc(collection(db, "ratedMovies"), formDataCopy);
      console.log("rated!");
      setRateModal(false);

      //Reset Form
      const resetForm = e.target as HTMLFormElement;
      resetForm.reset();
      //   navigate("/");
    } else {
      alert("Enter Rating");
    }
  };

  return (
    <>
      <input
        readOnly
        checked={rateModal}
        type="checkbox"
        id="rate-modal"
        className="modal-toggle"
      />
      <form onSubmit={onSubmit} className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="rate-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={onCloseClick}
          >
            ✕
          </label>
          <h1 className="font-bold text-[23px] text-accent mt-4 title">
            How Did You Like <span className="">{name}?</span>
          </h1>

          <div className="mt-5 flex items-center">
            <label className="text-[1.3rem] font-bold" htmlFor="rate">
              Rating:
            </label>
            <div className="rating rating-lg rating-half">
              <input
                id="rate"
                type="radio"
                name="rating-10"
                className="rating-hidden"
              />
              <input
                id=".5"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
                onClick={onRateChange}
              />
              <input
                id="1"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
                onClick={onRateChange}
              />
              <input
                id="1.5"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
                onClick={onRateChange}
              />
              <input
                id="2"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
                onClick={onRateChange}
              />
              <input
                id="2.5"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
                onClick={onRateChange}
              />
              <input
                id="3"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
                onClick={onRateChange}
              />
              <input
                id="3.5"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
                onClick={onRateChange}
              />
              <input
                id="4"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
                onClick={onRateChange}
              />
              <input
                id="4.5"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-1"
                onClick={onRateChange}
              />
              <input
                id="5"
                type="radio"
                name="rating-10"
                className="bg-green-500 mask mask-star-2 mask-half-2"
                onClick={onRateChange}
              />
            </div>
          </div>
          <div className="mt-5 flex items-center">
            <label className="text-[1.2rem] font-bold" htmlFor="date">
              Watched:
            </label>
            <input
              onChange={onDateChange}
              className="input input-bordered input-primary-focus ml-3"
              type="date"
              id="date"
            />
          </div>

          <div className="mt-5">
            <button type="submit" className="btn w-full">
              Add Rating
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
