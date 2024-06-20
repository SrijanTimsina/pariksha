import { InlineMath } from "react-katex";

export const renderMath = (text) => {
  const regex = /<InlineMath>(.*?)<\/InlineMath>/g;
  return text.split(regex).map((part, index) => {
    if (index % 2 === 1) {
      return <InlineMath key={index}>{part}</InlineMath>;
    }
    return part;
  });
};
