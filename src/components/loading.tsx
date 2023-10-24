import { styled } from "styled-components";

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 24px;
`;

export default function Loading() {
  return (
    <Wrap>
      <Text>Loading...</Text>
    </Wrap>
  );
}
