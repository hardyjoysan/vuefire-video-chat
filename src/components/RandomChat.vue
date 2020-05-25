<template>
    <div class="random-chat">
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Message #here" v-model="sendContent">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="onSendMessage">Send</button>
            </div>
        </div>

        <div ref="chatbox" class="chatbox">
            <div v-for="(message, index) in messages" :key="index">
                <div class="card" v-if="isAdmin || message.approved" >
                    <div class="card-body">
                        <p>{{message.content}}</p>
                        <div v-if="isAdmin && !message.approved">
                            <button :data-msgid="message.id" type="button" class="btn btn-success btn-approve" @click="onApproveClick">Approve</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../db';

const messagesRef = db.collection('messages');

export default {
    data: function(){
        return{
            messages: [],
            sendContent: null,
            isAdmin: false
        }
    },
    methods: {
        onSendMessage: function(){
            messagesRef.add({
                approved: false,
                content: this.sendContent,
                created_at: new Date().getTime()
            })
            .then((doc) => {
                setTimeout(() => {
                    messagesRef.doc(doc.id).update({
                        approved: true
                    });
                }, 5000);
            });
            this.sendContent = null;
        },
        onApproveClick: function(e){
            var docId = e.target.getAttribute('data-msgid');
            messagesRef.doc(docId).update({
                approved: true
            });
        },
    },
    mounted: function(){
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        
        this.isAdmin = params.get("is_admin") === "true" ? true : false;
        
        messagesRef.orderBy("created_at", "asc").onSnapshot((snapshot) => {
            snapshot.docChanges().forEach( (change) => {
                if (change.type === "added") {
                    var data  = change.doc.data();
                    data = {...data, 'id': change.doc.id}
                    this.messages.unshift(data);
                }
                if (change.type === "modified") {
                    var update  = change.doc.data();

                    this.messages.forEach((message) => {
                        if (message.id === change.doc.id){
                            message.approved = update.approved;
                        }
                    });
                }
                
            });
        });        
    }
}
</script>