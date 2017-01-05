<template>
    <div class="dialog" v-if="dialog.isActive">
        <p>{{dialog.text}}</p>
        <div class="dialog-btns">
            <button @click="cancel">{{dialog.cancelText}}</button>
            <button @click="enter">{{dialog.enterText}}</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            dialog: {
                type: Object,
                default: {
                    isActive: false,
                    text: '',
                    cancelText: '取消',
                    enterText: '确定',
                    enterCallback: null,
                }
            }
        },
        method: {
            cancel() {
                this.dialog.isActive = false;
            },
            enter() {
                this.dialog.enterCallback && this.dialog.enterCallback();
                this.cancel();
            }
        }
    }
</script>

<style lang="less">
    .dialog {
        position: fixed;
        top: 100%;
        left: 100%;
        transform: tanslate3d(-50%, -50%, 0);
        width: 80%;
        text-align: center;
        color: #000;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 10px;
        box-shadow: 0 0 10px #000;

        .dialog-btns {
            display: flex;
            button {
                width: 50%;
            }
        }
    }
</style>