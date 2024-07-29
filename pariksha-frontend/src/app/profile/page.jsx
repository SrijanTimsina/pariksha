"use client";

import withAuth from "@/utils/withAuth";
import React from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/utils/AuthContext";
import DisplayData from "@/components/DisplayData";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import WatchHistoryTable from "@/components/WatchHistoryTable";
import TestHistoryTable from "@/components/TestHistoryTable";

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      {user && (
        <div className="content-container pt-20">
          <div className="mt-8">
            <h1 className="text-lg font-semibold">Your Profile</h1>
            <div className="mt-4 flex flex-col gap-6 pl-4">
              <DisplayData label="NAME" value={user.fullName} />
              <DisplayData label="EMAIL" value={user.email} />
              <DisplayData label="PHONE NUMBER" value={user.contactNumber} />
              <DisplayData label="CITY" value={user.studyLocation} />
              {/* <DisplayData
                label="ABROAD PLANS"
                value={user.abroadPlans ? "YES" : "NO"}
              /> */}
            </div>
          </div>
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold">Your Watch History</h1>
              <Link href="/csit-entrance/watch-history">
                <PrimaryButton text={"View All"} className={"rounded-lg"} />
              </Link>
            </div>
            <WatchHistoryTable maxItems={5} />
          </div>
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold">Your Submitted Tests</h1>
              <Link href="/csit-entrance/test-history">
                <PrimaryButton text={"View All"} className={"rounded-lg"} />
              </Link>
            </div>

            <TestHistoryTable maxItems={5} />
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(Profile);
