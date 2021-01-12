import React, {FC} from "react";
import DOMPurify from 'dompurify';

interface ISanitizeHTMLProps {
    html: string;
    options?: string[];
}

const SanitizeHTML: FC<ISanitizeHTMLProps> = ({ html, options }) => {
    const defaultOptions = {
        ALLOWED_TAGS: [ "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
            "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
            "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
            "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
            "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
            "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
            "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "img" ],
        ALLOWED_ATTR: ['href', 'name', 'target', 'src']
    };

    const sanitize = (dirty: string, options?: string[]) => ({
        __html: DOMPurify.sanitize(
            dirty,
            { ...defaultOptions, ...options }
        )
    });
    return (
        <div dangerouslySetInnerHTML={sanitize(html, options)} />
    );
}

export default SanitizeHTML;