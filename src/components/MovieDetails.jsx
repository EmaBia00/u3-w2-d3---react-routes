import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Alert, Card, Container } from "react-bootstrap";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=1656bbcf&i=${movieId}`);
        const movieData = await movieResponse.json();
        if (movieData.Response === "True") {
          setMovieDetails(movieData);
        } else {
          setError("Film not found.");
          setLoading(false);
          return;
        }
        const commentResponse = await fetch(`https://striveschool-api.herokuapp.com/api/comments?elementId=${movieId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDEzMjhhZDEyOTAwMTU4NzZiYjgiLCJpYXQiOjE3MzI3OTgzMDIsImV4cCI6MTczNDAwNzkwMn0.7zkVPSItjo-2cKzYHlkKohHWDjiSFL_5q7A_s_O0COc`
          }
        });
        const commentData = await commentResponse.json();
        setComments(commentData);
      } catch (err) {
        setError("Failed to fetch data.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container fluid className="mt-4">
      <Card className="border-0 shadow-lg mb-4 bg-black text-light">
        <Card.Img variant="top" src={movieDetails.Poster} alt={movieDetails.Title} className="d-block w-25 m-3" />
        <Card.Body>
          <Card.Title className="fs-3 fw-bold">
            {movieDetails.Title} ({movieDetails.Year})
          </Card.Title>
          <Card.Text className="fs-5">{movieDetails.Plot}</Card.Text>
          <Card.Text>
            <strong>Director:</strong> {movieDetails.Director}
          </Card.Text>
          <Card.Text>
            <strong>Genre:</strong> {movieDetails.Genre}
          </Card.Text>
          <Card.Text>
            <strong>IMDb Rating:</strong> {movieDetails.imdbRating}
          </Card.Text>
        </Card.Body>
      </Card>

      <h3 className="text-light">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-light">No comments yet.</p>
      ) : (
        comments.slice(0, 10).map((comment) => (
          <div key={comment._id} className="mb-3 p-3 rounded-3 bg-secondary">
            <p>
              <strong>Rating:</strong> {comment.rate}
            </p>
            <p>
              <strong>Comment:</strong> {comment.comment}
            </p>
          </div>
        ))
      )}
    </Container>
  );
};

export default MovieDetails;
