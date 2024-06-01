"use client";

import React from "react";

export default function MainVideo({ url }) {
	return (
		<div className="flex-1">
			<iframe
				src={`https://www.youtube.com/embed/${url}?&rel=0`}
				allow="fullscreen;"
				allowFullScreen="allowfullscreen"
				className="w-full"
				style={{
					aspectRatio: "16/9",
					maxHeight: "80vh",
				}}
			></iframe>
		</div>
	);
}
