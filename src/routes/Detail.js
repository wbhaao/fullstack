import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
function Detail() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setData(json.data.movie)
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <Movie
      id={data.id}
      coverImg={data.medium_cover_image}
      title={data.title}
      summary={data.summary}
      genres={data.genres}
    />
  )
}
export default Detail;