<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <form
          name="tab-tracker-form"
          aoutcomplete="off">
          <v-text-field
            label="Email"
            v-model="email"
          ></v-text-field>
          <br>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            aoutcomplete="new-password"
          ></v-text-field>
        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register">
          Register
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        // const response = await AuthenticationService.register({
        // 登録処理のresponseを貰ってisUserLoggedInをtrueにすることが出来なかったため、
        // 登録処理後、ログイン処理を実行することで対応した。
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
