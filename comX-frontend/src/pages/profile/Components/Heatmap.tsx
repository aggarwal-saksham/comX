import { useMemo, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { scaleLinear } from "d3-scale";
import { interpolateGreens } from "d3-scale-chromatic";
import ErrorPage from "@/pages/genral/ErrorPage";
import ProfileAPI from "@/api/profile/ProfileAPI";

interface ContributionData {
  date: Date;
  count: number;
}

interface HeatmapProps {
  title?: string;
  description?: string;
}

const CELL_SIZE = 16;
const DAYS_IN_WEEK = 7;
const WEEKS_IN_YEAR = 53;
const MARGIN_LEFT = 35;

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CustomHeatmap = ({ data }: { data: ContributionData[] }) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const colorScale = scaleLinear<number>()
    .domain([1, maxCount])
    .range([0, 1]);

  const startDate = data[0].date;

  // Generate month labels based on start date
  const monthLabels = useMemo(() => {
    const labels = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const weekIndex = Math.floor(
        (firstDayOfMonth.getTime() - startDate.getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      );

      if (weekIndex < WEEKS_IN_YEAR) {
        labels.push({
          label: monthNames[date.getMonth()],
          x: weekIndex * CELL_SIZE + MARGIN_LEFT,
        });
      }
    }
    return labels;
  }, [startDate]);

  const getCellColor = (count: number) => {
    if (count === 0) return "#ebedf0";
    return interpolateGreens(0.35 + 0.65 * colorScale(count));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${WEEKS_IN_YEAR + 1}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${DAYS_IN_WEEK + 2}, ${CELL_SIZE}px)`,
        gap: "3px",
        position: "relative",
        minWidth: `${(WEEKS_IN_YEAR + 1) * (CELL_SIZE + 3) + MARGIN_LEFT}px`,
        height: `${(DAYS_IN_WEEK + 2) * (CELL_SIZE + 3)}px`,
      }}
    >
      {/* Month labels */}
      {monthLabels.map((month, index) => (
        <div
          key={index}
          style={{
            gridColumnStart: Math.floor(month.x / CELL_SIZE) + 2,
            gridRowStart: 1,
            fontSize: "11px",
            textAlign: "left",
            color: "#6e7681",
          }}
        >
          {month.label}
        </div>
      ))}

      {/* Weekday labels */}
      {weekdayNames.map((day, index) => (
        <div
          key={day}
          style={{
            gridColumnStart: 1,
            gridRowStart: index + 2,
            fontSize: "11px",
            textAlign: "right",
            paddingRight: "6px",
            color: "#6e7681",
          }}
        >
          {day}
        </div>
      ))}

      {/* Render heatmap cells */}
      {data.map((day, index) => {
        const col = Math.floor(index / DAYS_IN_WEEK);
        const row = index % DAYS_IN_WEEK;
        return (
          <div
            key={day.date.toISOString()}
            style={{
              gridColumnStart: col + 2,
              gridRowStart: row + 2,
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
              backgroundColor: getCellColor(day.count),
              borderRadius: "2px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            title={`${day.date.toDateString()}: ${day.count} contribution${
              day.count !== 1 ? "s" : ""
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default function ImprovedCodeHeatmap({
  title = "Contribution Heatmap",
  description = "Visualization of your coding activity over the past year",
}: HeatmapProps) {
  const { profile, profileLoading, profileError } = ProfileAPI();
  const scrollRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => {
    if (!profile || !profile.Task) return [];
    return generateSampleData(365, profile.Task);
  }, [profile]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  if (profileLoading) return <div>Loading ...</div>;
  if (profileError) return <ErrorPage />;

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto overflow-y-hidden pb-3 pt-1 select-none"
        >
          <CustomHeatmap data={data} />
        </div>
      </CardContent>
    </Card>
  );
}

interface ContributionData {
  date: Date;
  count: number;
}

type Task = {
  id: number;
  title: string;
  priority: string;
  status: string;
  deadline: string;
  createdAt: string;
  completedDate: string | null;
};

const generateSampleData = (
  days: number,
  tasks: Task[]
): ContributionData[] => {
  const data: ContributionData[] = [];
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < days; i++) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);

    const completedCount = tasks.filter((task) => {
      if (task.completedDate) {
        const taskDate = new Date(task.completedDate);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === date.getTime();
      }
      return false;
    }).length;

    data.unshift({
      date: date,
      count: completedCount,
    });
  }

  return data;
};
