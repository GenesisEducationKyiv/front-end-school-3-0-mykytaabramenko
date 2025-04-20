import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import Tracks from "./pages/Tracks.jsx";
import UpdateModal from "./components/TrackList/Modals/UpdateModal.jsx";
import CreateModal from "./components/TrackList/Modals/CreateModal.jsx";
import NotFound from "./pages/NotFound.jsx";
import UploadTrackModal from "./components/TrackList/Modals/UploadTrackModal.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to={"tracks"} />} />
        <Route path={"tracks"} element={<Tracks />} />
        <Route
          path="tracks/:slug/edit"
          element={
            <>
              <Tracks />
              <UpdateModal />
            </>
          }
        />
        <Route
          path="tracks/:slug/upload"
          element={
            <>
              <Tracks />
              <UploadTrackModal />
            </>
          }
        />
        <Route
          path="tracks/create"
          element={
            <>
              <Tracks />
              <CreateModal />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
