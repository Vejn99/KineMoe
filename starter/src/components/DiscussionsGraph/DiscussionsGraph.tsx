import React from "react";
import { Discussion } from "../../pages/Community/CommunityPage";

interface DiscussionsGraphProps {
  discussions: Discussion[];
  type: "discussion" | "comment";
  max: number;
}

const DiscussionsGraph = ({
  discussions,
  type,
  max,
}: DiscussionsGraphProps) => {
  const total =
    type === "discussion"
      ? discussions.length
      : discussions.reduce((acc, discussion) => {
          const commentsLength = discussion.comments
            ? discussion.comments.length
            : 0;

          return acc + commentsLength;
        }, 0);

  const percentage = (total / max) * 100;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${
    (percentage / 100) * circumference
  } ${circumference}`;

  return (
    <div className="d-flex align-items-center mb-2">
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
          stroke={type === "discussion" ? "#529C3D" : "#529C3D"}
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

export default DiscussionsGraph;
