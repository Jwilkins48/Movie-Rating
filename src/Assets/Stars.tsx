function HalfStar() {
  return (
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
      />
    </div>
  );
}

function OneStar() {
  return (
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
      />
      <input
        id="1"
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-2"
      />
    </div>
  );
}

function OneHalfStar() {
  return (
    <div className="rating rating-lg rating-half">
      <input
        id=".5"
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-1"
      />
      <input
        id="1"
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-2"
      />
      <input
        id="1.5"
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-1"
      />
    </div>
  );
}

// 👇️ named exports
export { HalfStar, OneStar, OneHalfStar };
