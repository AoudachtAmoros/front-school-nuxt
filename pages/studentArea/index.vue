<template>
    <div class="overflow-x-hidden" style="height: calc(100vh - 76px);">
        <div v-if="!isLogged" class="w-full h-full bg-black flex items-center justify-center">
            <div class="pop-up bg-gray-200 p-4 shadow rounded">
                     <h2 class="text-2xl w-full text-center py-2 my-2">Login</h2>
                    <div class="flex flex-col py-2">
                        <span class="text-sm p-1 text-gray-600"> password</span>
                        <input type="text" v-model="password" class="bg-white w-full p-2 rounded border text-sm text-gray-600">
                    </div>
                    <div class="my-2 justify-center my-2 py-2 flex items-center">
                        <button class="py-2 px-4 rounded bg-green-300 text-white hover:opacity-80" @click="checkPass">Send</button>
                    </div>
            </div>
        </div>
        <div v-else class="w-full h-full flex gap-3 bg-gray-300 p-6">
            <div v-if="users.length==0" class="h-full w-full flex items-center justify-center">
                <div class="flex flex-col items-center">
                    <span class="neoning bg-red-300 mx-4 "></span>
                <h1 class="text-center font-bold w-full text-3xl py-3 px-2 ">Waiting for your father</h1>
                </div>
            </div>
            <div v-else class="xs:px-2 sm:px-8 md:px-8 h-full w-full justify-around flex gap-2">
                <div class="relative w-2/3 h-full flex flex-col items-center justify-center">
                    <span class="absolute top-4 left-4 z-10 neoning bg-green-300 mx-4"></span>
                    <div class="absolute top-0 left-2 right-2 bottom-0 slider-container">
                        <div v-for="(user, index) in students" :key="index" class="w-full h-full" v-show="currentIndex==index">
                            <transition name="slide-fade">
                                <div  class="w-full h-full" v-show="currentIndex==index">
                                    <div class="absolute bottom-2 right-2 left-2 text-center z-10 opacity-70 p-2 bg-gray-200">
                                    <span class="text-2xl z-10 text-gray-700 opacity-100 z-20 text-2xl">{{user.first_name}} {{user.s_last_name}}</span>
                                    </div>
                                    <ImageC :data="{src:user.image}" /> 
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="w-1/3 overflow-x-hidden overflow-y-auto bg-gray-400 p-2">
                    <div class="flex items-center bg-gray-300 m-1 p-2 rounded">
                        <span>
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="32px" height="32px" viewBox="0 0 64.000000 64.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                    fill="#000000" stroke="none">
                                    <path d="M235 610 c-3 -5 -32 -10 -64 -10 -31 0 -62 -5 -69 -12 -17 -17 -17
                                    -539 0 -556 17 -17 419 -17 436 0 17 17 17 539 0 556 -7 7 -38 12 -69 12 -32
                                    0 -61 5 -64 10 -3 6 -42 10 -85 10 -43 0 -82 -4 -85 -10z m155 -40 l0 -30 -70
                                    0 -70 0 0 30 0 30 70 0 70 0 0 -30z m-160 -10 c0 -17 -7 -20 -40 -20 l-40 0 0
                                    -230 0 -230 170 0 170 0 0 230 0 230 -40 0 c-33 0 -40 3 -40 20 0 18 7 20 60
                                    20 l60 0 0 -270 0 -270 -210 0 -210 0 0 270 0 270 60 0 c53 0 60 -2 60 -20z
                                    m245 -250 l0 -215 -155 0 -155 0 -3 205 c-1 112 0 210 3 217 3 11 39 13 157
                                    11 l153 -3 0 -215z"/>
                                    <path d="M275 570 c3 -5 24 -10 45 -10 21 0 42 5 45 10 4 6 -13 10 -45 10 -32
                                    0 -49 -4 -45 -10z"/>
                                    <path d="M255 470 c-14 -15 -21 -17 -32 -9 -20 18 -29 1 -10 -18 16 -16 19
                                    -16 44 9 15 15 25 30 22 33 -3 3 -14 -4 -24 -15z"/>
                                    <path d="M320 480 c0 -6 27 -10 60 -10 33 0 60 4 60 10 0 6 -27 10 -60 10 -33
                                    0 -60 -4 -60 -10z"/>
                                    <path d="M320 440 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                                    0 -30 -4 -30 -10z"/>
                                    <path d="M255 370 c-14 -15 -21 -17 -32 -9 -20 18 -29 1 -10 -18 16 -16 19
                                    -16 44 9 15 15 25 30 22 33 -3 3 -14 -4 -24 -15z"/>
                                    <path d="M320 380 c0 -5 24 -10 54 -10 30 0 58 5 61 10 4 6 -17 10 -54 10 -34
                                    0 -61 -4 -61 -10z"/>
                                    <path d="M320 340 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                                    0 -30 -4 -30 -10z"/>
                                    <path d="M260 275 c-9 -11 -22 -14 -39 -10 -25 6 -25 6 -6 -15 l19 -21 25 25
                                    c14 14 22 28 19 31 -3 3 -11 -2 -18 -10z"/>
                                    <path d="M320 280 c0 -5 24 -10 54 -10 30 0 58 5 61 10 4 6 -17 10 -54 10 -34
                                    0 -61 -4 -61 -10z"/>
                                    <path d="M320 240 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                                    0 -30 -4 -30 -10z"/>
                                    <path d="M250 175 c-8 -10 -21 -13 -34 -9 -21 7 -21 6 -2 -15 l19 -21 24 22
                                    c13 12 23 25 23 30 0 13 -17 9 -30 -7z"/>
                                    <path d="M348 183 c17 -2 47 -2 65 0 17 2 3 4 -33 4 -36 0 -50 -2 -32 -4z"/>
                                    <path d="M320 140 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                                    0 -30 -4 -30 -10z"/>
                                    </g>
                        </svg>
                        </span>
                       <h1 class="ml-2 text-xl">Waiting List</h1><br>
                    </div>
                    <div class=" grid grid-cols-2 gap-2 overflow-y-auto overflow-x-hidden">
                        <div class="w-full flex flex-col hover:border-2 border-red-300 items-center p-2 m-1 bg-gray-500 rounded" v-for="(user, index) in students" :key="index">
                                <div class="pb-2">
                                    <h4 class="text-xl text-white">{{user.first_name}} {{user.s_last_name}}</h4>
                                </div>
                                <div class="img-container w-full rounded">
                                    <ImageC :data="{src:user.image}" class="rounded" />  
                                </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ImageC from '../../components/ImageC.vue'

