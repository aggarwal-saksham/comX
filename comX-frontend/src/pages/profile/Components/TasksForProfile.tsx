import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock, Disc, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import ProfileAPI from "@/api/profile/ProfileAPI";
import ErrorPage from "@/pages/genral/ErrorPage";

type Task = {
  id: number;
  title: string;
  status: "COMPLETED" | "PENDING" | "INPROGRESS";
  date: string;
};

export default function TaskForProfile() {
  const [activeTab, setActiveTab] = useState<
    "COMPLETED" | "PENDING" | "INPROGRESS" | "ALL"
  >("COMPLETED");

  const { profile, profileLoading, profileError } = ProfileAPI();

  if (profileLoading) return <div>Loading ...</div>;
  if (profileError) return <ErrorPage />;

  const tasks: Task[] = profile.Task.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    date: (task.completedDate ?? task.deadline ?? task.createdAt).slice(0, 10),
  }));

  const filteredTasks = tasks.filter(
    (task) => task.status === activeTab || activeTab === "ALL"
  );

  return (
    <Card className="p-3 border-0 shadow-none w-full overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-4 w-full p-1 bg-gray-100 dark:bg-muted rounded-lg">
        <TabButton
          status="ALL"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          status="COMPLETED"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          status="PENDING"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          status="INPROGRESS"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {filteredTasks.length > 0 ? (
        <div className="overflow-x-auto max-h-[232px] no-scrollbar">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Title</TableHead>
                <TableHead className="w-[25%]">Status</TableHead>
                <TableHead className="w-[25%]">Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium text-xs sm:text-sm truncate max-w-[120px]">
                    {task.title}
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="flex items-center">
                      {task.status === "COMPLETED" && (
                        <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-green-500 shrink-0" />
                      )}
                      {task.status === "PENDING" && (
                        <Clock className="mr-1.5 h-3.5 w-3.5 text-yellow-500 shrink-0" />
                      )}
                      {task.status === "INPROGRESS" && (
                        <PlayCircle className="mr-1.5 h-3.5 w-3.5 text-blue-500 shrink-0" />
                      )}
                      {task.status === "COMPLETED" && "Completed"}
                      {task.status === "PENDING" && "Pending"}
                      {task.status === "INPROGRESS" && "In-Progress"}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">{task.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-xs text-gray-500 py-6">
          No tasks found in this category.
        </p>
      )}
    </Card>
  );
}

function TabButton({
  status,
  activeTab,
  setActiveTab,
}: {
  status: "COMPLETED" | "PENDING" | "INPROGRESS" | "ALL";
  activeTab: string;
  setActiveTab: (
    status: "COMPLETED" | "PENDING" | "INPROGRESS" | "ALL"
  ) => void;
}) {
  const isActive = status === activeTab;
  const Icon =
    status === "COMPLETED"
      ? CheckCircle
      : status === "PENDING"
      ? Clock
      : status === "ALL"
      ? Disc
      : PlayCircle;

  const label =
    status === "COMPLETED"
      ? "Completed"
      : status === "PENDING"
      ? "Pending"
      : status === "INPROGRESS"
      ? "In Progress"
      : "All";

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={() => setActiveTab(status)}
      className={`w-full text-xs h-8 px-1.5 py-1 justify-center rounded-md font-medium transition-all ${
        isActive
          ? "bg-white text-gray-900 shadow-sm dark:bg-card dark:text-foreground"
          : "text-gray-600 hover:text-gray-900 dark:text-muted-foreground"
      }`}
    >
      <Icon className="w-3.5 h-3.5 mr-1 shrink-0" />
      <span className="truncate">{label}</span>
    </Button>
  );
}
