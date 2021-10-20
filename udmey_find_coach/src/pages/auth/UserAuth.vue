<template>
    <div>
        <base-dialog :show="!!error" title="發生一些錯誤" @close="handleError"></base-dialog>
        <base-dialog :show="isLoading" title="認證中,請稍後" fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>

            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model.trim="email">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password">
                </div>

                <p v-if="!formIsValid">請輸入正確的電子信箱和密碼(必須最少六的字)</p>
                <base-button>{{submitButtonCaption}}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
            </form>
        </base-card>
    </div>
</template>


<script>
export default {
    data(){
        return {
            email:'',
            password:'',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null,
        }
    },
    computed:{
        submitButtonCaption(){
            if(this.mode ==="login"){
                return 'Login'
            } else{
                return 'Signup'
            }
        },
        switchModeButtonCaption(){
            if(this.mode=== 'login'){
                return 'Signup instead';
            } else{
                return 'Login instead';
            }
        }
    },
    methods:{
        async submitForm(){
            if( this.email === "" || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false;
                return;
            }

            const actionPayload = {
                email: this.email,
                password: this.password
            }
            this.isLoading = true;
            // 送出 request 給server

            try{
                if(this.mode ==='login'){
                    await this.$store.dispatch('login',actionPayload)
                } else{
                    await this.$store.dispatch('signup',actionPayload) 
                }
                
                // console.log(this.$route.query.redirect)
                const redirectUrl = '/'+ (this.$route.query.redirect || 'coaches');
                console.log(redirectUrl)
                // 導到首頁
                this.$router.replace(redirectUrl)

            } catch(err) {
                this.error = err.message || '授權失敗,請稍後嘗試'
            }

           this.isLoading = false;

        },

        switchAuthMode(){
            if (this.mode === "login"){
                this.mode = 'signup';
            }else{
                this.mode = "login";
            }
        },

        handleError(){
            this.error = null
        }
    }
}
</script>

<style scoped>
form {

  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>