import Profile from "../components/profile/Profile";
import { usePageTitle } from "../hook/usePageTitle";

function ProfilePage() {
  usePageTitle("Profile");

  return <Profile />;
}

export default ProfilePage;