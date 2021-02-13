import { createStore } from 'vuex'
import axios from "axios";

const maxRatingsPerPurchase = 2;

export const store = createStore({
    state(){
        return {
            user: JSON.parse(localStorage.getItem('user')),
            ratingsLeft(currentRatings){
                return maxRatingsPerPurchase - currentRatings;
            },
            logInUser(token){
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                this.changeLoggedInUser();
            },
            async logoutUser(){
                await axios.post('/api/auth/logout').then(res => {
                    console.log(res.data);
                }).catch(error => {
                    console.log(error.response);
                }).finally(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user')
                    this.user = null;
                    axios.defaults.headers.common['Authorization'] = '';
                });
            },
            changeLoggedInUser(){
                if(localStorage.getItem('token') !== null){
                    axios.post('/api/auth/loggedInUser',{
                        token: localStorage.getItem('token')
                    })
                        .then(res => {
                            localStorage.setItem('user', JSON.stringify(res.data));
                            this.user = res.data;
                        })
                        .catch(() => {
                            this.logoutUser();
                        });
                }
            }
        }
    }
});