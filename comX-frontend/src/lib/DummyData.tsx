import { LockClosedIcon } from "@radix-ui/react-icons";
import {
  Hash,
  Info,
  Users,
  Bell,
  Calendar,
  Settings,
  FolderKanban,
  CheckCheck,
  Video,
  MessageCircleCode,
} from "lucide-react";
import {
  Snowflake,
  Heart,
  Sprout,
  Umbrella,
  Flower,
  Sun,
  Palmtree,
  Flame,
  GraduationCap,
  Ghost,
  Gift,
  TreePine,
} from "lucide-react";

export const Server = [
  {
    id: 1,
    name: "Calender",
    link: <Calendar />,
  },
  {
    id: 2,
    name: "Setting",
    link: <Settings />,
  },
  {
    id: 4,
    name: "Chat",
    link: <MessageCircleCode />,
  },
  {
    id: 5,
    name: "Projects",
    link: <FolderKanban />,
  },
  {
    id: 6,
    name: "Tasks",
    link: <CheckCheck />,
  },
  {
    id: 3,
    name: "Call",
    link: <Video />,
  },
];

export const Groups = [
  {
    id: 1,
    name: "Text Channels",
    link: <Hash className={`w-5 h-5 mr-1.5 text-gray-400`} />,
  },
  // {
  //   id: 2,
  //   name: "Voice Channels",
  //   link: <Volume2 className="w-5 h-5 mr-1.5 text-gray-400" />,
  // },
  // {
  //   id: 3,
  //   name: "Video Channels",
  //   link: <Video className="w-5 h-5 mr-1.5 text-gray-400" />,
  // },
];

export const Setting = [
  {
    id: 1,
    name: "Basic Information",
    link: "settings/basic-info",
    icon: <Info className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 2,
    name: "Member Management",
    link: "settings/member-management",
    icon: <Users className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 3,
    name: "Privacy & Permissions",
    link: "settings/privacy-permissions",
    icon: <LockClosedIcon className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 4,
    name: "Notification Settings",
    link: "settings/notification",
    icon: <Bell className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
];

export const Months = [
  {
    id: 1,
    name: "January",
    link: <Snowflake className="w-6 h-6 text-sky-400" />,
  },
  {
    id: 2,
    name: "February",
    link: <Heart className="w-6 h-6 text-rose-500" />,
  },
  {
    id: 3,
    name: "March",
    link: <Sprout className="w-6 h-6 text-emerald-500" />,
  },
  {
    id: 4,
    name: "April",
    link: <Umbrella className="w-6 h-6 text-cyan-500" />,
  },
  {
    id: 5,
    name: "May",
    link: <Flower className="w-6 h-6 text-pink-500" />,
  },
  {
    id: 6,
    name: "June",
    link: <Sun className="w-6 h-6 text-amber-500" />,
  },
  {
    id: 7,
    name: "July",
    link: <Palmtree className="w-6 h-6 text-teal-600" />,
  },
  {
    id: 8,
    name: "August",
    link: <Flame className="w-6 h-6 text-orange-500" />,
  },
  {
    id: 9,
    name: "September",
    link: <GraduationCap className="w-6 h-6 text-indigo-500" />,
  },
  {
    id: 10,
    name: "October",
    link: <Ghost className="w-6 h-6 text-purple-500" />,
  },
  {
    id: 11,
    name: "November",
    link: <Gift className="w-6 h-6 text-red-500" />,
  },
  {
    id: 12,
    name: "December",
    link: <TreePine className="w-6 h-6 text-green-600" />,
  },
];

export type Task = {
  id: number;
  title: string;
  description: string;
  referenceLinks: string[];
  milestone: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "in-progress" | "pending" | "overdue" | "completed";
  deadline: Date;
  createdAt: Date;
  content: string;
  projectId: number;
  assignId: number;
};
