import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { eventLoader, EventsPage } from "./pages/Events";
import { EventDetailPage } from "./pages/EventDetail";
import { NewEventPage } from "./pages/NewEvent";
import { EditEventPage } from "./pages/EditEvent";
import { RootLayout } from "./pages/Root";
import { EventsRootLayout } from "./pages/EventsRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/events",
        element: <EventsRootLayout />,
        children: [
          {
            path: "",
            element: <EventsPage />,
            loader: eventLoader,
          },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
