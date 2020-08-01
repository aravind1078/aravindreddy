import styled from 'styled-components';

const HomeView = styled.div`
    display: grid;
`;

const Title = styled.h1`
    font-size: 2rem;
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
`;

const AboutText = styled.p`
    line-height: 1.4;
    padding: 15px 0px;
    margin: 0px;
`;

const TextHighlighter = styled.span`
    color: #ce125a;
`;

export default {
    HomeView,
    Title,
    Center,
    AboutText,
    TextHighlighter
};