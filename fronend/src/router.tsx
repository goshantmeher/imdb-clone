import Home from "./routes/home";
import NotFoundPage from "./components/notFound";
import CelebrityDashboard from "./routes/celebrity/celebrityDashboard";
import Celebrity from "./routes/celebrity/celebrity";
import { CELEBRITY_TYPES } from "./utils/constants/celebrity";
import MovieDashboard from "./routes/movie/movieDashboard";
import Movie from "./routes/movie/movie";
import EditMovie from "./routes/movie/editMovie";
import AddMovie from "./routes/movie/addMovie";
import AddCelebrity from "./routes/celebrity/addCelebrity";
import EditCelebrity from "./routes/celebrity/editCelebrity";

export const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie",
    element: <MovieDashboard />,
  },
  {
    path: "/movie/:id",
    element: <Movie />,
  },
  {
    path: "/movie/edit/:id",
    element: <EditMovie />,
  },
  {
    path: "/movie/add/",
    element: <AddMovie />,
  },
  {
    path: "/actor",
    element: <CelebrityDashboard type={CELEBRITY_TYPES[0]} />,
  },
  {
    path: "/actor/:id",
    element: <Celebrity type={CELEBRITY_TYPES[0]} />,
  },
  {
    path: "/celebrity/add",
    element: <AddCelebrity />,
  },
  {
    path: "/celebrity/edit/:id",
    element: <EditCelebrity />,
  },
  {
    path: "/producer",
    element: <CelebrityDashboard type={CELEBRITY_TYPES[1]} />,
  },
  {
    path: "/producer/:id",
    element: <Celebrity type={CELEBRITY_TYPES[1]} />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
