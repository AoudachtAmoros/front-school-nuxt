<template>
    <div class="pop-up bg-white rounded shadow-md">
        <footer class="px-4 py-2 w-full border-b">
              <h1 class="text-xl text-center text-gray-700 w-full">Register</h1>
        </footer>
        <section class="w-full px-4 py-2 flex flex-col">
            <div class="my-1 w-full">
              <label class="text-sm text-gray-700" for="">First name</label>
              <input type="text" v-model="form.firstName" class="w-full rounded border py-2 px-2 bg-gray-50 text-sm focus:border-2 focus:outline-none">
            </div>     
            <div class="my-1 w-full">
                <label class="text-sm text-gray-700" for="">Last name</label>
                <input type="text" v-model="form.lastName" class="w-full rounded border py-2 px-2 bg-gray-50 text-sm focus:border-2 focus:outline-none">
            </div>     
            <div class="my-1 w-full">
                <label class="text-sm text-gray-700" for="">Email</label>
                <input type="text" v-model="form.email" class="w-full rounded border py-2 px-2 bg-gray-50 text-sm focus:border-2 focus:outline-none">
            </div>     
            <div class="my-1 w-full">
                <label class="text-sm text-gray-700" for="">Password</label>
                <input type="password" v-model="form.password" class="w-full rounded border py-2 px-2 bg-gray-50 text-sm focus:border-2 focus:outline-none">
            </div>     
            <div class="my-1 w-full">
                <label class="text-sm text-gray-700" for="">Confirm password</label>
                <input type="password" v-model="form.confirmPassword" class="w-full rounded border py-2 px-2 bg-gray-50 text-sm focus:border-2 focus:outline-none">
            </div>  
        </section>   
        <footer class="px-4 py-2 w-full border-t flex items-center justify-between">
                <button @click="close" class="py-2 px-4 bg-primary text-white opacity-80 hover:opacity-100 rounded shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate--90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                    </svg>
                </button>
           
                <button @click="submit" class="py-2 px-4 bg-primary text-white opacity-80 hover:opacity-100 rounded shadow">
                    submit
                </button>
        </footer>
    </div>
</template>
<script>
export default {
  data () {
    return {
        form:{
            firstName :'',
            lastName :'',
            email:'',
            password:'',
            confirmPassword:'',
            role:''
        }
    }
  },
    mounted(){
       
    },
    methods:{
        submit(){

        },
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style>
 .pop-up{
     width: 30vw;
 }
 .rotate--90{
     transform: rotate(-90deg);
 }
 .bg-primary{
     background: rgb(19, 41, 59);
 }
 @media (max-width:992px) {
     .pop-up{
     width: 40vw;
 } 
 }
 @media (max-width:768px) {
     .pop-up{
     width: 50vw;
 } 
 }
 @media (max-width:640px) {
     .pop-up{
     width: 60vw;
 } 
 }
 @media (max-width:500px) {
     .pop-up{
     width: 70vw;
 } 
 }
 @media (max-width:425px) {
     .pop-up{
     width: 80vw;
 } 
 }
</style>