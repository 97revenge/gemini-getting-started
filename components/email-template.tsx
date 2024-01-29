import Markdown from "react-markdown";

export const EmailTemplate: React.FC = ({ ...props }) => {
  return (
    <>
      <Markdown {...props}></Markdown>
    </>
  );
};
