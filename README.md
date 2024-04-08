# Angular E-Commerce Application [Live Demo](https://e-commerce-with-angular-lyart.vercel.app/)

This is a basic setup for an e-commerce angular App. It allows you to list all products and get the details of a specific product.

## Features

- Display a list of products
- pgainated list of products
- filter products by category (categories are from backend)
- get details of a product by running a resolver or by a subscribtion to a behvior subject if we had the data 

## Problems I faced while working

1. the API i supposed to use doesn't support neither pagination nor filter ```https://fakestoreapi.com/```
2. the newly used API doesn't return the list size after each call so this reflected on a lot of calls ``` https://fakeapi.platzi.com/en/ ```
3. as the API is public so there're a lot of dummy data and users add and delete info so i tried to filter the returned data and don't show it at all  

## Supported development features
- Used lazy loading (so it will be open for expansion)
- more useable folder structure (for easier development and to apply single responsibility)
- ngx-bootstrap for faster development and good UI

## Technologies Used

- Angular
- Angular CLI 16.2.0
- ngx-Bootstrap

## Getting Started

1. Clone the repository:
```
git clone https://github.com/MohamedAshrafIbraheem97/e-commerce-with-angular.git
cd ECommerce
```
2. Install dependencies:
```
npm install
```
3. Run the development server:
```
ng serve
```
4. Open your browser and visit `http://localhost:4200` to view the application.
