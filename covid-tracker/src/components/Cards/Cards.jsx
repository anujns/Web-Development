import React from 'react';
import { Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames'; // for each Grid css.

import styles from './Cards.module.css';

const Cards = ({data : { confirmed, recovered, deaths, lastUpdate}}) => {
    // console.log("confirmed: ", confirmed)

    if(!confirmed){
        return 'Loading...';
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center" >
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed.value} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="textSecondory">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body">Number of Active Cases</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={recovered.value} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="textSecondory">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body">Number of Recoveries</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths.value} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="textSecondory">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body">Number of Deaths</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;