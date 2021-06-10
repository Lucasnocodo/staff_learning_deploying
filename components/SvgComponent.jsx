import React, { useState, useEffect, useRef } from 'react';
import StaffImg from './StaffImg';
import SvgData from './SvgData';
import { Tooltip } from '@material-ui/core';
import { findSolfege } from '../constant/LetterNames';
import s from './StaffImg.module.css';

function SvgComponent({ curColor, getColorList, getReslut, isOnfinish, setIsOnfinish, svgName, colors, setColors }) {
  const [deviceWidth, setDeviceWidth] = useState(900);

  // get svg data form SvgData Function
  const { viewBox,  colorList, ansArea, blackPath, whitePath, ellipse } = SvgData(svgName)

  const leftOffset = deviceWidth / 2 - 457
  const findColorIndex = (color) => colorList.findIndex((co) => color === co)
  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b)
  const ref = useRef(null);

  useEffect(() => {
    getColorList(colorList)
  }, [colorList])

  useEffect(() => {
    setDeviceWidth(ref.current ? ref.current.offsetWidth : 900);
  }, [ref.current])

  useEffect(() => {
    if (isOnfinish) {
      let ansList = [];
      let colorAnsList = [];
      ansArea.forEach((e) => ansList.push(findSolfege(e.ans)))
      for (let col in colors) {
        colorAnsList.push(findColorIndex(colors[col]))
      }
      getReslut(equals(ansList, colorAnsList))
      setIsOnfinish(false)
    }
  }, [isOnfinish]);

  return (<div ref={ref}>
    {ansArea?.map((e) => (
      <StaffImg key={`${e.id}-${e.ans}`} note={e.ans} size={70} left={leftOffset + e.left} top={e.top} />
    ))}

    <svg height={720} viewBox={viewBox}>
      {ansArea?.map((ansGroup) => (
        ansGroup.pathGroup.map((path, i) => {
          return <path
            key={`color_${ansGroup.id}-${i}`}
            d={path}
            className={s.svgPart}
            onClick={() => setColors({ ...colors, [`${ansGroup.id}`]: curColor })}
            fill={colors[`${ansGroup.id}`] || '#fff'}
          />
        })
      ))}
      {ellipse?.map((e, i) => (
        <ellipse
          key={`ell_${i}`}
          transform={e.transform}
          cx={e.cx}
          cy={e.cy}
          rx={e.rx}
          ry={e.ry}
          fill="black"
        />
      ))}

      {whitePath?.map((path, i) => (
        <path
          key={`white_${i}`}
          d={path}
          fill="white"
        >
        </path>
      ))}

      {blackPath?.map((path, i) => (
        <path
          key={`black_${i}`}
          d={path}
          fill="black"
        />
      ))}

    </svg>
  </div>
  );
}

export default SvgComponent;
