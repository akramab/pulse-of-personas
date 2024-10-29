import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { m, LazyMotion, domAnimation, useTransform, useMotionValue } from 'framer-motion';

// Define a type for card data
interface CardData {
  id: number;
  url: string;
}

// Define the props for the Card component
interface CardProps {
  card: CardData;
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  isFront: boolean;
  zIndex: number;
}

// Card data
const cardData: CardData[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1570464197285-9949814674a7?q=80&w=2273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1578608712688-36b5be8823dc?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export function CampaignKeyVisualSwipeCards() {
  const [cards, setCards] = useState<CardData[]>(cardData);

  const handleSwipe = (direction: string) => {
    // Show accepted/rejected toast message using Toastify
    if (direction === 'left') {
      toast.error('Skipped this one, rejected!', {
        autoClose: 500,
        position: 'top-center',
      });
    } else {
      toast.success('Added to your picks!', {
        autoClose: 500,
        position: 'top-center',
      });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="grid h-[500px] w-full place-items-center bg-neutral-100" style={{}}>
        {/* Render cards in the original order */}
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            setCards={setCards}
            isFront={index === 0} // The first item in the array is the "front" card
            zIndex={cards.length - index} // Higher zIndex for cards at the beginning of the array
            onSwipe={handleSwipe} // Pass swipe handler to Card
          />
        ))}
        <ToastContainer /> {/* Toastify Container for displaying notifications */}
      </div>
    </LazyMotion>
  );
}

const Card: React.FC<CardProps & { onSwipe: (direction: string) => void }> = ({
  card,
  setCards,
  isFront,
  zIndex,
  onSwipe,
}) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : card.id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((prevCards) => prevCards.slice(1)); // Remove the first card (topmost) on swipe
      onSwipe(x.get() > 0 ? 'right' : 'left'); // Call onSwipe with the direction
    }
  };

  return (
    <m.img
      src={card.url}
      alt="Placeholder alt"
      className="h-96 w-72 origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        zIndex, // Ensures cards stack correctly
        transition: '0.125s transform',
        boxShadow: isFront
          ? '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)'
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    />
  );
};
