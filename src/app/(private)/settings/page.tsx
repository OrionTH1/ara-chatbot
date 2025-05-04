export const dynamic = "force-dynamic";

import ProfileSettingsForm from "@/features/settings/form/UserSettingsForm";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

async function Settings() {
  const { response: currentUser } = await getCurrentUser();
  if (!currentUser) return redirect("/sign-in");

  return (
    <div className="p-10">
      <h1 className="mb-7 heading-1">Settings</h1>

      <section>
        <h2 className="mb-4 heading-2">Profile</h2>

        <ProfileSettingsForm user={currentUser} />
      </section>
    </div>
  );
}

export default Settings;
