import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  initials: { type: String, required: true },
  logoTone: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  workplace: { type: String, required: true },
  type: { type: String, required: true },
  experience: { type: String, required: true },
  salary: { type: String, required: true },
  salaryMin: { type: Number, required: true },
  posted: { type: String, required: true },
  postedDays: { type: Number, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  description: { type: String, required: true },
  responsibilities: { type: [String], default: [] },
  requirements: { type: [String], default: [] },
  skills: { type: [String], default: [] },
}, { timestamps: true, versionKey: false })

export const Job = mongoose.model('Job', jobSchema)
