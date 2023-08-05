'use client';
import { TypedChallenge } from '@/lib/types';
import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { SocialActions } from '@/redux/slices/socialSlice';

type Props = { currentChallenge: TypedChallenge | null };

const Social = ({ currentChallenge }: Props) => {
  const [chat, setChat] = useState<string>('');
  const chats = useAppSelector((store) => store.social.chats);

  const timeSortedChats = [...chats].sort(
    (a, b) => b.timeCreated - a.timeCreated
  );

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  return (
    <div className="w-full h-full ">
      <div className="h-[8%] w-full border-2 border-b-0 text-lg text-white">
        {currentChallenge?.id}
      </div>
      <div
        ref={chatContainerRef}
        className="h-[90%] w-full flex flex-col border-2  "
      >
        <div
          style={{
            height: chatContainerRef.current?.clientHeight ?? 0 * 0.8,
          }}
          className="w-full overflow-y-scroll"
        >
          {/* <Button variant={'outline'}>Join</Button> */}
          {timeSortedChats.map((chat) => (
            <div
              className="border border-white w-full h-1/5 text-white"
              key={chat.fromID}
            >
              {chat.message}
            </div>
          ))}
        </div>
        <div className="h-1/5 w-full border-y-2 text-white">
          <Textarea value={chat} onChange={(e) => setChat(e.target.value)} />
          <Button
            onClick={() => {
              dispatch(
                SocialActions.addChat({
                  fromID: 'test',
                  id: 'testagain',
                  message: chat,
                  timeCreated: Date.now(),
                })
              );
            }}
            variant={'outline'}
            className="w-full text-primary "
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Social;
