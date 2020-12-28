<template>
  <div class="w-full">
    <h1 class="text-4xl text-blue-900 font-bold">Account Details</h1>
    <form class="w-full sm:w-4/5 md:w-3/5" @submit.prevent="saveProfile">
      <div class="mb-4">
        <div
            class="w-24 h-24 cursor-pointer rounded-full relative avatar"
            @click="$refs.file.click()"
        >
          <span
            class="absolute w-8 h-8 rounded-full bg-blue-600 border-2 object-center p-1 border-white z-10 edit-icon"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          </span>
          <!-- Hidden img for preview -->
          <img
            class="h-full min-w-full rounded-full object-cover absolute z-0"
            id="preview"
          >
            <!-- Show if user has profile img -->
          <img v-if="user.photoURL"
            :src="user.photoURL"
            alt="Avatar"
            class="h-full w-full rounded-full object-cover"
            >
            <!-- Show if user has display name -->
          <div v-else-if="user.displayName"
            class="text-white uppercase text-4xl p-3 rounded-full bg-blue-600 w-full h-full flex items-center justify-center"
          >
              {{ user.displayName[0] }}
          </div>
          <!-- Show if they don't have any of the above -->
          <div v-else
            class="text-white uppercase text-4xl p-3 rounded-full bg-blue-600 w-full h-full flex items-center justify-center"
          >
            {{ user.email[0] }}
          </div>
        </div>
      </div>
      <input
        type="file"
        @change="chooseFile"
        class="hidden"
        ref="file"
      >
      <div class="mb-4">
        <label class="block mb-2 text-gray-800 text-sm" for="name">Name</label>
        <input
          class="border w-full px-2 py-2 rounded-md"
          type="text"
          id="name"
          v-model="displayName"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-2 text-gray-800 text-sm" for="email"
          >Email</label
        >
        <input
          class="border w-full px-2 py-2 rounded-md"
          type="text"
          id="email"
          v-model="email"
        />
      </div>
      <button
        :class="{disabled: wait}"
        class="inline-block text-md text-white bg-blue-600 hover:bg-blue-800 mt-6 px-5 py-2 rounded-full"
        :disabled="wait"
      >
        Save Changes
      </button>
      <br>
        <!-- Removing testing UI -->
        <!-- <button @click="seeUser">See user info in console (dev)</button> -->
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapActions } from 'vuex'
import UserDrafts from '~/components/user/UserDrafts.vue'

var previewFile = '';

export default {
  data() {
    return {
      displayName: '',
      email: '',
      photoURL: '',
      imgURL: '',
      file: '',
      show: false,
      wait: false
    }
  },
  computed: {
    ...mapGetters({ user: 'user'}),
  },
  components: {
    UserDrafts,
  },
  mounted() {
    this.displayName = this.user.displayName
    this.email = this.user.email
    this.photoURL = this.user.photoURL
  },
  methods: {
    ...mapActions(['updateUserName', 'updateUserEmail', 'updatePhotoURL']),
    chooseFile(event) {
      var reader = new FileReader()
      reader.onload = function(e) {
        let output = document.getElementById('preview');
        output.src = reader.result;
      }
      // Show preview thumbnail
      if(event.target.files[0]) {
        window.file = event.target.files[0]
        reader.readAsDataURL(file)
        previewFile = file
      }
    },
    async uploadFile() {
      if (previewFile !== '') {
        var user = firebase.auth().currentUser;
        // Set firebase placement
        var uploadSpot = firebase.storage().ref('users/' + user.uid + '/profilePic/' + 'avatar.jpg' )

        // Upload firebase
        var uploadPic = await uploadSpot.put(file)

        // Get back firebase url
        var downloadURL = await uploadPic.ref.getDownloadURL()

        this.photoURL = downloadURL
        // Updating profile pic
        this.updatePhotoURL(this.photoURL)

        // Sending to store
        // this.$store.dispatch('profilePic', this.photoURL)

        // Set previewfile to empty
        previewFile = ''
      }
    },
    async saveProfile() {
      // Start loader and deactivate button
      this.startLoading()
      // Upload preview file
      await this.uploadFile()
      // Update profile name
      this.updateUserName(this.displayName)
      // Update email
      this.updateUserEmail(this.email)
      // Stop load and activate button
      this.finishEdit()
    },
    startLoading() {
      this.$nuxt.$loading.start()
      this.wait = true
    },
    finishEdit() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
        this.wait = false
      }, 1000)
    },
    seeUser () {
      var user = firebase.auth().currentUser;

      if (user != null) {
        user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.draft {
  height: 24rem;
}
.avatar {
  .edit-icon {
    bottom: -2px;
    right: -2px;
  }
  &:hover {
    .edit-icon {
      border-color: #2c5282;
    }
  }
}
.disabled {
  background: #ccc;
  cursor: default;
}
</style>
