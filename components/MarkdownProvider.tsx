import hljs from "highlight.js"
import React, { useEffect, useState } from "react"

import "highlight.js/styles/github.css" // Or any other style you prefer

import { Marked, marked } from "marked"
import markedCodePreview from "marked-code-preview"
import { markedHighlight } from "marked-highlight"
import { markedSmartypants } from "marked-smartypants"

import "highlight.js/styles/github.css" // Import a style theme of your choice

interface MarkdownProps {
  markdownText: string
}

const MarkdownRenderer: React.FC<MarkdownProps> = ({ markdownText }) => {
  const [htmlContent, setHtmlContent] = useState<any>("")
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",

      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext"
        return hljs.highlight(code, { language }).value
      }
    })
  )
  marked.use(markedSmartypants())
  marked.use(markedCodePreview())
  useEffect(() => {
    // Configure marked
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true // Use 'hljs' class for syntax highlighting,
    })

    // Convert markdown text to HTML
    setHtmlContent(marked.parse(markdownText))
  }, [markdownText])

  return (
    <div className="w-full">
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        id="markdownd"
        className=""
      />
    </div>
  )
}

export default MarkdownRenderer
