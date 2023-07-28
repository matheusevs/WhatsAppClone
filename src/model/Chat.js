import { Firebase } from "../util/Firebase";
import { Model } from "./Model";

export class Chat extends Model {

    constructor(){

        super();

    }

    get users(){
        return this._data.users;
    }

    set users(value){
        this._data.users = value;
    }

    get timeStamp(){
        return this._data.timeStamp;
    }

    set timeStamp(value){
        this._data.timeStamp = value;
    }

    static getRef(){

        return Firebase.db().collection('/chats');

    }

    static create(meEmail, contactEmail){

        return new Promise((s, f) => {

            let users = {};
            users[btoa(meEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getRef().add({
                users,
                timeStamp: new Date()
            }).then(doc => {

                Chat.getRef().doc(doc.id).get().then(chat => {

                    s(chat);

                }).catch(error => {

                    f(error);

                })

            }).catch(error => {

                f(error);

            });

        });

    }

    static find(meEmail, contactEmail){

        return Chat.getRef()
            .where(btoa(meEmail), '==', true)
            .where(btoa(contactEmail), '==', true).get();

    }

    static createIfNotExists(meEmail, contactEmail){

        return new Promise((s, f) => {

            Chat.find(meEmail, contactEmail).then(chats => {

                if(chats.empty){

                    Chat.create(meEmail, contactEmail).then(chat => {

                        s(chat);

                    }).catch(error => {

                        f(error);

                    })

                } else {

                    chats.forEach(chat => {

                        s(chat);

                    });

                }

            }).catch(error =>{

                f(error);

            });

        });

    }

}