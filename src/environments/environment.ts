// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDTO6BaUf-tyVszsWxtxtcB8mwjOTD1zyw',
    authDomain: 'ng5-ml1307.firebaseapp.com',
    databaseURL: 'https://ng5-ml1307.firebaseio.com',
    projectId: 'ng5-ml1307',
    storageBucket: 'ng5-ml1307.appspot.com',
    messagingSenderId: '399672056074'
  },
  googleSearchConfig : {
    apiKey: 'AIzaSyAt1k2kewjglCuyw9ikD6NF_UD9JfA4DCU',
    cx: '004287087866899583493:olritvv2h9i'
  },
  timeSpans : [
      { 'span': 'd1', 'sort': 'date:d' },
      { 'span': 'w1', 'sort': 'date:a' },
      { 'span': 'm1', 'sort': 'date:a' },
      { 'span': 'm6', 'sort': 'date:a' },
      { 'span': 'y1', 'sort': 'date:a' },
      { 'span': 'y10', 'sort': 'date:a' }
  ]
};
