import PostTweetForm from "../postTweetForm";
import { styled } from "styled-components";
import Timeline from "../timeline";

const Wrap = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
  height: calc(100vh - 100px);
`;

export default function Home() {
  return (
    <Wrap>
      <PostTweetForm />
      <Timeline />
    </Wrap>
  );
}
