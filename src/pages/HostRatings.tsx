import React, { useEffect, useState } from "react";
import { Rating } from "../model/Rating";
import { useLoggedUser } from "../hooks/UseLoggedUserInformation";

const HostRatings: React.FC = () => {
  const hostId = useLoggedUser()?.id;
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchHostRatings = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rating/getHostRatings/${hostId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch host ratings");
        }
        const data = await response.json();
        setRatings(data.ratings);
        calculateAverageRating(data.ratings);
      } catch (error) {
        console.log(`Error fetching host ratings: ${error}`);
      }
    };

    fetchHostRatings();
  }, []);

  const calculateAverageRating = (ratings: Rating[]) => {
    if (ratings.length === 0) {
      setAverageRating(null);
      return;
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const average = totalRating / ratings.length;
    setAverageRating(average);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="card-title">Host Ratings</h2>
              {averageRating !== null && (
                <div className="average-rating">
                  <span className="average-rating-text">Average Rating:</span>
                  <span className="average-rating-value">{averageRating.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className="card-body">
              {ratings.length > 0 ? (
                <ul className="list-group">
                  {ratings.map((rating) => (
                    <li key={rating.id} className="list-group-item">
                      <div className="row">
                        <div className="col-4">
                          <div className="rating-label">Rate Date</div>
                          <div className="rating-date">{rating.date}</div>
                        </div>
                        <div className="col-4">
                          <div className="rating-label">Rate</div>
                          <div className="rating-number">{rating.rating}</div>
                        </div>
                        <div className="col-4">
                          <div className="rating-label">Rater</div>
                          <div className="rating-rater">{rating.raterName} {rating.raterSurname}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No ratings yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostRatings;
