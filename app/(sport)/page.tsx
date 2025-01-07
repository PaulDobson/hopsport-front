import React from "react";
import NewsSection from "./home/new-section";
import TopAttendeeCard from "./home/top-attendee";
import AttendanceRanking from "./home/attendance-ranking";
import BirthdaySection from "./home/birthday-section";
import UpcomingExams from "./home/upcoming-events";
import { h1 } from "framer-motion/client";

export default async function page() {
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
  {
    /* 
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    <div className="lg:col-span-2">
    <NewsSection />
    </div>
    <div>
    <TopAttendeeCard />
    </div>
    <div className="lg:col-span-2">
    <AttendanceRanking />
    </div>
    <div>
    <BirthdaySection />
    </div>
    <div className="lg:col-span-3">
    <UpcomingExams />
    </div>
    </div>
    */
  }
}
