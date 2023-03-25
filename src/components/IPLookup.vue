<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3 justify-content-center">
                <div class="row justify-content-center">
                    <div class="card" style="width: 100%;">
                        <p class="text-sm text-danger">{{ error }}</p>
                        <h6 class="card-title">Get your IP Address</h6>
                        <div class="card-body">
                            <button type="button" class="btn btn-outline-success btn-sm" @click="locateIP">
                                Get IP Address
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mt-3">
                    <ul v-if="ip">
                        <li> <b>ISP: </b><span class="text-end">{{ isp }}</span></li>
                        <li> <b>IP: </b><span class="text-end">{{ ip }}</span></li>
                        <li> <b>City: </b><span class="text-end">{{ city }}</span></li>
                        <li> <b>Region: </b><span class="text-end">{{ region }}</span></li>
                        <li> <b>Country: </b><span class="text-end">{{ country }}</span></li>
                    </ul>
                 
                  <div v-else>

                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            error: "",
            isp: "",
            ip: "",
            city: "",
            region: "",
            country: ""
        }
    },
    methods: {
        locateIP() {
            axios.get(`https://ipinfo.io/json?token=03fc4c933515a2`).then((response) => {
                console.log("IP Info", response.data)

                this.isp = response.data.org;
                this.ip = response.data.ip;
                this.city = response.data.city;
                this.region = response.data.region;
                this.country = response.data.country
                this.error = "";

            })
                .catch((err) => {
                    this.error = err.message
                })
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
}
</style>