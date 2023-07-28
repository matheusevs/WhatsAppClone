import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export class Firebase {

    constructor(){

        // Coloque a configuração do seu firebase aqui 
        this._config = {
            apiKey: "",
            authDomain: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: "",
            measurementId: ""
        };
        this.init();
    
    }

    init(){

        if(!window._initializedFirebase){

            firebase.initializeApp(this._config);
            window._initializedFirebase = true;
            firebase.firestore().settings({})

        }

    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result => {

                let user  = result.user;
                let token = result.credential.accessToken;

                s({
                    user, 
                    token
                });

            }).catch(error => {

                f(error);

            })

        });
    }

}