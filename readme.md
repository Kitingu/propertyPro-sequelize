# PropertyPro

Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

[![Build Status](https://travis-ci.com/Kitingu/propertyPro-sequelize.svg?branch=master)](https://travis-ci.com/Kitingu/propertyPro-sequelize)
[![Coverage Status](https://coveralls.io/repos/github/Kitingu/propertyPro-sequelize/badge.svg?branch=master)](https://coveralls.io/github/Kitingu/propertyPro-sequelize?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/9a5f11501e279023cb5a/maintainability)](https://codeclimate.com/github/Kitingu/propertyPro-sequelize/maintainability)

### Required Features

1. User can sign up.
2. User can sign in.
3. User (agent) can post a property advert.
4. User (agent) can update the details of a property advert.
5. User (agent) can mark his/her posted advert as sold.
6. User (agent) can delete a property advert.
7. User can view all properties adverts.
8. User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.
9. User can view a specific property advert.

#### Optional Features

- User can reset password.
- flag/report​ a posted AD as fraudulent.
- User can add multiple pictures to a posted ad.
- The application should display a Google Map with Marker showing the red-flag or
  intervention location.

#### Endpoints

| Method | Endpoint                              | Description                                         |
| ------ | ------------------------------------- | --------------------------------------------------- |
| POST   | `/auth/signup`                        | User create an account                              |
| POST   | `/auth/signin`                        | Sign in / log in a user                             |
| POST   | `/property`                           | Create a property advert                            |
| GET    | `/property`                           | Fetch all available property adverts                |
| GET    | `/property/<:property-id>`            | get a specific advert                               |
| DELETE | `/property/<:propertyId>`             | Delete an delete advert you own                     |
| PATCH  | `/property/<:propertyId>/price`       | Update the price of a property advert               |
| PATCH  | `/property/<:property-id>/sold`       | Mark an advert as sold                              |
| GET    | `/api/v1/property?type=property-type` | get all available property adverts of specific type |
| POST   | `/property/<:property-id>/flag`       | Flag an advert as fraudulent                        |

#### How to run the application locally

> 1.  Create a local working space (Folder)
> 2.  Open teminal and navigate to the folder reated above.
> 3.  git clone https://github.com/kitingu/propertypro.git
> 4.  Run `npm install` to install dependencies.
> 5.  Run `npm run devstart` to run the application.
> 6.  Open `Postman` to test the endpoints above.

#### Where to get the User interface

Navigate to https://kitingu.github.io/propertypro/UI/index.html to view the pages

#### Author: Benedict Mwendwa

#### License: [MIT](https://github.com/Kitingu/PropertyPro/blob/develop/LICENSE)
