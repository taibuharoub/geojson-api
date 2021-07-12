const mongoose = require("mongoose")
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Store", storeSchema)