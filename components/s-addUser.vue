<template>
<div class="fixed top-0 right-0 left-0 bottom-0 bg-shadow ">
      <div class="fixed top-0 right-0 left-0 bottom-0 bg-shadow " @click="close">
      </div>
      <!-- <SectionsImageScreen v-if="currentImage && imageScreen" :payload="currentImage"  @close="closeImageScreen"/> -->
      <div class="flex items-center justify-center h-full w-full"> 
        <div class="popup rounded relative bg-white  flex flex-col">
            <Loading v-if="loading"/>
            <header v-else class="flex items-center border-b py-1 px-2 justify-between">
                <span @click="close" class="text-yellow-300 p-1 cursor-pointer rounded hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                </span>
                <button class="py-2 px-4 rounded text-sm text-white bg-gray-600 opacity-80 hover:opacity-100" @click="submit()">
                    Submit
                </button>
            </header>
            <section class="flex-1 flex  overflow-y-auto">
                <div class="w-full sm:w-1/2 p-2 flex flex-col overflow-y-auto">
                    <div class="p-1 flex text-sm flex flex-col">
                        <label class="py-1">Parent image</label>
                        <input   type="file" @change="importImage($event,'parent')" >
                    </div>
                    <div class="p-1 flex text-sm flex flex-col">
                        <label class="py-1">Parent name</label>
                        <input type="text" class="w-full px-2 py-2 border rounded focus:outline-none hover:border-2 hover:border-blue-300 focus:border-2 focus:border-blue-300" v-model="form.parentName"/>
                    </div>
                    <div class="p-1 flex text-sm flex flex-col">
                        <label class="py-1">Parent id</label>
                        <input type="text" class="w-full px-2 py-2 border rounded focus:outline-none hover:border-2 hover:border-blue-300 focus:border-2 focus:border-blue-300" v-model="form.parentID"/>
                    </div>
                    <div class="p-1 flex text-sm flex flex-col">
                        <label class="py-1">Parent Address</label>
                        <input type="text" class="w-full px-2 py-2 border rounded focus:outline-none hover:border-2 hover:border-blue-300 focus:border-2 focus:border-blue-300" v-model="form.address"/>
                    </div>
                    <div class="p-1 flex text-sm flex flex-col">
                        <label class="py-1">Phone</label>
                        <input type="text" class="w-full px-2 py-2 border rounded focus:outline-none hover:border-2 hover:border-blue-300 focus:border-2 focus:border-blue-300" v-model="form.phone"/>
                    </div>
                    <div class="p-1 flex text-sm flex flex-col">
                        <label class="py-1">Phone Secondary</label>
                        <input type="text" class="w-full px-2 py-2 border rounded focus:outline-none hover:border-2 hover:border-blue-300 focus:border-2 focus:border-blue-300" v-model="form.phoneSecondary"/>
                    </div>
                </div>
                <div class="w-full sm:w-1/2 p-2 h-full flex flex-col  overflow-y-auto">
                        <div v-for="(student, index) in form.students" :key="index">
                            <div class="py-1 flex items-center justify-center">
                                   <h2 class="text-center mr-2">Student N-{{index+1}}</h2>
                                   <button class="p-1 rounded hover:bg-gray-200" v-if="index!=0" @click="form.students.splice(index,1)">
                                       <svg xmlns="http://www.w3.org/2000/svg" class="svg-red h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                   </button>
                            </div>
                             <div class="p-1 flex text-sm flex flex-col">
                                <label class="py-1">Student image</label>
                                <input   type="file" @change="importImage($event,'student',index)" accept="image/*">
                            </div> 
                             <div class="p-1 flex text-sm flex flex-col">
                                <label class="py-1">Student name</label>
                                <input type="text" class="w-full px-2 py-2 border rounded focus:outline-none hover:border-2 hover:border-blue-300 focus:border-2 focus:border-blue-300" v-model="student.name"/>
                            </div>
                             <div class="p-1 flex text-sm flex flex-col">
                                <label class="py-1">Student age</label>
                                <input type="text" class="w-full px-2 py-2 border rounded focus:outline-none hover:border-2 hover:border-blue-300 focus:border-2 focus:border-blue-300" v-model="student.age"/>
                            </div>
                             <div class="p-1 flex text-sm flex flex-col">
                                <label class="py-1">Student class</label>
                                <input type="text" class="w-full px-2 py-2 border rounded focus:outline-none hover:border-2 hover:border-blue-300 focus:border-2 focus:border-blue-300" v-model="student.class"/>
                            </div>
                            <div class="border-b-2  py-2" v-if="form.students.length>1"></div>
                        </div>
                        <div class="py-1 my-1 text-white ">
                            <button @click="addStudent" class="w-full bg-gray-500 px-2 py-2 rounded opacity-80 hover:opacity-100"> Add student</button>
                        </div>
                </div>
            </section>
        </div>
      </div>
  </div>
</template>
<script>
import Loading from './loading.vue'

export default {
    components:{
        Loading
    },

    data(){
        return{
            loading:false,
            form:{
                students:[
                    {
                        name:'',
                        age:'',
                        class:'',
                        image:''
                    }
                ]
            }
        }
    },
    mounted(){
        document.querySelector('body').classList.add('stop-scrolling')
    },
    methods:{
        close(){
            this.$emit('close')
        },
         async importImage(event,owner,index) {
             try {
                var image = await this.getBase64(event.target.files[0])
                console.log(image);
                switch(owner){
                     case 'parent':{
                         this.form.parentImage = image
                         break
                     }
                     case 'student':{
                         this.form.students[index].image = image
                         console.log(this.form);
                         break
                     }
                 }
             } catch (error) {
                console.log(error);    
             }
        },
        addStudent(){
            this.form.students.push({
                name:'',
                age:'',
                class:'',
                image:''
            })
        },
        async submit(){
            try {
                this.loading=true
                // this.$emit('edit',this.payload)
                
            } catch (error) {
                console.log(error);
            }

        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
    },
    beforeDestroy(){
        document.querySelector('body').classList.remove('stop-scrolling')
    }

}
</script>
<style scoped>
.image{
    height: 200px;
}
.image img{
    object-fit: contain;
    height: 100%;
    width: 100%;
}
.popup{
  z-index: 100;
  width:85vw;
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