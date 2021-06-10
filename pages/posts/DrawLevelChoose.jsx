import React from 'react'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import Image from 'next/image'
import Link from 'next/link'
import s from '../../components/layout.module.css'
import LevelList from '../../constant/LevelList'

const imgPath = '/images/draws/'

export async function getServerSideProps({ req }) {
  const allCookies = req.cookies
  return {
    props: {
      allCookies,
    },
  }
}

export default function DrawLevelChoose({ allCookies }) {
  const checkColor = (level) => {
    if (allCookies[level.nameValue]) {
      return '_colored'
    }
    return '_uncolor'
  }
  return (
    <Grid container alignItems="center" spacing={3}>
      {LevelList.map((level) => (
        <Grid item lg={3} md={4} sm={6} key={`${level.nameValue}`}>
          <Link href={`/Draws/${level.nameValue}`}>
            <Card className={s.card}>
              <Image
                src={`${imgPath}${level.nameValue}${checkColor(level)}.png`}
                width={500}
                height={400} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  這是關卡描述....
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      )
      )}
    </Grid>
  )
}
