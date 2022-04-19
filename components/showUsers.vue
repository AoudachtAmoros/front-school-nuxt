<template>
    <div class="w-full h-full flex flex-col py-2 relative px-2 xs:px-4 sm:px-8 md:px-16 xl:px-24">
         <ShowUser v-if="currentAction=='showUser'" :payload="currentUser" @close="close" @edit="edit($event)"/>
         <EditUser v-if="currentAction=='editUser'" :payload="currentUser" @close="close" @edited="edited($event)"/>
         <AddUser v-if="currentAction=='addUser'"  @close="close" @added="added($event)"/>
        <head class="p-2 rounded bg-gray-100 flex items-center justify-between mb-2">
           <div class="flex items-center">
                <div class="mr-4">
                  <input type="text" v-model="searchKey" class="bg-white py-2 px-3 rounded hover:border-blue-300 border focus:outline-none focus:border-blue-500">
                </div>
                <div>
                    <select v-model="searchBy" class="p-2 cursor-pointer focus:outline-none focus:border-blue-500">
                        <option v-for="(item, index) in searchByItems" :key="index" :value="item.value" class="p-2 hover:bg-gray-100">{{item.text}}</option>
                    </select>
                </div>
           </div>
           <div>
            <button @click="addUser()" class="px-2 py-1 bg-gray-300 opacity-80 hover:opacity-100">
                Add user
            </button>
           </div>
        </head>
        <div class="rounded bg-gray-100 mb-2 flex justify-between">
            <div class="flex-1 flex justify-start py-3">
                    <div class="sub-1 px-2">
                    <span class="">User</span>
                </div>
                <div class="sub-2">
                    <span>Parent ID</span>
                </div>
                <div class="sub-3">
                    <span>Students count</span>
                </div>
            </div>
            <div class="sub-4 py-3 text-center"><span>Actions</span></div>
        </div>
        <section class="flex-1 w-full h-full overflow-x-hidden overflow-y-auto">
            <div class="" v-if="fakeUsers.length>0">
                <div  v-for="(user,index) in fakeUsers" :key="index" class="flex justify-between rounded hover:bg-gray-50 bg-gray-100 py-1 mb-1">
                <div class="flex-1 flex justify-start">
                    <div class="sub-1 flex items-center items-center px-2">
                        <div class="image-profile mr-2">
                            <img :src="user.parentImage.src" alt="user image">
                        </div>
                        <div>
                            <span>{{user.parentName}}</span>
                        </div>
                    </div>
                    <div class="sub-2 flex items-center">
                        <span>{{user.parentID}}</span>
                    </div>
                    <div class="sub-3 flex items-center">
                        <span>{{user.studentsCount}}</span>
                    </div>
                </div>
                <div class="sub-4 flex items-center justify-center">
                    <span class="cursor-pointer hover:bg-gray-200 p-1 rounded" title="Details" @click="showUser(user)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="svg-blue h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    <span class="cursor-pointer hover:bg-gray-200 p-1 rounded" title="Edit" @click="edit(user)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="svg-gray h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </span>
                    <span class="cursor-pointer hover:bg-gray-200 p-1 rounded" title="Delete" @click="deleteUser(user)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="svg-red h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>       
                </div>
            </div>
            </div>
        </section>
         <footer class="mt-2 p-2 rounded bg-gray-100 flex items-center justify-between">
               <button @click="prev" class="bg-green-300 py-1 px-4 flex items-center text-white rounded opacity-80 hover:opacity-100">
                   <svg xmlns="http://www.w3.org/2000/svg" class="svg-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span class="p-1">Prev</span>
               </button>
         
               <button @click="next" class="bg-green-300 py-1 px-4 flex items-center text-white rounded opacity-80 hover:opacity-100">
                   <span class="p-1">Next</span>
                   <svg xmlns="http://www.w3.org/2000/svg" class="svg-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
               </button>
        </footer>
    </div>
