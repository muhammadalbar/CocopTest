import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper,} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
    },
    paper: {
        marginLeft: '15%',
        marginTop: '20px',
        backgroundColor: '#f8d5a3',
        height: '300px',
        width: '80%',
        borderRadius: '15px',
        '&:hover': {
        //   background: "#fffcf3",
        //   transition: '1.5s',
          boxShadow: '10px 10px 15px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        },
    },
    search: {
        length: '100%'
    },
    name: {
        textTransform: 'capitalize',
        fontWeight: 'bold' 

    },
    pokepic: {
        widht: '100px',
        height: '120px'
    },
    specific: {
        marginTop: '30px'
    }
    
  }));

const DetailPokemon =()=>{
    const classes = useStyles();

    const [items, setItems] = useState([])


    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=964`)
        .then(res => {
            const items = res.data.results
            const specificItems = Array.from(items,x=>x.url)
            Promise.all(specificItems.map(y => axios.get(y))).then(responses => {
                
                setItems(responses)
                console.log(responses)
            })
        })
    },[])

    const changeId = () => {
        var id = []
        for(var i = 0; i < 963; i++){
            id.push(i)
            
        }
        return id
    };
    console.log(changeId())
    
    const [value, setValue] = React.useState([0]);

    const handleChange = (event) => {
        setValue(event.target.value);
      };
    

    return (
        <div>
            <Grid container>
                <Grid xs={12} md={12}>
                    <h1>Pokedex App</h1>
                </Grid>

                
                {items.map(items => (
                    <Grid xs={12} md={2} direction='column' >
                    
                        <Paper className={classes.paper}>
                            <img className={classes.pokepic} src={items.data.sprites.front_default}></img>
                            <p className={classes.name}>{items.data.name}</p>
                            <p className={classes.specific}>Ability: {items.data.abilities[0].ability.name}</p>
                            <p className={classes.specific}>Type: {items.data.types[0].type.name}</p>
                            
                        </Paper>
                    
                    </Grid>
                ))}
            </Grid>
            
        </div>
    )
}

export default DetailPokemon