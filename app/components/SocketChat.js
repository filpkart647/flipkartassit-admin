import { getReq } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import Loading from './Loading';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const SOCKET_SERVER_URL = 'https://filpkartclone-6hc7.onrender.com';
const socket = io(SOCKET_SERVER_URL);

function SocketChat({ setOpenUserChat, selectedUser, setSelectedUser }) {
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const receiverId = selectedUser?._id || '';
  const [messageInput, setMessageInput] = useState('');
  const bottomRef = useRef(null);
  const [previousMessages, setPreviousMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      if (
        message?.sender === receiverId &&
        message?.receiver === adminData?.id
      ) {
        console.log('Message is for this admin');
        setPreviousMessages((prev) => [...prev, message]);
      }
    });
    return () => {
      socket.off('receiveMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === '' || receiverId.trim() === '') return;
    socket.emit('sendMessage', {
      senderId: adminData?.id,
      receiverId: receiverId,
      content: messageInput,
    });
    const sentMsg = {
      sender: adminData?.id,
      receiver: receiverId,
      content: messageInput,
      timestamp: new Date().toISOString(),
    };
    setPreviousMessages((prev) => [...prev, sentMsg]);
    setMessageInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [previousMessages]);

  const getMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getReq(`/chat/${selectedUser?._id}`);
      const { data, status, error } = res;

      if (status) {
        setPreviousMessages(data);
      } else {
        if (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [selectedUser?._id]);
  useEffect(() => {
    if (selectedUser && selectedUser?._id) {
      getMessages();
    }
  }, [getMessages, selectedUser, selectedUser?._id]);

  let lastDatePrinted = null;
  return (
    <>
      {loading && <Loading />}
      <div className="bg-white rounded-lg  shadow-md h-[calc(100dvh-100px)] border border-gray-200">
        <div className="flex flex-col h-full">
          <h2 className="font-bold text-lg capitalize  sticky top-0 z-10 bg-white pb-2 flex items-center gap-2 mt-1 pl-2">
            <span
              onClick={() => {
                setOpenUserChat(false);
                setSelectedUser(null);
              }}
              className="cursor-pointer"
            >
              {reactIcons.arrowLeft}{' '}
            </span>{' '}
            <div className="h-6 w-6 rounded-full bg-[#2874f0]  flex items-center justify-center p-1 text-white text-14">
              {selectedUser?.username?.charAt(0)?.toUpperCase() || 'A'}
            </div>{' '}
            {selectedUser?.username}
          </h2>
          <div className="flex-1 overflow-y-auto p-2 bg-[#f1f3f6] rounded-md chatBg">
            <div>
              {previousMessages.map((msg, index) => {
                const msgDate = dayjs(msg.timestamp);
                const msgDateStr = msgDate.format('YYYY-MM-DD');

                // Determine if we need a date separator
                let separator = null;
                if (msgDateStr !== lastDatePrinted) {
                  const today = dayjs().format('YYYY-MM-DD');
                  const yesterday = dayjs()
                    .subtract(1, 'day')
                    .format('YYYY-MM-DD');

                  if (msgDateStr === today) separator = 'Today';
                  else if (msgDateStr === yesterday) separator = 'Yesterday';
                  else separator = msgDate.format('MMMM D, YYYY');

                  lastDatePrinted = msgDateStr;
                }

                return (
                  <React.Fragment key={msg._id || index}>
                    {separator && (
                      <p className="text-center text-gray-500 py-2">
                        — {separator} —
                      </p>
                    )}
                    <div
                      className={`flex flex-col ${
                        adminData?.id === msg.sender
                          ? 'items-end justify-end pl-5'
                          : 'items-start justify-start pr-5'
                      } mb-1`}
                    >
                      <div
                        className={`p-2 rounded-md text-sm ${
                          adminData?.id === msg.sender
                            ? 'bg-[#4e88ff] text-white'
                            : 'bg-[#2d2d3a] text-gray-100'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-gray-500 text-xs leading-3">
                        {msgDate.format('hh:mm A')}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <div ref={bottomRef} />
          </div>
          <form className=" border-t border-gray-300">
            <div className="flex">
              <input
                type="text"
                className="w-full px-2 py-1 border rounded-none  outline-none"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white  hover:bg-blue-600"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
SocketChat.propTypes = {
  setOpenUserChat: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
};
export default SocketChat;
