<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3 justify-content-center">
                    <div class="row justify-content-center">
                        <div class="card" style="width: 100%;">
                            <p class="text-sm text-danger">{{ error }}</p>
                        <div class="card-body">
                            <div class="row g-8">
                                    <div class="col-auto mb-2">
                                        <label for="Zip Code" class="visually-hidden">Zip Code</label>
                                        <input type="text" class="form-control" id="zipcode"
                                        placeholder="Input US Zip Code" v-model="zipcode">
                                    </div>
                                    <div class="col-auto mb-2">
                                        <button type="submit" class="btn btn-outline-success mb-3" @click="locateZip">Render</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                    </div>
                    <div class="row justify-content-center mt-3">
                        <ul v-if="country">
                            <li> <b>Street: </b>{{ street }}</li>
                            <li> <b>City:</b> {{ city }}</li>
                            <li> <b> State:</b> {{ state }}</li>
                            <li> <b>Country:</b> {{ country }}</li>
                        </ul>
                        <ul v-else>

                        </ul>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import IPinfoWrapper from "node-ipinfo";


 export default {
    data(){
        return{
            zipcode:"",
            country: "",
            state: "",
            city:"",
            error:"",
            street: ""            
        }
    },
    methods:{
        locateZip(e){
            // let url =`https://app.zipcodebase.com/api/v1/search?
            // apikey=2e775940-cb00-11ed-8667-41f9bb2bb033&codes=${zipcode},${this.zipcode}`;

            let BingMapsKey =`AsuQp5GQbkMTbRLqq57ndYSGuqsNkhmYswl2jPk3yt7GInB-ryCQ5jfRe6JuORA2`
            let zipcode= this.zipcode;
            let url= `
            https://dev.virtualearth.net/REST/v1/Locations/US/${zipcode}?key=${BingMapsKey}
            `
            e.preventDefault()
            console.log(this.zipcode)
            if(zipcode!=="" && zipcode.length >2){
                axios.get(url).then((response)=>{
                if(response.status==200){
                    let returnedAddress =response.data.resourceSets[0].resources[0].address;
                    let city = returnedAddress.adminDistrict2;
                    let street = returnedAddress.locality;
                    let  state= returnedAddress.adminDistrict;
                    let country= returnedAddress.countryRegion;
                    let addressline1 = returnedAddress.addressLine;

                    this.street= street;
                    this.city = city;
                    this.state = state;
                    this.country = country;
                    this.error=""
                    console.log(response.data);
                }
            }).catch((err)=>{
                console.log(err.message);
                this.error = err.message
            })
            }
            else{
                this.error="You attempted to search for a blank zipcode"
            }
        }
    }
 }

</script>

<style scoped>
li{
    list-style: none;
}
</style>