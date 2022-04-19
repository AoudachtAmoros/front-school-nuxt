<template>
<div class="fixed top-0 right-0 left-0 bottom-0 bg-shadow ">
      <div class="fixed top-0 right-0 left-0 bottom-0 bg-shadow " @click="close">
      </div>
      <!-- <SectionsImageScreen v-if="currentImage && imageScreen" :payload="currentImage"  @close="closeImageScreen"/> -->
      <div class="flex items-center justify-center h-full w-full"> 
        <div class="popup rounded relative bg-white  flex flex-col">
            <header class="flex items-center border-b py-1 px-2 justify-between">
                <span @click="close" class="text-yellow-300 p-1 cursor-pointer rounded hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                </span>
                <button class="py-2 px-4 rounded text-sm text-white bg-gray-600 opacity-80 hover:opacity-100" @click="toEdit()">
                    Edit
                </button>
            </header>
            <section class="flex-1 flex overflow-y-auto flex-col sm:flex-row">
                <div class="w-full sm:w-1/2 p-2 flex flex-col">
                    <div class="image mb-2">
                        <img :src="payload.parentImage.src" alt="user image">
                    </div>
                    <div class="p-1 flex text-sm flex">
                        <span class="w-1/2 mr-2">Parent name</span>
                        <span class="font-bold text-right">{{payload.parentName}}</span>
                    </div>
                    <div class="p-1 flex text-sm flex">
                        <span class="w-1/2 mr-2">Parent id</span>
                        <span class="font-bold text-right">{{payload.parentID}}</span>
                    </div>
                    <div class="p-1 flex text-sm flex">
                        <span class="w-1/2 mr-2">Parent Address</span>
                        <span class="font-bold text-right">{{payload.address}}</span>
                    </div>
                    <div class="p-1 flex text-sm flex">
                        <span class="w-1/2 mr-2">Phone</span>
                        <span class="font-bold text-right">{{payload.phone}}</span>
                    </div>
                    <div class="p-1 flex text-sm flex">
                        <span class="w-1/2 mr-2">Email</span>
                        <span class="font-bold text-right">{{payload.email}}</span>
                    </div>
                    <div class="p-1 flex text-sm flex">
                        <span class="w-1/2 mr-2">Phone Secondary</span>
                        <span class="font-bold text-right">{{payload.phoneSecondary}}</span>
                    </div>
                    <div class="p-1 flex text-sm flex">
                        <span class="w-1/2 mr-2">Students count</span>
                        <span class="font-bold text-right">{{payload.studentsCount}}</span>
                    </div>
                </div>
                <div class="w-full sm:w-1/2 p-2 h-full">
                    <div class="flex flex-col overflow-y-auto h-full">
                        <div v-for="(student, index) in payload.students" :key="index" class="flex flex-col sm:flex-row">
                            <div class="image mb-2 w-1/2">
                               <img :src="student.image.src" alt="student image">
                            </div> 
                            <div class="w-1/2 flex flex-col ">
                                <div class="p-1 flex text-sm flex">
                                    <span class="w-1/2 mr-2">Student name</span>
                                    <span class="font-bold text-right">{{student.studentName}}</span>
                                </div>
                                <div class="p-1 flex text-sm flex">
                                    <span class="w-1/2 mr-2">Student age</span>
                                    <span class="font-bold text-right">{{student.age}}</span>
                                </div>
                                <div class="p-1 flex text-sm flex">
                                    <span class="w-1/2 mr-2">Student class</span>
                                    <span class="font-bold text-right">{{student.class}}</span>
                                </div>
                            </div>
                            <div v-if="payload.students.length>1" class="border-b py-1"></div>
                         </div>
                    </div>
                </div>
            </section>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    props:[
        'payload'
    ],
    data(){
        return{

        }
    },
    mounted(){
        console.log(this.payload);
        document.querySelector('body').classList.add('stop-scrolling')
    },
    methods:{
        close(){
            this.$emit('close')
        },
        toEdit(){
            this.$emit('edit',this.payload)
        }
    },
    beforeDestroy(){
        document.querySelector('body').classList.remove('stop-scrolling')
    }

}
</script>
<style scoped>
.image{
    height: 150px;
}
.image img{
    object-fit: contain;
    height: 100%;
    width: 100%;
}
.popup{
  z-index: 100;
  width:75vw;
  height:75vh;
}
.profile-image{
  width: 30px;
  height: 30px;
}
/* close icon */
.close-icon {
  background-color: #000000d8;
  height: 32px;
  width: 32px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.close-icon .bar {
  height: 3px;
  width: 17px;
  position: absolute;
  background-color:#ffffff;
}
.close-icon .bar:first-child {
  transform: rotate(45deg);
}
.close-icon .bar:last-child {
  transform: rotate(-45deg);
}
.bg-shadow{
  background-color: rgba(0, 0, 0, 0.897);
  backdrop-filter: blur(5px);
  z-index: 50;
}
.stop-scrolling {
  height: 100%;
  overflow: hidden;
}
@media (max-width:640px) {
  .popup{
    width: 80vw;
  }

}
@media (max-width:425px) {
  .popup{
    width: 100vw;
  }

}
</style>
// 37312527