import * as React from "react";

import Markdown from "react-markdown";

interface EmailTemplateProps {
  markdown: any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  markdown,
}) => (
  <div>
    <Markdown>{markdown}</Markdown>
  </div>
);
