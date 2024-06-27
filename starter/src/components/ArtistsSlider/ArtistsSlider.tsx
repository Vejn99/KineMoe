import { ArtistInterface } from "../../store/types";
import "./artists-slider.css";

export const ArtistsSlider = (artistProps: ArtistInterface) => {
  const cardContent = (
    <div key={artistProps.id} className="artist-card">
      <h3>{artistProps.name}</h3>
      <img src={artistProps.img} alt={artistProps.name} />
    </div>
  );
  return <>{cardContent}</>;
};
