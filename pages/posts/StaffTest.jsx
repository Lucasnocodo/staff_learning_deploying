import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Switch, Select,
  MenuItem, Slider
} from '@material-ui/core';
import Image from 'next/image';
import utilStyles from '../../styles/utils.module.css';
import NotationList, { SolfegeList } from '../../constant/LetterNames';
import { HighMode, LowMode, MixMode } from '../../constant/Playmode';
import Sound from 'react-sound';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }
const highBase = 315;
const lowBase = 194;
const lineBase = 22;
const gap = 48;
const randomRange = 7;
// render note hiegt position arrary
const hightPosition = NotationList.map((_, i) => (i % 2 === 0
  ? `${highBase - gap * Math.round(i / 2)}px`
  : `${highBase - lineBase - gap * (Math.round(i / 2) - 1)}px`));

const lowPosition = NotationList.map((_, i) => (i % 2 === 0
  ? `${lowBase - gap * Math.round(i / 2)}px`
  : `${lowBase - lineBase - gap * (Math.round(i / 2) - 1)}px`));
export default function StaffTest() {
  const [answer, setAnswer] = useState(-1);
  const [curRadioValue, setRadioValue] = useState(-2);
  const [score, setScore] = useState(0);
  const [errorScore, setErrorScore] = useState(0);
  const [init, setInit] = useState(true);
  const [check, setCheck] = useState(false);
  const [curNum, setCurNum] = useState(false);
  const [isSolfege, setIsSolfege] = useState(true);
  const [mode, setMode] = useState(HighMode);
  const [curList, setList] = useState(SolfegeList);
  const [curPosition, setPosition] = useState(hightPosition);
  const [volume, setVolume] = useState(30);

  console.log(`answer`, answer)

  const getRandom = useCallback((x) => {
    let num = Math.floor(Math.random() * x);
    if (num === curNum) {
      num = getRandom(randomRange);
    } else setCurNum(num);
    return num;
  }, [curNum]);

  const getRandomName = useCallback(() => {
    setAnswer(getRandom(randomRange));
  }, [getRandom]);

  useEffect(() => {
    if (init) {
      getRandomName();
      setInit(false);
    }
  }, [getRandomName, init]);

  useEffect(() => {
    if (isSolfege) {
      setList(SolfegeList);
    } else setList(NotationList);
  }, [isSolfege]);

  useEffect(() => {
    if (mode === HighMode) {
      setPosition(hightPosition);
    } else if (mode === LowMode) {
      setPosition(lowPosition);
    } else if (mode === MixMode) {
      // TODO set thrid mode
      setPosition(lowPosition);
    }
  }, [mode]);

  // score counting
  useEffect(() => {
    if (check) {
      if (curRadioValue === answer) {
        setScore(score + 1);
        getRandomName();
      } else setErrorScore(errorScore + 1);
      setCheck(false);
    }
  }, [check, answer, errorScore, getRandomName, score, curRadioValue]);

  const handleChange = (event) => {
    setRadioValue(+event.target.value);
    setCheck(true);
  };
  const handleSignChange = (event) => {
    setMode(+event.target.value);
    getRandomName();
  };
  const handleSwitchChange = () => {
    setIsSolfege(!isSolfege);
    getRandomName();
  };
  const needLine = answer === 0 && mode === HighMode;

  const renderSign = () => {
    // TODO set thrid mode
    if (mode === HighMode) {
      return <div className={utilStyles.highSign}>
        <Image
          src="/images/high_note.png"
          alt="high_staff"
          width={200}
          height={400}
        />
      </div>
    } else if (mode === LowMode) {
      return <div className={utilStyles.lowSign}>
        <Image
          src="/images/low_note.png"
          alt="low_staff"
          width={120}
          height={140}
        />
      </div>
    } else {
      return <div className={utilStyles.highSign}>
        <Image
          src="/images/high_note.png"
          alt="high_staff"
          width={200}
          height={400}
        />
      </div>
    }
  }

  return (
    <>
      <Grid
        container
        alignContent="flex-end"
        justify="center"
        spacing={3}
        className={utilStyles.control}
      >
        <Grid item xs={10} className={utilStyles.staff}>
          {renderSign()}
          <div style={{ position: 'absolute', top: `${curPosition[answer]}`, left: '550px' }}>
            <Image
              src="/images/full_note.png"
              alt="full_note"
              width={130}
              height={120}
            />
            {needLine ? <div className={utilStyles.line} /> : null}
          </div>
          {SolfegeList.map((name, i) => {
            if (answer === i) {
              return (
                <Sound
                  key={name}
                  url={`/sound/${name}.wav`}
                  playStatus={Sound.status.PLAYING}
                  volume={volume}
                />
              );
            } return undefined;
          })}
        </Grid>

        <Grid item xs={2}>
          <Grid container spacing={2} direction="column" >
            <Grid item>
              <Select
                value={mode}
                // className={classes.selector}
                onChange={handleSignChange}
              >
                <MenuItem value={HighMode}>高音譜</MenuItem>
                <MenuItem value={LowMode}>低音譜</MenuItem>
                <MenuItem value={MixMode}>混合模式</MenuItem>
              </Select>
            </Grid>

            <Grid item>
              <VolumeUp />
            </Grid>
            <Grid item style={{ height: '100px' }}>
              <Slider
                color="secondary"
                value={volume}
                orientation="vertical"
                onChange={(e, newValue) => setVolume(newValue)}
                aria-labelledby="vertical-slider"
              />
            </Grid>
            <Grid item>
              <VolumeDown />

            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{isSolfege ? '選擇唱名' : '選擇音名'}</FormLabel>
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
              {curList.map((name, i) => (
                <FormControlLabel
                  key={`${name}`}
                  value={i}
                  control={<Radio color="primary" onChange={handleChange} checked={curRadioValue === i} />}
                  label={name}
                  labelPlacement="bottom"
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <span>
            分數：{score}
          </span>
        </Grid>
        <Grid item xs={3}>
          <span>
            答錯題數：{errorScore}
          </span>
        </Grid>
        <Grid item xs={3}>
          <span>音名</span>
          <Switch
            checked={isSolfege}
            name="isSolfege"
            onChange={handleSwitchChange}
            color="primary"
          />
          <span>唱名</span>
        </Grid>
      </Grid>
    </>
  );
}
