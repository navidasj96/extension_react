import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism"

const SyntaxHighlight = ({ children, ...props }) => (
  <SyntaxHighlighter
    style={nightOwl}
    language="javascript"
    showLineNumbers
    {...props}>
    {children}
  </SyntaxHighlighter>
)

export default SyntaxHighlight
