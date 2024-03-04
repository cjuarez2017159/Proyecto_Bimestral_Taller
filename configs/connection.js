'use strict'

import mongoose, { mongo } from "mongoose"

export const dbConnection = async() => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connect to mongodb')
            mongoose.disconnect();
        })
        mongoose.connection.on('connection', () => {
            console.log('MongoDB | Try connection');
        })
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | connected to database');
        })
        mongoose.connection.on('open', () => {
            console.log('MongoDB | connected to database')
        })
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconnected to mongodb')
        })
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | disconnected')
        })

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });
    } catch (e) {
        console.log('DataBase connection failed', e)
    }
}