import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { updateCat } from '../../actions';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CardContent from '@material-ui/core/CardContent';
import { likeCat, deleteFavorite, voteCat, getCatScore } from '../../services/catService';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        16: 9,
    },
    avatar: {
        backgroundColor: red[500],
    },
    thumbsUp: {
        cursor: 'pointer',
        paddingRight: '20px',
    },
}));

const CatImage = ({ cat, updateCat }) => {
    
    const classes = useStyles();
    const [buttonText, setButtonText] = useState('favorite');
    const [score, setScore] = useState('');
    useEffect(()=>{
        (async()=>{
            const response = await getCatScore();
            setScore(response.data[0].value);
        })();
    },[])
    const handleFavoriteClick = async (cat) => {
        const response = await likeCat(cat);
        cat['favID'] = response.data.id;
        updateCat(cat);
    };
    const handleUnFavoriteClick = async (cat) => {
        await deleteFavorite(cat);
        cat.favID = undefined;
        updateCat(cat);
    };
    const handleThumbClick = async (cat, value) => {
        await voteCat(cat, value);
    };

    return (
        <Grid key={cat.id} item xs={3}>
            <Card key={cat.id} className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {cat.id.charAt(0)}
                        </Avatar>
                    }
                    title={cat.id}
                />
                <CardMedia className={classes.media} image={cat.url} title={cat.original_filename} />
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={(e) => {
                            buttonText === 'favorite' ? handleFavoriteClick(cat) : handleUnFavoriteClick(cat);
                            setButtonText(buttonText === 'favorite' ? 'unfavorite' : 'favorite');
                        }}
                    >
                        {buttonText}
                    </IconButton>
                        <ThumbUpIcon className={classes.thumbsUp} onClick={(e) => handleThumbClick(cat, 1)} />
                        <ThumbDownIcon className={classes.thumbsUp} onClick={(e) => handleThumbClick(cat, 0)} />
                </CardActions>
                <CardContent>score: {score}</CardContent>
                
            </Card>
        </Grid>
    );
};

export default connect(null, {
    updateCat: (...args) => updateCat(...args),
})(CatImage);
