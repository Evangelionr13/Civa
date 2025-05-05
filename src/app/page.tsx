"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Confetti from "react-confetti";
import "./post.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeBoxProps {
  value: number;
  label: string;
}

export default function Home() {
  const [isSurprise, setIsSurprise] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const heartIdRef = useRef(0);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const birthday = new Date("2025-05-05T00:00:00");
      const now = new Date();
      const difference = birthday.getTime() - now.getTime();

      if (difference <= 0) {
        setIsButtonDisabled(false);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const newHeart = { id: heartIdRef.current++, x, y };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
      }, 2000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-animated flex flex-col items-center justify-center">
      <Head>
        <title>Surprise for My Love! 🥰💖</title>
      </Head>

      {isSurprise && <Confetti recycle={false} numberOfPieces={500} />}

      <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-8 animate-bounce">
        Happy Birthday My Love! 🎉
      </h1>

      <button
        onClick={() => setIsSurprise(true)}
        disabled={isButtonDisabled}
        className={`px-8 py-3 rounded-full mb-8 text-lg font-bold transition-all duration-300 ${
          isButtonDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xl hover:scale-105"
        }`}
      >
        💝 click here for you babyy 🎁
      </button>

      {isSurprise && (
        <div className="animate-fadeIn max-w-2xl bg-white p-8 rounded-lg shadow-lg text-center relative">
          <p className="text-xl mb-4">💌 Dear Civa</p>
          <p className="mb-4">
            Happy Birthday, my love. Thank you for being the most amazing part
            of my life. Every day with you is full of laughter, warmth, and
            love — and I wouldn&apos;t trade that for anything in the world. You make
            me a better person just by being you, and I&apos;m so grateful to have
            you by my side.
            <br />
            <br />
            On your special day, I hope you feel as loved as you truly are. May
            this year bring you endless happiness, success in everything you do,
            and moments that take your breath away. I&apos;ll be right here, loving
            you more every single day.
            <br />
            <br />
            Happy Birthday again, my heart. You mean everything to me. <br /> I&apos;m still
            waiting for your kiss. 🥰🎁
            <br />
            <span className="text-2xl">💗 💞</span>
          </p>

          <Image
            src="/images/cute.JPG"
            width={200}
            height={200}
            alt="Our Memory"
            className="rounded-xl shadow-lg border-4 border-pink-300 mx-auto mb-4"
          />

          {/* ใส่หัวใจลอยเบื้องหลัง */}
          <div className="relative">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="absolute heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 180}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              ></div>
            ))}
          </div>

          <audio
            controls
            autoPlay={isSurprise}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            src="/happy (1).mp3"
          />
          {isPlaying && (
            <p className="text-green-500 mt-2">🎶 Now Playing...</p>
          )}
        </div>
      )}

      {!isSurprise && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl mb-4">🎂 Countdown To a Special Birthday!</h2>
          <div className="flex gap-4 justify-center">
            <TimeBox value={timeLeft.days} label="day" />
            <TimeBox value={timeLeft.hours} label="hour" />
            <TimeBox value={timeLeft.minutes} label="minute" />
            <TimeBox value={timeLeft.seconds} label="second" />
          </div>
        </div>
      )}

      {/* Floating hearts when click */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed text-pink-500 text-3xl animate-floatHeart pointer-events-none"
          style={{
            left: heart.x,
            top: heart.y,
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
}

const TimeBox: React.FC<TimeBoxProps> = ({ value, label }) => (
  <div className="bg-white p-4 rounded-lg shadow-md w-20">
    <div className="text-2xl font-bold text-rose-600">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);
