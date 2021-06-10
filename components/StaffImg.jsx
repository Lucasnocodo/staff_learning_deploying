import React from 'react';
import Image from 'next/image';
import s from './StaffImg.module.css';
import { findSolfege } from '../constant/LetterNames';

export default function StaffImg({ note, size = 30, left, top }) {
  const base = -52
  const gap = size / 10
  const cell = size / 70 * 3
  const positionList = [
    `${base + gap * 2}`, `${base + cell + gap}`, `${base + gap}`, `${base + cell}`, `${base}`, `${base - gap * 1 + cell}`, `${base - gap * 1}`
  ];
  const notePosition = positionList[findSolfege(note)];

  return (
    <div style={{ left, top }} className={s.layout}>
      <Image
        src="/images/high_staff.png"
        width={size}
        height={size}
      />
      <div style={{ position: 'relative', left: '20px', top: `${notePosition}px` }}>
        <Image
          src="/images/full_note.png"
          width={size / 2}
          height={size / 2}
        />
        {note === "Do" ? <div className={s.line} /> : null}
      </div>
    </div>
  );
}
