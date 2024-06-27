import { useUserStore } from "../store/user-store";
import { AuthorizedRoutes } from "./authorized-routes/AuthorizedRoutes";
import { NonAuthorizedRoutes } from "./non-authorized-routes/NonAuthorizedRoutes";

export const MainRouter = () => {
  const user = useUserStore((state: any) => state.user);

  if (user) {
    return <AuthorizedRoutes />;
  } else {
    return <NonAuthorizedRoutes />;
  }
};
