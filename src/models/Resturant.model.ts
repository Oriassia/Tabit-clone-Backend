import mongoose, { Schema, Model } from "mongoose";
import { IRestaurant } from "../types/types";

// Guest Info Schema
const GuestInfoSchema: Schema = new Schema({
  guestFirstName: { type: String, required: true },
  guestLastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
});

// Opening Hours Schema
const OpeningHoursSchema: Schema = new Schema({
  day: { type: String, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
});

// Reservation Schema
const ReservationSchema: Schema = new Schema({
  partySize: { type: Number, required: true },
  guestInfo: { type: GuestInfoSchema, required: true },
  reservationTime: { type: Date, required: true },
  position: { type: String, required: true },
  notes: { type: String },
});

// Table Schema
const TableSchema: Schema = new Schema({
  position: { type: String, required: true },
  partySize: { type: Number, required: true },
  reservations: [ReservationSchema],
});

// Restaurant Menu Schema
const RestaurantMenuSchema: Schema = new Schema({
  title: { type: String, required: true },
  menuUrl: { type: String, required: true },
});

// Restaurant Address Schema
const RestaurantAddressSchema: Schema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: Number, required: true },
});

// Restaurant Contact Info Schema
const RestaurantContactInfoSchema: Schema = new Schema({
  phoneNumber: { type: String },
  websiteURL: { type: String },
  instagram: { type: String },
  facebook: { type: String },
});

// Restaurant Schema
const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  categories: [{ type: String, required: true }],
  shortDescription: { type: String, required: true },
  mainPhoto: { type: String, required: true },
  address: { type: RestaurantAddressSchema, required: true },
  contactInfo: { type: RestaurantContactInfoSchema, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  openingHours: [OpeningHoursSchema],
  about: {
    longDescription: { type: String },
    menus: [RestaurantMenuSchema],
    photos: [{ type: String }],
    reservations: [ReservationSchema],
  },
  tables: [TableSchema],
});

// Restaurant Model
const Restaurant: Model<IRestaurant> = mongoose.model<IRestaurant>(
  "Restaurant",
  RestaurantSchema
);

export default Restaurant;
