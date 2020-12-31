<template>
  <div class="home">
    <nav><button @click="change">invitation</button></nav>
    <div v-if="active" class="modale-container">
      <div class="overlay overlay-modale"></div>
      <div class="modale">
        <div class="modale-header">
          <h1>Invitation</h1>
          <div @click="change" class="close">
            <font-awesome-icon :icon="['fas', 'times']" size="2x" />
          </div>
        </div>
        <hr />
        <form @submit.prevent="sendInvitation">
          <div class="modale-main">
            <label class="label" for="email">Adresse email</label>
            <!-- <input
              :class="isActive && 'is-changing'"
              @change="writing"
              class="input"
              type="email"
              v-model="email"
              id="email"
              multiple
              placeholder="lorem.ipsum@example, ..."
            /> -->
            <textarea
              id="email"
              cols="30"
              rows="10"
              :class="isActive && 'is-changing'"
              @change="writing"
              class="input"
              type="email"
              v-model="email"
              placeholder="lorem.ipsum@example, ..."
            ></textarea>
            <div class="count" v-if="isActive">
              Total <span>{{ count }}</span> email<span v-if="count > 1"
                >s</span
              >
            </div>
          </div>
          <div class="modale-footer">
            <button :class="isActive && 'is-active'">envoyer invitation</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="success" class="modale-container">
      <div class="overlay"></div>
      <div class="message success">
        <div class="close times" @click="close">
          <font-awesome-icon :icon="['fas', 'times']" size="1x" />
        </div>
        <p>
          Vous avez invité {{ count }} personne<span v-if="count > 1">s</span>
        </p>
        <!-- <div class="cancel">Annuler</div> -->
      </div>
    </div>
    <div v-if="warning" class="modale-container">
      <div class="overlay"></div>
      <div class="message warning">
        <div class="close times" @click="close">
          <font-awesome-icon :icon="['fas', 'times']" size="1x" />
        </div>
        <p>Merci de remplir tout les champs!</p>
      </div>
    </div>
    <div v-if="badFormat" class="modale-container">
      <div class="overlay"></div>
      <div class="message warning">
        <div class="close times" @click="close">
          <font-awesome-icon :icon="['fas', 'times']" size="1x" />
        </div>
        <p>L'email doit respecter ce formation test@test.com!</p>
      </div>
    </div>
    <div v-if="error" class="modale-container">
      <div class="overlay"></div>
      <div class="message error">
        <div class="close times" @click="close">
          <font-awesome-icon :icon="['fas', 'times']" size="1x" />
        </div>
        <p>Vos invitations n'ont pas été envoyés!</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Invitation",
  data() {
    return {
      active: false,
      count: null,
      email: null,
      isActive: false,
      success: false,
      error: false,
      warning: false,
      badFormat: false,
    };
  },
  methods: {
    //MODALE
    change() {
      this.active = !this.active;
    },
    //WRITING INPUT
    writing() {
      var count = 0;
      var mail = this.email;
      var emails = mail.split(",");
      var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
      emails.forEach((email) => {
        if (expressionReguliere.test(email)) {
          count += 1;
          console.log("result", count);
        }
      });
      this.count = count;
      if (this.count > 0) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
    //SEND INVITATION
    async sendInvitation() {
      if (!this.email) {
        this.warning = !this.warning;
      } else {
        var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

        var mail = this.email;
        var emails = mail.split(",");

        emails.forEach((email) => {
          if (!expressionReguliere.test(email)) {
            console.log("tu ne passera pas");
            this.badFormat = true;
          }
        });

        if (this.badFormat == false) {
          try {
            const apiRes = await axios.post(
              process.env.VUE_APP_BACKEND_URL + "/",
              {
                mail,
              }
            );
            this.email = null;
            this.isActive = false;
            this.success = true;
            console.log(apiRes);
          } catch (Err) {
            console.error(Err);
            this.error = true;
          }
        }
      }
    },
    //CLOSE MESSAGE
    close() {
      this.badFormat = false;
      this.error = false;
      this.success = false;
      this.warning = false;
    },
  },
};
</script>
<style>
hr {
  background: rgb(114, 127, 165);
}

h1 {
  color: ghostwhite;
  font-size: 20px;
}

.modale-container {
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  text-align: left;
  top: 0;
}

.overlay {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
}

.overlay-modale {
  background: rgb(28, 46, 98);
}

.modale {
  background: rgb(77, 93, 135);
  border-radius: 20px;
  color: black;
  position: fixed;
  top: 10%;
}

.modale-header {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px 30px;
}

.close {
  color: rgb(205, 206, 224);
  cursor: pointer;
}

.modale-main {
  color: rgb(169, 176, 200);
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
}

.input {
  height: 100px;
  margin: 10px 0;
  padding: 15px;
  resize: none;
}

.is-changing {
  outline: 1px solid rgb(244, 141, 97);
}

.modale-footer {
  align-items: center;
  background: rgb(126, 140, 172);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 25px 30px;
}

button {
  background: rgb(225, 226, 239);
  border-radius: 5px;
  color: rgb(149, 153, 192);
  padding: 15px 20px;
  text-transform: uppercase;
}

button:hover {
  background: rgb(241, 104, 44);
  color: whitesmoke;
}

button.is-active {
  background: rgb(241, 104, 44);
  color: whitesmoke;
}

.message {
  border-radius: 10px;
  bottom: 10%;
  color: whitesmoke;
  font-size: 16px;
  padding: 0 15px 15px;
  position: fixed;
  width: 250px;
}

.success {
  background: rgb(48, 224, 162);
  color: rgb(34, 155, 88);
}

.warning {
  background: coral;
  color: rgb(128, 57, 32);
}

.error {
  background: red;
  color: rgb(46, 7, 7);
}

.times {
  position: absolute;
  right: 10px;
  top: 10px;
}

@media screen and (min-width: 500px) {
  .modale {
    width: 500px;
  }
}
@media screen and (max-width: 500px) {
  .modale {
    width: 100%;
  }
}
</style>