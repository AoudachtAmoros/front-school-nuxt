<template>
  <main  class="flex items-center justify-around w-full" style="height:calc(100vh - 80px)">
    <div class="pop-up w-2/5 bg-gray-700 rounded shadow-md relative transition ease-in-out delay-6050" :class="{'border-2 border-red-300':(firstScan.error)}">
         <Loading v-if="loading1" style="min-height: 350px; background: white" />
        <div v-if="!firstScan.state && !loading1" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl py-1 text-center text-gray-100 w-full">First Scan</h1>
                <h3 class="text-gray-100 text-sm py-2 w-full">Enter the RFID to inform your son that his father is here</h3>


            </header>
            <section class="w-full px-4 py-4 flex flex-col">
                <div class="my-1 w-full">
                <label class="text-sm text-gray-100" for="">RFID</label>
                <input
                    placeholder="RFID"
                    type="text"
                    v-model="form1.RFID"
                    class="
                    w-full
                    rounded
                    border
                    border-gray-600
                    py-2
                    px-2
                    bg-gray-600
                    text-gray-100
                    text-sm
                    focus:border-2 focus:outline-none
                    "
                :class="{'border-2 border-red-300':(firstScan.error)}"

                />
                </div>
            </section>
            <footer
                class="px-4 py-2 w-full border-t flex items-center justify-center"
            >
                <button
                @click="submit1"
                class="
                    py-2
                    px-4
                    bg-primary
                    text-white
                    opacity-80
                    hover:opacity-100
                    rounded
                    shadow
                "
                :class="{'border-2 border-red-300':(firstScan.error)}"
                >
                Submit
                </button>
            </footer>
        </div>
        <div v-if="firstScan.state && !loading1" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-100 w-full">Parent Area</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <h2 class="py-2 text-2xl text-gray-600"> Get your son </h2>
            </section>
        </div>
        <div v-if="firstScan.error" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full ">
                <h1 class="text-xl text-center text-gray-700 w-full">Error</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <h2 class="py-2 text-center text-xl text-red-300"> {{firstScan.error}} </h2>
            </section>
        </div>
    </div>
    <!-- second scan -->
    <div class="pop-up w-2/5 bg-gray-700 rounded shadow-md relative transition ease-in-out delay-250"  :class="{'border-2 border-red-300':(secondScan.error)}">
         <Loading v-if="loading2" style="min-height: 350px; background: white" />
        <div v-if="!secondScan.state && !loading2" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-100 w-full">Second Scan</h1>
                <h3 class="text-gray-100 text-sm py-2 w-full">Make sure you have already done with the first scan</h3>

            </header>
            <section class="w-full px-4 py-4 flex flex-col">
                <div class="my-1 w-full">
                <label class="text-sm text-gray-100" for="">RFID</label>
                <input
                    placeholder="RFID"
                    type="text"
                    v-model="form2.RFID"
                    class="
                    w-full
                    rounded
                    border
                    border-gray-600
                    py-2
                    px-2
                    bg-gray-600
                    text-gray-100
                    text-sm
                    focus:border-2 focus:outline-none
                    "
                    :class="{'border-2 border-red-300':(secondScan.error)}"
                />
                </div>
            </section>
            <footer
                class="px-4 py-2 w-full border-t flex items-center justify-center"
            >
                <button
                @click="submit2"
                class="
                    py-2
                    px-4
                    bg-primary
                    text-white
                    opacity-80
                    hover:opacity-100
                    rounded
                    shadow
                "
                :class="{'border-2 border-red-300':(secondScan.error)}"
                >
                Submit
                </button>
            </footer>
        </div>
        <div v-if="secondScan.state && !loading2" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-100 w-full">Parent Area</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <h2 class="py-2 text-2xl text-gray-600"> Thanks </h2>
            </section>
        </div>
        <div v-if="secondScan.error && !loading2" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-100 w-full">Error</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <h2 class="py-2 text-xl text-gray-600"> {{secondScan.error}} </h2>
            </section>
        </div>
    </div>
