import {Stack} from "react-bootstrap"
import { userFetchRecipientUser } from "../../hooks/userFetchRecipient";
import avatar from "../../assets/avatar.svg"
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = userFetchRecipientUser(chat, user)
  const { onlineUsers } = useContext(ChatContext)

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

  return (
    <Stack direction="horizontal" gap={3} className="user-card align-item-center p-2 justify-content-between" role="button">
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} height="35px" />
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">{recipientUser?.name}</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">11/11/22</div>
            <div className="this-user-notifications">2</div>
            <div className={isOnline ? "user-online" : ""}></div>
        </div>
    </Stack>
  );
};

export default UserChat;
