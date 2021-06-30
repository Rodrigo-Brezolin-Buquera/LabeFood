import React, { useContext, useEffect } from 'react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import RestaurantTypeTabs from '../../components/RestaurantTypeTabs/RestaurantTypeTabs';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@material-ui/core';
import { ContainerRestaurantCards } from '../style-Pages/style-Pages';
import { GlobalStateContext } from "../../global/GlobalStateContext";
import { useHistory } from 'react-router-dom';
import { goToSearch } from '../../routes/coordinator';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ActiveOrder from '../../components/ActiveOrder/ActiveOrder';
import { getActiveOrders } from '../../services/order';

const HomePage = () => {
    const history = useHistory()
    const { states } = useContext(GlobalStateContext);

    const actOrder = states.activeOrder

    // console.log(actOrder)

    const order = () =>{
        if (actOrder !== null){
            return (
                <ActiveOrder 
                name={actOrder.restaurantName}
                price={actOrder.totalPrice}
                />
            )
        }
    }

    const restaurantsList = states.restaurants.map((restaurant) => {
        return (
            <RestaurantCard
                key={restaurant.id}
                name={restaurant.name}
                title={restaurant.title}
                deliveryTime={restaurant.deliveryTime}
                shipping={restaurant.shipping}
                logoUrl={restaurant.logoUrl}
                history={history} 
                id={restaurant.id}
            />
        );
    });


    return (
        <div>
            <Header title={'Ifuture'}/>
            <Box ml={2} mr={2}>
                <TextField
                    onClick={() => goToSearch(history)}
                    fullWidth
                    margin='normal'
                    placeholder="Busca"
                    id="search-input"
                    variant='outlined'
                    color="secondary"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="secondary" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box ml={1}>
                <RestaurantTypeTabs />
            </Box>


            <ContainerRestaurantCards>
                {restaurantsList}
            </ContainerRestaurantCards>
                {order()}
            <Footer history={history} />
        </div>

    );
};

export default HomePage;