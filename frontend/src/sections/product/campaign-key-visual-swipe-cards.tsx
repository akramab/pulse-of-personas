import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { m, LazyMotion, domAnimation, useTransform, useMotionValue } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';

import { Image } from 'src/components/image';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';
import { Button } from '@mui/material';

// Define a type for card data
interface CardData {
  id: number;
  url: string;
}

// Define the props for the Card component
interface CardPropsLocal {
  card: CardData;
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  isFront: boolean;
  zIndex: number;
}
type Props = CardProps & {
  list: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

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
  const carousel = useCarousel({
    loop: true,
    dragFree: false,
    containScroll: 'keepSnaps',
    dragThreshold: 1000000,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const components = [
    <LazyMotion features={domAnimation} key="1">
      <div className="grid h-[500px] w-full place-items-center bg-neutral-100">
        {/* Render cards in the original order */}
        {cards.slice(0, 2).map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards}
            isFront={index === 0}
            zIndex={cards.length - index}
            onSwipe={handleSwipe}
          />
        ))}
        <Typography variant="subtitle2">
          CVS Health Mucus 12HR Extended Release and Chest Congestion Expectorant Relief, 20 CT
        </Typography>
        <ToastContainer />
      </div>
    </LazyMotion>,
    <LazyMotion features={domAnimation} key="2">
      <div className="grid h-[500px] w-full place-items-center bg-neutral-200">
        {/* Render cards differently for demo */}
        {cards.slice(2, 4).map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards}
            isFront={index === 0}
            zIndex={cards.length - index}
            onSwipe={handleSwipe}
          />
        ))}
        <Typography variant="subtitle2">
          CVS Health Extra Strength Nasal Strips, Tan, 50 CT
        </Typography>
        <ToastContainer />
      </div>
    </LazyMotion>,

    <LazyMotion features={domAnimation} key="1">
      <div className="grid h-[500px] w-full place-items-center bg-neutral-100">
        {/* Render cards in the original order */}
        {cards.slice(4, 6).map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards}
            isFront={index === 0}
            zIndex={cards.length - index}
            onSwipe={handleSwipe}
          />
        ))}
        <Typography variant="subtitle2">
          CVS Beauty Makeup Remover Cleansing Cloth Towelettes
        </Typography>
        <ToastContainer />
      </div>
    </LazyMotion>,

    <LazyMotion features={domAnimation} key="1">
      <div className="grid h-[500px] w-full place-items-center bg-neutral-100">
        {/* Render cards in the original order */}
        {cards.slice(0, 2).map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards}
            isFront={index === 0}
            zIndex={cards.length - index}
            onSwipe={handleSwipe}
          />
        ))}
        <Typography variant="subtitle2">
          CVS Health Waterproof Hydrocolloid Blemish Patches, 12 CT
        </Typography>
        <ToastContainer />
      </div>
    </LazyMotion>,
    <LazyMotion features={domAnimation} key="2">
      <div className="grid h-[500px] w-full place-items-center bg-neutral-200">
        {/* Render cards differently for demo */}
        {cards.slice(2, 4).map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards}
            isFront={index === 0}
            zIndex={cards.length - index}
            onSwipe={handleSwipe}
          />
        ))}
        <Typography variant="subtitle2">
          CVS Health Series 100 Upper Arm Blood Pressure Monitor
        </Typography>
        <ToastContainer />
      </div>
    </LazyMotion>,
    // Repeat the LazyMotion components as needed up to five times
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % components.length);
  const handlePrevious = () =>
    setActiveIndex((prev) => (prev - 1 + components.length) % components.length);
  return (
    <Card sx={{ bgcolor: 'common.black', position: 'relative' }}>
      {/* Navigation Buttons */}
      <Button
        variant="contained"
        onClick={handlePrevious}
        sx={{ position: 'absolute', top: 16, left: 16 }}
      >
        Previous
      </Button>

      <Button
        variant="contained"
        onClick={handleNext}
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        Next
      </Button>

      {/* Render only the active LazyMotion component */}
      {components[activeIndex]}
    </Card>
  );
}

const CardLocal: React.FC<CardPropsLocal & { onSwipe: (direction: string) => void }> = ({
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

type CarouselItemProps = BoxProps & {
  item: Props['list'][number];
};

function CarouselItem({ item, ...other }: CarouselItemProps) {
  return (
    <Box sx={{ width: 1, position: 'relative', ...other }}>
      <Box
        sx={{
          p: 3,
          gap: 1,
          width: 1,
          bottom: 0,
          zIndex: 9,
          display: 'flex',
          position: 'absolute',
          color: 'common.white',
          flexDirection: 'column',
        }}
      >
        <Typography variant="overline" sx={{ color: 'primary.light' }}>
          Featured App
        </Typography>

        <Link color="inherit" underline="none" variant="h5" noWrap>
          {item.title}
        </Link>

        <Typography variant="body2" noWrap>
          {item.description}
        </Typography>
      </Box>

      <Image
        alt={item.title}
        src={item.coverUrl}
        slotProps={{
          overlay: {
            background: (theme) =>
              `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.common.blackChannel, 0)} 0%, ${theme.vars.palette.common.black} 75%)`,
          },
        }}
        sx={{
          width: 1,
          height: { xs: 288, xl: 320 },
        }}
      />
    </Box>
  );
}
