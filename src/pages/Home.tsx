import { Tabs } from "../components/Tabs";
import React, { useState } from "react";
import { db } from "../../firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [formData, setFormData] = useState({ movieName: "", genre: "" });
  const navigate = useNavigate();

  //Modal Selected Movie Genre
  const onSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setFormData((prevState) => ({
      ...prevState,
      genre: value,
    }));
  };

  //Modal Movie Name Input
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setFormData((prevState) => ({
      ...prevState,
      movieName: value,
    }));
  };

  //Submit Modal
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    //Add timestamp
    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };
    // Add form data to collection
    await addDoc(collection(db, "wantToWatch"), formDataCopy);
    console.log("Saved!");
    navigate("/");
  };

  return (
    <div>
      <Tabs />

      <div className="overflow-x-auto mx-2 my-6">
        <label htmlFor="my-modal-3" className="btn mb-2">
          + Add
        </label>

        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Movie Name</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {/* MAP MOVIES IN DB  */}
            {/* <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">Marjy Ferencz</div>
                    <div className="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>
                Rowe-Schoen
                <br />
                <span className="badge badge-ghost badge-sm">
                  Office Assistant I
                </span>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      {/* ADD MOVIE MODAL */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <form onSubmit={onSubmit} className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl text-accent mt-2 font-bold ml-1 title">
            Want To Watch
          </h3>
          <div>
            <input
              onChange={onChange}
              placeholder="Movie Name"
              className="input input-bordered input-primary-focus w-full mt-4"
              type="text"
              id="movieName"
            />
          </div>
          <div>
            <select
              className="select input-bordered input-primary-focus w-full my-4"
              placeholder="Genre"
              id="genre"
              defaultValue="Genre"
              onClick={onSelectChange}
            >
              <option disabled>Genre</option>
              <option>Romance</option>
              <option>Drama</option>
              <option>Action</option>
              <option>Western</option>
              <option>Thriller</option>
              <option>Horror</option>
              <option>Fantasy</option>
              <option>SyFy</option>
              <option>Other</option>
            </select>
          </div>

          <button type="submit" className="btn">
            <i className="mr-2 fa-solid fa-plus"></i> Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}
