import mongoose from 'mongoose'; 

const eczemaSchema = mongoose.Schema(
  {
    itchySpots: {
      type: String,
      required: true,
    }, 
    date: {
      type: String, 
      required: true,
    }, 
    sleepDisruptions: {
      type: Number, 
      required: true,
    }, 
    possibleTriggers: {
      type: String,
      required: true
    }
  }, 
  {
    timestamps: true,
  }, 
)

export const eczemaReport = mongoose.model("Eczema", eczemaSchema);