# Server
## Steps to run Server
1. change directory to server
2. run `npm i` to install packages
3. run `npx sequelize db:create` to create database
4. run `npx sequelize db:migrate` to migrate table to database
5. run `npx sequelize db:seed:all` to seed products data
6. create `.env` file and copy the content of `.env.example` to `.env`
7. run `npm start` to start the server

## APIs
1. GET `http://localhost:3000/invoice` to get all invoices
2. GET `http://localhost:3000/invoice/post` to insert invoice to database
3. GET `http://localhost:3000/product` to get all products

# Client
## Steps to run Client
1. change directory to client
2. run `npm i` to install packages
3. run `npm start` to start the server

## Features
1. Home Page - This page includes Invoices Cards and Time-series Graph.
2. Post Invoice Page - This page is a form page for posting new Invoice.