</main>
</template>
<script>
import Loading from "../../components/loading.vue";
// import axios from "axios";
export default {
    components: {
        Loading,
    },
    data() {
        return {
            area :null,
            loading1: false,
            loading2: false,
            firstScan:{
              state : false,
              user:null,
              error:null
            },
            secondScan:{
              state : false,
              user:null,
              error:null
            },
            form1: {
                RFID: "",
            },
            form2: {
                RFID: "",
            },
            user :null,
            error: null,
            baseUrl: this.$store.state.baseUrl,
            socket : null,
            step :'waiting',
            scanned1 : false,
            scanned2: false
        };
    },
    created(){
    },
    async mounted() {
        this.initSockets()
    },
  methods: {
     async initSockets() {
      this.socket = this.$nuxtSocket({
        // nuxt-socket-io opts:
        name: "chat", // Use socket "home"
        // channel: '/index', // connect to '/index'
        // socket.io-client opts:
        // reconnection: false
      });
        document.querySelector("body").classList.add("stop-scrolling");
        let area = window.localStorage.getItem('area')
        if (area) {
            this.area = area
        }else{
            let area = Date.now()
            window.localStorage.setItem('area',area)
            this.area = area
        }
      // connection
        this.socket.emit('parentArea',{area:this.area})

        this.socket.on('firstScan',(data)=>{
            this.firstScanM(data)
        })
        this.socket.on('secondScan',(data)=>{
            this.secondScanM(data)
        })
    },
    async submit1() {
      if (this.form1.RFID.length<3 || !this.isNumeric(this.form1.RFID)) {
        this.firstScan.error = "Id must be more than 3 digit"
          this.toast("warning", "Id must be more than 3 digit")
        setTimeout(() => {
              this.firstScan.error = null
        }, 5000);
      }else{
        this.socket.emit('firstScan',{RFID:this.form1.RFID,area:this.area})
        this.firstScan.user = null
        this.loading1 = true
        this.scanned2 = true
        setTimeout(() => {
          if(!this.scanned2){
            this.loading2 = false
            this.firstScan.error = '500 ops server down'
          this.toast("warning", '500 ops server down')
            setTimeout(() => {
                  this.firstScan.error =null
            }, 5000);
          }
        }, 4000);
      }
      this.form1.RFID =''
    },
    async submit2() {
      if (this.form2.RFID.length<3 || !this.isNumeric(this.form1.RFID)) {
        this.secondScan.error = "Id must be more than 3 digit"
          this.toast("warning", "Id must be more than 3 digit")
          setTimeout(() => {
              this.secondScan.error = null
        }, 5000);
      }else{
        this.socket.emit('secondScan',{RFID:this.form2.RFID,area:this.area})
        this.secondScan.user = null
        this.loading2 = true
        this.scanned1 = true
        setTimeout(() => {
          if(!this.scanned1){
            this.loading1 = false
            this.firstScan.error = '500 ops server down'
          this.toast("warning", '500 ops server down')
            setTimeout(() => {
                  this.firstScan.error =null
            }, 5000);
          }
        }, 4000);
      }
      this.form1.RFID =''

    },
    firstScanM(data){
      this.loading1 = false
      this.scanned1 = false
      if(data.status==200){
          this.firstScan.state = true
          this.firstScan.user = data.data
          setTimeout(() => {
              this.firstScan.state = false
              this.firstScan.user = null
          }, 5000);
        }else{
          this.firstScan.error = data.error
          this.toast("warning", response.data.message)

          setTimeout(() => {
                this.firstScan.error =null
          }, 5000);
      }
    },
    secondScanM(data){
        this.loading2 = false
        this.scanned2 = false
        if(data.status==200){
            this.secondScan.state = true
            this.secondScan.user = data.response
            setTimeout(() => {
                this.secondScan.state = false
                this.secondScan.user = null
            }, 5000);
        }else{
            this.secondScan.error = data.error
          this.toast("warning", response.data.message)
            setTimeout(() => {
                  this.secondScan.error =null
            }, 5000);
        }
    },
     isNumeric(num){
      return !isNaN(num)
    },
    close() {
      this.$emit("close");
    },
         toast(type, message){
          this.$toast(message, {
          position: "top-right",
          timeout: 2500,
          transition :'Vue-Toastification__bounce',
          closeButton: "button",
          icon: true,
          type: type
      });
      }
  },
  beforeDestroy() {
    document.querySelector("body").classList.remove("stop-scrolling");
  },
};
</script>
<style>

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
.pop-up {
  width: 35vw;
  opacity: .95;
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
