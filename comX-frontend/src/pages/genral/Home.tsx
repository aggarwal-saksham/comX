import Navbar from "@/components/Navbar";
import { Cover } from "@/components/ui/cover";
import { setTab } from "@/state/tab/tabSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTab("Home"));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md pt-[12%] z-0 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold max-w-5xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          A Unified Workspace for Software Teams
          <br /> <Cover>COM-X</Cover>
        </h1>
        <Toaster />
      </div>
    </>
  );
}
