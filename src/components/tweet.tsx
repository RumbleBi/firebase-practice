import { styled } from "styled-components";
import { Tweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrap = styled.div`
  display: gird;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;
const Col = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteBtn = styled.button`
  background-color: red;
  color: #fff;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: Tweet) {
  const user = auth.currentUser;

  const [isLoading, setIsLoading] = useState(false);

  const deleteTweet = async () => {
    const deleteConfirm = confirm("정말 삭제하시겠습니까?");

    if (!deleteConfirm || user?.uid !== userId) return;
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Wrap>
      <Col>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteBtn onClick={deleteTweet}>{isLoading ? "deleting..." : "delete"}</DeleteBtn>
        ) : null}
      </Col>
      <Col>{photo ? <Photo src={photo} /> : null}</Col>
    </Wrap>
  );
}
