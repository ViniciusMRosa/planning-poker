import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/custom.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { faHandSparkles } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

library.add(faTrashAlt);
library.add(faCircle);
library.add(faSpinner);
library.add(faCodeBranch);
library.add(faUndo);
library.add(faPlayCircle);
library.add(faHourglassEnd);
library.add(faHandSparkles);
library.add(faEye);
library.add(faCogs);

Vue.component("font-awesome-icon", FontAwesomeIcon);

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const fb = firebase;
const sessionsCollection = fb.firestore().collection("sessions");

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

export { fb, sessionsCollection };
