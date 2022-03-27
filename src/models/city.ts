import mongoose from 'mongoose';

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});


const citySchema = new mongoose.Schema({

  id: Number,
  name: {
    type: String,
  },
  ascii: String,
  alt_name: String,
  feat_class: String,
  feat_code: String,
  country: String,
  cc2: String,
  admin1: String,
  admin2: String,
  admin3: String,
  admin4: String,
  population: Number,
  elevation: String,
  dem: String,
  tz: String,
  location: {
    type: pointSchema,
    index: '2dsphere'
  }
},{ timestamps: true });

export const City = mongoose.model('City', citySchema);