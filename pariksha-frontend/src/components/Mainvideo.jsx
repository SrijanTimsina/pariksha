"use client";

import React from "react";

export default function Mainvideo({ url }) {
	function getId(url) {
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	}
	const videoId = getId(url);
	return (
		<div className="flex-1">
			<iframe
				src={`https://www.youtube.com/embed/${videoId}?&rel=0`}
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
