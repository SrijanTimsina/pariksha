"use client";

import TestHistoryTable from "@/components/TestHistoryTable";
import React from "react";
import withAuth from "@/utils/withAuth";

function page() {
  return (
    <div className="content-container pt-8">
      <h1 className="text-lg font-semibold">Your Submitted Tests History</h1>
      <TestHistoryTable />
    </div>
  );
}
export default withAuth(page);
