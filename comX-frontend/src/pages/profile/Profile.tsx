import ImprovedCodeHeatmap from "./Components/Heatmap";
import PersonalInfo from "./Components/PersonalInfo";
import TaskForProfile from "./Components/TasksForProfile";
import FollowerList from "./Components/Follower";
import PieChartTask from "./Components/PieChart";
import ComingSoon from "./Components/CommingSoon";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 w-full overflow-x-hidden">
        <div className="w-full lg:w-[320px] shrink-0">
          <PersonalInfo />
        </div>
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="border border-gray-200 bg-card rounded-lg shadow-md overflow-hidden">
              <TaskForProfile />
            </div>
            <div className="border border-gray-200 bg-card rounded-lg shadow-md overflow-hidden">
              <PieChartTask />
            </div>
          </div>
          <div className="w-full shadow-md rounded-xl border border-gray-200 bg-card overflow-hidden">
            <ImprovedCodeHeatmap />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="border border-gray-200 bg-card rounded-lg shadow-md overflow-hidden h-[440px]">
              <FollowerList />
            </div>
            <div className="border border-gray-200 bg-card rounded-lg shadow-md overflow-hidden">
              <ComingSoon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