</template>
<script>
import axios from 'axios'
import EditUser from './s-editUser.vue'
import AddUser from './s-addUser.vue'
import ShowUser from './showUser.vue'
export default {
    components:{
        ShowUser,
        AddUser,
        EditUser,
    },
  data () {
    return {
        users:[
            {
              parentID:'4434',
              parentName:'Goso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              email:'---',
              description :'',
              studentsCount:6,
              students :[
                  {
                      studentName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
                      
                  },
                  {
                      studentName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
                      
                  },
                  {
                      studentName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
                      
                  },
                  {
                      studentName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
                      
                  },
                  {
                      studentName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
                      
                  }
              ]
            },
            {
              parentID:'4434',
              parentName:'Hoso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Koso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Yoso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},

                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},

                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},

                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},

                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
                  }
            ]
            },
            {
              parentID:'4434',
              parentName:'Zoso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5,
                      image:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},

                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Goso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Foso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Roso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Goso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Soso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Coso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Qoso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Woso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Loso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Ioso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
            {
              parentID:'4434',
              parentName:'Goso FOSO',
              parentImage:{src:'https://cdn2.vectorstock.com/i/thumb-large/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg',alt:''},
              address :'Rue 443 ',
              phone : '06060606060',
              phoneSecondary : '06060606060',
              description :'',
              studentsCount:5,
              students :[
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  },
                  {
                      studentsName : 'atob btoa',
                      age : 8,
                      class :5
                  }
                  ]
            },
        ],
        fakeUsers:[],
        searchByItems:[
            {text:'ID',value:'parentID'},
            {text:'parentName',value:'parentName'},
            {text:'studentName',value:'studentName'}
        ],
        searchBy:'parentID',
        searchKey:'',
        currentAction :'',
        currentUser:null,
        baseUrl: this.$store.state.baseUrl,
    }
  },
  watch:{
      searchKey(val){
          if(val==''){
              this.fakeUsers = this.users 
          }else{
            switch(this.searchBy){
                case 'parentID':{
                    console.log('pid');
                    this.fakeUsers = this.users.filter(user=>{
                        if(user.parentID.includes(val)){
                            return user;   
                        }
                    })
                    break
                }
                case 'parentName':{
                    console.log('pn');
                    this.fakeUsers = this.users.filter(user=>{
                        if(user.parentName.includes(val)){
                            return user;   
                        }
                    })
                    break
                }
                case 'studentName':{
                    console.log('s');

                    this.fakeUsers = this.users.filter(user=>{
                        if(user.studentName.includes(val)){
                            return user;   
                        }
                    })
                    break
                }

            }
        }
      }
  },
  async mounted(){
     this.$emit('loading',true)
     this.fakeUsers = this.users 
        this.$emit('loading',false)

    //  await this.init()
  },
  methods:{
      async init(){
            try {
                let token = window.localStorage.getItem('x-auth-token')
                let response = await axios.get(`${this.baseUrl}/admin/parents`,{
                    headers: { authorization: `Bearer ${token}` }
                })
                console.log(response);
                this.users = response.data
                this.fakeUsers = this.users 
                this.loading=true

            } catch (error) {
                console.log(error);
                this.loading=false
                this.error = error
            }  
      },
      showUser(user){
          this.currentAction = 'showUser'
          this.currentUser = user
      },
      deleteUser(){

      },
      close(){
          this.currentAction = ''
          this.currentUser = null
      },
      addUser(){
          this.currentAction = 'addUser'
          this.currentUser = null
      },
      edit(user){
           this.currentAction = 'editUser'
           this.currentUser = user
      },
      edited(user){
          console.log(user);
      },
      added(user){
          console.log(user);
      },
      next(){

      },
      prev(){

      }
  
  }
}
</script>
<style scoped>
    .sub-1{
        width: 25%;
    }
    .sub-2{
        width: 20%;
    }
    .sub-3{
        width: 20%;
    }
    .sub-4{
        width: 20%;
    }
    .image-profile{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .image-profile img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

</style>