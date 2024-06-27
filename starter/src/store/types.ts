export interface CommentInterface {
  id: number;
  userId: number;
  userName: string;
  icon?: string;
  comment: string;
  time: number;
}

export interface MovieInterface {
  id: number;
  title: string;
  description: string;
  genres: string[];
  director: string;
  cast: string[];
  image: string;
  link: string;
  popularity: boolean;
  isNewRelease: boolean;
  keywords: string[];
  comments: CommentInterface[];
  onToggleFavorite?: () => void;
}

export interface ArtistInterface {
  id: number;
  name: string;
  img: string;
  about?: string;
  movies?: number[];
  awards?: string[];
}

export interface ApiStoreInterface {
  movies: MovieInterface[] | null;
  loading: boolean;
  error: Error | null;
  fetchMovies: () => void;
}
