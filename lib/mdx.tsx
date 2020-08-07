import React, {ReactElement} from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import styled from 'styled-components';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MDXCodeBlock = (props: any): ReactElement => {
    const {
        children: {
            props: { children, className, metastring },
        },
    } = props;

    const language = className.replace(/language-/, '');
    const shouldHighlightLine = calculateLinesToHighlight(metastring);

    return (
        <Highlight
            {...defaultProps}
            code={children.trim()}
            language={language as Language}
            theme={dracula}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <CodePreBlockWithHighlight
                    className={className}
                    style={{ ...style }}
                >
                    {tokens.map((line, i) => {
                        const lineProps = getLineProps({ line, key: i });
                        if (shouldHighlightLine(i)) {
                            lineProps.className = `${lineProps.className} highlight-line`;
                        }
                        return (
                            <div {...lineProps} key={i}>
                                {line.map((token, key) => (
                                    <span
                                        {...getTokenProps({ token, key })}
                                        key={key}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </CodePreBlockWithHighlight>
            )}
        </Highlight>
    );
};

export { MDXCodeBlock };

const CodePreBlockWithHighlight = styled.pre`
	padding: 15px;
	border-radius: 5px;
    font-size: 16px;
    overflow: scroll;
	.highlight-line {
		background-color: rgb(53, 59, 69, 0.5);
		display: block;
		margin-right: -1em;
		margin-left: -1em;
		padding-right: 1em;
		padding-left: 0.75em;
		border-left: 0.3em solid #9d86e9;
	}
`;

const RE = /{([\d,-]+)}/;
const calculateLinesToHighlight = (meta: string) => {
    const regExpExecArray = RE.exec(meta);
    if (!RE.test(meta) || regExpExecArray === null) {
        return () => false;
    } else {
        const lineNumbers = regExpExecArray[1]
            .split(',')
            .map((v) => v.split('-').map((v) => parseInt(v, 10)));
        return (index: number) => {
            const lineNumber = index + 1;
            const inRange = lineNumbers.some(([start, end]) =>
                end
                    ? lineNumber >= start && lineNumber <= end
                    : lineNumber === start
            );
            return inRange;
        };
    }
};