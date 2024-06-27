import React from "react";
import { Discussion, Comment } from "../../pages/Community/CommunityPage";

interface ProfileGraphProps {
  data: Discussion[]; // Accept both Discussion and Comment arrays
  type: "discussion" | "comment"; // Type of data to display
  max: number;
  username: string;
}

export const ProfileGraph = ({
  data,
  type,
  username,
  max,
}: ProfileGraphProps) => {
  // Filter discussions or comments by the given username and type
  const userData =
    type === "discussion"
      ? data.filter(
          (discussion: Discussion) => discussion.viewerName === username
        )
      : data.filter((comment: Comment) => comment.viewerName === username);

  // Calculate the total number of discussions or comments
  const total = userData.length;

  // Calculate the percentage of the total relative to the maximum
  const percentage = (total / max) * 100;

  // Calculate strokeDasharray for the SVG circle
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${
    (percentage / 100) * circumference
  } ${circumference}`;

  return (
    <div className="d-flex align-items-center">
      <svg width="100" height="100" viewBox="-80 -60 150 120">
        <circle
          cx="0"
          cy="0"
          r={radius}
          fill="transparent"
          stroke="#0B151B"
          strokeWidth="35"
        />
        <circle
          cx="0"
          cy="0"
          r={radius}
          fill="transparent"
          stroke="#529C3D"
          strokeWidth="35"
          strokeDasharray={strokeDasharray}
        />
        <text
          x="0"
          y="0"
          dominantBaseline="central"
          textAnchor="middle"
          stroke="white"
        >
          {total}
        </text>
      </svg>
    </div>
  );
};
