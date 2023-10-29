import PostTweetForm from "../postTweetForm";
import { styled } from "styled-components";

const Wrap = styled.div``;

export default function Home() {
  return (
    <Wrap>
      <PostTweetForm />
    </Wrap>
  );
}
