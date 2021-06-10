import React, { useState, useEffect } from 'react'
import { Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@material-ui/core'
import SvgComponent from '../../components/SvgComponent'
import { SolfegeList } from '../../constant/LetterNames'
import s from '../../components/layout.module.css'
import Swal from 'sweetalert2'
import getAllPostIds from '../../lib/posts'
import Link from 'next/link'
import Cookies from 'js-cookie'

export async function getStaticProps({ params }) {
  const postData = params
  return {
    props: {
      postData,
    },
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}


export default function DrawGame({ postData }) {
  const [curRadioValue, setRadioValue] = useState(-2)
  const [curColor, setCurColor] = useState('#fff')
  const [result, setResult] = useState(false)
  const [isOnfinish, setIsOnfinish] = useState(false)
  const [init, setInit] = useState(true)
  const [curColorList, setCurColorList] = useState([])
  const [colors, setColors] = useState({})
  const getColorList = (list) => {
    setCurColorList(list)
  }
  const handleChange = (event) => {
    setRadioValue(+event.target.value)
  }

  useEffect(() => {
    setCurColor(curColorList[curRadioValue])
  }, [curRadioValue])

  const getReslut = (res) => {
    return setResult(res)
  }

  const onFinish = () => {
    setIsOnfinish(true)
  }

  useEffect(() => {
    if (!init) {
      if (result) {
        Swal.fire('太棒了!', '', 'success')
        Cookies.set(postData.id, true, { path: '/' })
      } else {
        Swal.fire({
          title: '再找找有沒有錯誤的地方唷!',
          imageUrl: '/images/alert/oopsFace.png',
          imageWidth: '80',
          imageHeight: '80',
        })
      }
    } else {
      setInit(false)
    }
  }, [result, isOnfinish])

  return (
    <Grid container alignItems="center" className={s.level_layout}>
      <Grid item xs={10} className={s.level_img}>
        <SvgComponent
          curColor={curColor}
          getColorList={getColorList}
          getReslut={getReslut}
          isOnfinish={isOnfinish}
          setIsOnfinish={setIsOnfinish}
          svgName={postData.id}
          colors={colors}
          setColors={setColors}
        />
      </Grid>
      <Grid item xs={2}>
        <Link href='/posts/DrawLevelChoose'>
          <Button variant="contained" color="primary" className={s.center}>
            選擇關卡
          </Button>
        </Link>
        <Grid container alignItems="center" style={{ margin: '20px' }}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">選擇唱名</FormLabel>
              <RadioGroup aria-label="position" name="position" defaultValue="top">
                {SolfegeList.map((name, i) => (
                  <FormControlLabel
                    key={`${name}`}
                    value={i}
                    control={
                      <Radio
                        style={{ color: `${curColorList[i]}` }}
                        onChange={handleChange}
                        checked={curRadioValue === i}
                      />
                    }
                    label={name}
                    labelPlacement="left"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => onFinish()} variant="contained" color="primary" className={s.center}>
              畫完了
          </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
