import { getReq } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import React, { useCallback, useEffect, useState } from 'react';
import Loading from '../Loading';
import SocketChat from '../SocketChat';

function Chat() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openUserChat, setOpenUserChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUserData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getReq('/user/users');
      const { data, status, error } = res;

      console.log(res, ' res of users');
      if (status) {
        setUsers(data?.users);
      } else {
        if (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      {loading && <Loading />}
      <section className="">
        {openUserChat && selectedUser ? (
          <SocketChat
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setOpenUserChat={setOpenUserChat}
          />
        ) : (
          <div className="bg-white rounded-lg  overflow-y-auto h-[calc(100dvh-80px)]">
            <h2 className="font-bold text-xl  sticky top-0 z-10 bg-white pb-2">
              Users List
            </h2>
            {users && users?.length > 0 ? (
              users?.map((user, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenUserChat(true);
                  }}
                  className="flex items-center justify-between px-5 py-2 border border-gray-200 shadow hover:bg-gray-200 cursor-pointer mb-2"
                >
                  <p className="capitalize">{user?.username}</p>{' '}
                  <span>{reactIcons.arrowright}</span>
                </div>
              ))
            ) : (
              <div>No User Found</div>
            )}
          </div>
        )}
      </section>
    </>
  );
}

export default Chat;
