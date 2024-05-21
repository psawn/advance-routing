import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export function ErrorPage() {
  const error = useRouteError() as {
    status: number;
    data: { message: string };
  };

  let title = "Error";
  let message = "Something went wrong";

  if (error.status === 500) {
    message = error?.data?.message;
  }

  if (error.status === 404) {
    title = "Not Found";
    message = "The page you are looking for does not exist";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
