import { useEffect, useState } from "react";
import {
  ClockIcon,
  HomeIcon,
  ViewListIcon,
  XIcon,
} from "@heroicons/react/outline";

import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Layout from "../../app/layout/Layout";
import ActivityDashboard from "../../app/components/activities/ActivityDashboard";
import { useRouter } from "next/router";
import { Activity } from "../../app/components/activities/Activity";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "My Tasks", href: "#", icon: ViewListIcon, current: false },
  { name: "Recent", href: "#", icon: ClockIcon, current: false },
];
const teams = [
  { name: "Engineering", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
  { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Activity({ props }) {
  const { activityStore } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleClickAway() {
    activityStore.closeForm();
  }
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [activity, setActivity] = useState<Activity>(null);

  return (
    <Layout>
      <ActivityDashboard
        setSidebarOpen={setSidebarOpen}
        handleClickAway={handleClickAway}
      />
    </Layout>
  );
}

export default observer(Activity);
