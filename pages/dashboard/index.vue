<template>
    <div class="flex relative h-full w-full">
        <Loading v-if="loading"/>
        <div v-else class="h-full w-full flex">
            <aside  v-if="isLogged" class="aside overflow-x-hidden overflow-y-auto h-full">
                <ul class="w-full">
                    <li class="w-full py-3 pr-6 pl-2 flex items-center justify-between text-white font-semiBold hover:opacity-80 hover:text-yellow-400 text-left  hover:bg-gray-100">
                        <div class="flex items-center"> 
                            <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="36px" height="36px" viewBox="0 0 64.000000 64.000000"
                                preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                fill="#fff" stroke="none">
                                <path d="M225 603 c-65 -24 -110 -56 -145 -105 -108 -149 -59 -360 104 -446
                                44 -23 63 -27 136 -27 73 0 92 4 136 27 103 54 159 148 159 268 0 85 -21 142
                                -74 203 -71 81 -213 117 -316 80z m210 -51 c47 -24 96 -73 120 -121 33 -66 29
                                -184 -8 -235 -14 -19 -15 -18 -51 9 -51 39 -101 54 -176 54 -75 0 -125 -15
                                -176 -54 -35 -27 -37 -27 -51 -10 -73 101 -16 292 106 355 69 36 170 36 236 2z"/>
                                <path d="M275 531 c-45 -20 -70 -60 -70 -112 0 -42 5 -53 33 -81 28 -28 39
                                -33 82 -33 43 0 54 5 82 33 28 28 33 39 33 82 0 42 -5 54 -31 81 -33 33 -92
                                46 -129 30z"/>
                                </g>
                            </svg>
                            <span class="text-cyan-900 px-2">{{user.firstName}} {{user.lastName}}</span>
                        </div>
                        <div>
                        </div>
                    </li>
                    <li v-for="(item,index) in routes" :key="index" @click="to(item.action)"  class="w-full cursor-pointer py-3 pr-6 pl-2 flex items-center text-white font-semiBold hover:opacity-80 hover:text-yellow-400 text-left hover:bg-gray-100">
                        <img  :src="item.icon" alt="icon">  
                        <span class="text-cyan-900 px-2">{{item.text}}</span>
                    </li>
                </ul>
            </aside>
            <main v-if="isLogged" class="flex-1 h-full" style="height:calc(100vh - 80px)">
                <ShowUsers @loading="loading=$event"/>
                <ShowUser v-if="currentAction=='showUser'"/>
                <AddUser v-if="currentAction=='addUser'"/>
                <EditUser v-if="currentAction=='editUser'"/>
            </main>
            <div v-if="!isLogged" class="w-full h-full flex items-center justify-center">
                <div v-if="currentAction==''" class="flex flex-col">
                    <div v-if="isSavedUser && tmpUser" @click="toSavedUser()" class="box text-center saved-user py-2 my-2 px-4 bg-white rounded-md shadow-md border cursor-pointer hover:bg-blue-100 ">
                            <h2 class="text-xl text-cyan-900 font-semibold">Login with </h2>
                            <span class="text-cyan-900">{{tmpUser.nom}} {{tmpUser.prenom}}</span>
                    </div>              
                    <div @click="to('login')" class="box py-2 my-2 px-4 bg-white rounded-md shadow-md border cursor-pointer hover:bg-blue-100 ">
                            <h2 class="text-xl text-center text-cyan-900 font-semibold">Login</h2>
                    </div>              
                    <div @click="to('register')" class="box py-2 my-2 px-4 bg-white rounded-md shadow-md border cursor-pointer hover:bg-blue-100 ">
                            <h2 class="text-xl text-center text-cyan-900 font-semibold">Register</h2>
                    </div>  
                </div>
                <Login v-if="currentAction=='login'" @close="to('')" @loggedIn="loggedIn($event)"/>
                <Register v-if="currentAction=='register'" @close="to('')" @valid="valid($event)"/>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

import ShowUsers from '../../components/showUsers.vue'
import ShowUser from '../../components/showUser.vue'
import AddUser from '../../components/s-addUser.vue'
import EditUser from '../../components/s-editUser.vue'
import Register from '../../components/register.vue'
import Login from '../../components/signin.vue'
import Loading from '../../components/loading.vue'
export default {
    components:{
        Register,
        Login,
        Loading,
        ShowUsers,
        ShowUser,
        AddUser,
        EditUser
    },
    
    data () {
        return {
            loading:true,
            user : null,
            tmpUser : null,
            isLogged : false,
            isSavedUser :false,
            routes:[
                {text:'Users',action:'showUsers',icon:'data:image/png;base64,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'},
            ],
            currentAction:"",
            baseUrl : this.$store.state.baseUrl

        }
    },
    async mounted(){
        this.loading=false 
        this.init()
    },
    methods:{
        async init(){
            let token = window.localStorage.getItem('x-auth-token')
            try {
                if(token){
                    let response = await axios.get(`${this.baseUrl}/me`,{
                        headers: { authorization: `Bearer ${token}` }
                    })
                    console.log(response);
                    // get saved user from back end
                    this.tmpUser = response.data.data
                    this.isSavedUser = true
                    this.loading=false 
                }else{
                    console.log('no token');
                    this.tmpUser = null
                    this.isSavedUser = false
                    this.loading=false  
                }
                
            } catch (error) {
                console.log(error);
                this.isSavedUser = false
                this.loading=false 
            }
        },
        toSavedUser(){
            this.user = this.tmpUser
            this.tmpUser =null
            this.isLogged = true
            this.currentAction='showUsers'
        },
        to(action){
            this.currentAction=action
        },
        async loggedIn(user){
            this.user = user
            this.isLogged = true
            this.currentAction='showUsers'
        }
    }
}
</script>
<style scoped>
.full-on-dash{
    padding-right: 2px;
    padding-left: 2px;
}
.aside{
    position: sticky;
    top: 76px;
    z-index: 10;
    width: 280px;
    height: calc(100vh - 76px);
    background: #171821;
}
.header{
    min-height: 60px;
}
.box{
    width: 250px;
    transform: translateZ(0);
    backface-visibility: hidden;
    transition: all .2s ease;
    display: table;
    -webkit-font-smoothing: subpixel-antialiased;
}
.box:hover{
    transform: scale(1.02);
}
.saved-user:hover span{
    color: rgb(39, 144, 185);
    text-decoration: underline;
}

</style>