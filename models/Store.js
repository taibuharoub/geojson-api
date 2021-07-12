const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const geocoder = require("../utils/geocoder");

const storeSchema = new Schema({
    storeId: {
        type: String,
        required: [true, "Please add a store ID"],
        unique: true,
        trim: true,
        maxLength: [10, "Store ID must less or equal to 10 chars"]
    },
    address: {
        type: String,
        required: [true, "Please add an address"]
    },
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: "2dsphere"
        },
        formattedAddress: String
      },
    //   createdAt: {
    //       type: Date,
    //       default: Date.now
    //   }
}, {timestamps: true})

//Add Mongoose middleware to handle geocoding
//Geocode & create location
//Normal normal function not an arrow function
storeSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.address);
  // console.log(loc);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }

  //Do not save address (entered user address)
  this.address = undefined;
  next();
})

module.exports = mongoose.model("Store", storeSchema)