import React from 'react';

import { Chat } from '@/components';

const Dashboard = () => {
  const cardData = [
    { id: 1, title: 'Order details' },
    { id: 2, title: 'Order concern resolution' },
    { id: 3, title: 'Delivery partner details' },
    { id: 4, title: 'Restaurant details' },
    { id: 5, title: 'Restaurant owner details' },
    { id: 6, title: 'Restaurant owner No.' },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 h-[calc(100dvh-80px)]">
      <div className="w-full col-span-2 h-[calc(100dvh-80px)] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="bg-white flex items-center justify-center p-6 shadow-md rounded-2xl border text-center min-h-[200px] border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-center my-auto">
                {card.title}
              </h2>
            </div>
          ))}
        </div>
        <div className="my-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9124079109797!2d77.596277074096!3d12.977453987338444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167ada5403cb%3A0x127842fde7c41828!2sChinnaswamy%20Stadium!5e0!3m2!1sen!2sin!4v1748800130866!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="h-full ">
        <Chat />
      </div>
    </section>
  );
};

export default Dashboard;
