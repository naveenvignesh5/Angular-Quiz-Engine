// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyDbDYGveCgtVETdygB3s1CeXLIFafunWKk",
    authDomain: "jec-quiz-app.firebaseapp.com",
    databaseURL: "https://jec-quiz-app.firebaseio.com",
    projectId: "jec-quiz-app",
    storageBucket: "jec-quiz-app.appspot.com",
    messagingSenderId: "229540004321"
  },
  testDuration: 60 * 60 * 1,
};
