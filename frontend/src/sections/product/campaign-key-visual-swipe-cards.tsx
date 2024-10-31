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
  { id: 1, url: 'https://i.imgur.com/FYKVYLS.jpeg' },
  { id: 2, url: 'https://i.imgur.com/i4edUYl.jpeg' },
  { id: 3, url: 'https://i.imgur.com/Kk9THZZ.jpeg' },
  { id: 4, url: 'https://i.imgur.com/U007pWn.jpeg' },
  { id: 5, url: 'https://i.imgur.com/tDfSdnq.jpeg' },

  { id: 6, url: 'https://i.imgur.com/QJDveZQ.jpeg' },
  { id: 7, url: 'https://i.imgur.com/hb1NLgT.jpeg' },
  { id: 8, url: 'https://i.imgur.com/ukhLmNL.jpeg' },
  { id: 9, url: 'https://i.imgur.com/VuOHCUS.jpeg' },
  { id: 10, url: 'https://i.imgur.com/OE3jq1W.jpeg' },

  { id: 11, url: 'https://i.imgur.com/90hPNgS.jpeg' },
  { id: 12, url: 'https://i.imgur.com/lJwLfuI.jpeg' },
  { id: 13, url: 'https://i.imgur.com/BZhIxY7.jpeg' },
  { id: 14, url: 'https://i.imgur.com/yASn6Ab.jpeg' },
  { id: 15, url: 'https://i.imgur.com/q6be19v.jpeg' },

  { id: 16, url: 'https://i.imgur.com/O5tOKjR.jpeg' },
  { id: 17, url: 'https://i.imgur.com/xIAWaMu.jpeg' },
  { id: 18, url: 'https://i.imgur.com/uziCi8z.jpeg' },
  { id: 19, url: 'https://i.imgur.com/AiY47Yn.jpeg' },
  { id: 20, url: 'https://i.imgur.com/20BkocC.jpeg' },

  { id: 21, url: 'https://i.imgur.com/Oo2A7mT.jpeg' },
  { id: 22, url: 'https://i.imgur.com/McYLFn8.jpeg' },
  { id: 23, url: 'https://i.imgur.com/ucXabZj.jpeg' },
  { id: 24, url: 'https://i.imgur.com/uIfVIQT.jpeg' },
  { id: 25, url: 'https://i.imgur.com/J55a7d7.jpeg' },
];

const cardData1: CardData[] = [
  { id: 1, url: 'https://i.imgur.com/EDGSWBm.png' },
  { id: 2, url: 'https://i.imgur.com/i4edUYl.jpeg' },
  { id: 3, url: 'https://i.imgur.com/Kk9THZZ.jpeg' },
  { id: 4, url: 'https://i.imgur.com/U007pWn.jpeg' },
  { id: 5, url: 'https://i.imgur.com/tDfSdnq.jpeg' },
  { id: 6, url: 'https://i.imgur.com/FYKVYLS.jpeg' },
];

const cardData2: CardData[] = [
  { id: 1, url: 'https://i.imgur.com/MH3oIHV.png' },
  { id: 2, url: 'https://i.imgur.com/hb1NLgT.jpeg' },
  { id: 3, url: 'https://i.imgur.com/ukhLmNL.jpeg' },
  { id: 4, url: 'https://i.imgur.com/VuOHCUS.jpeg' },
  { id: 5, url: 'https://i.imgur.com/OE3jq1W.jpeg' },
  { id: 6, url: 'https://i.imgur.com/QJDveZQ.jpeg' },
];

const cardData3: CardData[] = [
  { id: 1, url: 'https://i.imgur.com/dbGXmGo.png' },
  { id: 2, url: 'https://i.imgur.com/lJwLfuI.jpeg' },
  { id: 3, url: 'https://i.imgur.com/BZhIxY7.jpeg' },
  { id: 4, url: 'https://i.imgur.com/yASn6Ab.jpeg' },
  { id: 5, url: 'https://i.imgur.com/q6be19v.jpeg' },
  { id: 6, url: 'https://i.imgur.com/90hPNgS.jpeg' },
];

const cardData4: CardData[] = [
  { id: 1, url: 'https://i.imgur.com/dbBl69X.png' },
  { id: 2, url: 'https://i.imgur.com/xIAWaMu.jpeg' },
  { id: 3, url: 'https://i.imgur.com/uziCi8z.jpeg' },
  { id: 4, url: 'https://i.imgur.com/AiY47Yn.jpeg' },
  { id: 5, url: 'https://i.imgur.com/20BkocC.jpeg' },
  { id: 6, url: 'https://i.imgur.com/O5tOKjR.jpeg' },
];

const cardData5: CardData[] = [
  { id: 1, url: 'https://i.imgur.com/74vhsMO.png' },
  { id: 2, url: 'https://i.imgur.com/McYLFn8.jpeg' },
  { id: 3, url: 'https://i.imgur.com/ucXabZj.jpeg' },
  { id: 4, url: 'https://i.imgur.com/uIfVIQT.jpeg' },
  { id: 5, url: 'https://i.imgur.com/J55a7d7.jpeg' },
  { id: 6, url: 'https://i.imgur.com/Oo2A7mT.jpeg' },
];

export function CampaignKeyVisualSwipeCards() {
  const [cards1, setCards1] = useState<CardData[]>(cardData1);
  const [cards2, setCards2] = useState<CardData[]>(cardData2);
  const [cards3, setCards3] = useState<CardData[]>(cardData3);
  const [cards4, setCards4] = useState<CardData[]>(cardData4);
  const [cards5, setCards5] = useState<CardData[]>(cardData5);

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
        {cards1.map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards1}
            isFront={index === 0}
            zIndex={cards1.length - index}
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
        {cards2.map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards2}
            isFront={index === 0}
            zIndex={cards2.length - index}
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
        {cards3.map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards3}
            isFront={index === 0}
            zIndex={cards3.length - index}
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
        {cards4.map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards4}
            isFront={index === 0}
            zIndex={cards4.length - index}
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
        {cards5.map((card, index) => (
          <CardLocal
            key={card.id}
            card={card}
            setCards={setCards5}
            isFront={index === 0}
            zIndex={cards5.length - index}
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
          Featured News
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