export default {
  props: {
  },
    components:{
        ImageC
    },
  data () {
    return {
        isLogged : true,
        password : '',
        area : null,
        state : 1,
        currentIndex:0,
        paylod:{
            parentImage:'',
            studentImage:'',
            parentNane:'',
            studentName:'',
        },
        users :[
                {
                    id_parent: 2,
                    first_name :'user 2',
                    last_name :'opp',
                    students :[
                        {
                            first_name :'student',
                            last_name :'opp',
                            image :'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202010/stockvault-aditi101613_1200x768.jpeg?NBIdyM9PsSUa99u81YzWwgr87PGI1lfF&size=770:433',
                        }
                    ]
                        
                },
                {
                    id_parent: 1,
                    first_name :'user 1',
                    last_name :'ls',
                    students :[
                        {
                        first_name :'student',
                        last_name :'ls',
                        image :'http://www.leroussillon.ac.ma/wp-content/uploads/2018/08/photo-enfant11-768x520.jpg',
                        }
                    ]
                },
        ],
        user : {
             id_parent: 1,
              first_name :'user 1',
              last_name :'ls',
              students :[
                  {
                      first_name :'student',
                      last_name :'ls',
                      image :  'http://www.leroussillon.ac.ma/wp-content/uploads/2018/08/photo-enfant11-768x520.jpg',
                  }
              ]
                    
            },
    }
    },
    created(){
    },
    async mounted(){
       await this.initSockets()
    },
    methods:{
        async initSockets() {
            this.socket = this.$nuxtSocket({
                // nuxt-socket-io opts:
                name: "chat", // Use socket "home"
                // channel: '/index', // connect to '/index'
                // socket.io-client opts:
                // reconnection: false
            });
            this.init()
        },
        init(){
            let area = window.localStorage.getItem('area')
            if (area) {
                this.area = area
            }else{
                let area = Date.now()
                window.localStorage.setItem('area',area)
                this.area = area
            }
            console.log('studentArea');
            this.socket.emit('studentArea',{area:this.area})
            this.socket.on('firstScan',(data)=>{
                this.add(data)
            })
            this.socket.on('secondScan',(data)=>{
                this.del(data)
            })
        
            setInterval(() => {
                this.moveSlider()
            }, 4000);
        },
        moveSlider(){
            if (this.users.length>0) {
                if (this.currentIndex < this.users.length ) {
                    this.currentIndex +=1
                }
                if (this.currentIndex == this.users.length) {
                    this.currentIndex = 0
                }
            }
        },
        add(data){
            if (data.status == 200) {
                console.log('---',data.data.students);
                this.users.push(data.data)
            }
        },
        del(data){
            if (data.status == 200) {
                let index =-1
                for (let i = 0; i < this.users.length; i++) {
                    if (data.data.id_parent==this.users[i].id_parent) {
                        index = i  
                    }
                }
                if (index >= 0) {
                    this.users.splice(index, 1)
                    if (index>0 && this.currentIndex >= index ) {
                      this.currentIndex -=1   
                    }
                }
            }
        }
    },
    computed:{
        students(){
            let all = []
            for (let index = 0; index < this.users.length; index++) {
               all =  all.concat(this.users[index].students)
            }
            return all
        }
    }
}
</script>
<style scoped>
.img-container{
    height:160px;
}
.slider-container{
    /* height: ; */
}
.neoning{
    height: 40px;
    width: 40px;
    border-radius:50%;
    animation: neoning-bounce 1s ease infinite;
}
@keyframes neoning-bounce {
  0% { opacity: 1 }
  25% { opacity: .5; }
  50% { opacity: 0; }
  75% { opacity: .5;}
  100% { opacity: 1;}
}
/*  */
    .slide-fade-enter-active {
	    opacity: .7;
	    transition: all .7s cubic-bezier(.79,.13,.07,.93);
	}
	.slide-fade-leave-active {
	    opacity: .7;
	    transition: all .7s cubic-bezier(.79,.13,.07,.93);
	}
	.slide-fade-enter {
	    transform: translateX(20px);
	    opacity: 0;
	}

	.slide-fade-leave-to {
	    transform: translateX(-20px);
	    opacity: 0;
	}

.pop-up {
  width: 35vw;
}
.rotate--90 {
  transform: rotate(-90deg);
}
.bg-primary {
  background: rgb(19, 41, 59);
}
@media (max-width: 992px) {
  .pop-up {
    width: 45vw;
  }
}
@media (max-width: 768px) {
  .pop-up {
    width: 50vw;
  }
}
@media (max-width: 640px) {
  .pop-up {
    width: 60vw;
  }
}
@media (max-width: 500px) {
  .pop-up {
    width: 70vw;
  }
}
@media (max-width: 425px) {
  .pop-up {
    width: 80vw;
  }
}
</style>