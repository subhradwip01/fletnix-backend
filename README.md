# FletNix - Backend


<p align="center">
  <img src="https://github.com/user-attachments/assets/c608867b-2861-46dd-b6b5-771e0dacf187" alt="Description of Image" width="500">
</p>

### API services fro FletNix web application

### Objective:
1. Provide the API service for the FletNix web application
2. Store and manage the data for the application

### Features:
1. The User can log in
2. The User can register
3. The user can get the list of data for movie/TV show
4. The user can get the details of any movie/TV show
5. Age-restricted data visibility for 'R' rating content
6. Provide the data based on the type - Movie/TV Show

### Tech stack:
1. Node - express JS
2. Mongo DB

### Base response structure:
-  Success response: 
 ```json
{
  "message": "string",
  "data": {
    "key1": "value1",
    "key2": "value2",
  }
}
// value can be anything
// with status codes
```
`

- Error response :
 ```json
  {
     "message": "string"
  }
 // with status codes
```

### Base URL:
- https://fletnix-backend-1.onrender.com/api

### Endpoints
1. Auth endpoints:
   #### Register Endpoint: 
     - `/auth/register`   
     - Request body:
         ```json
         {
         "name": "<your_name>",
          "email": "<your_email>",
          "password": "<password>",
          "age": "<age>"
         }
       ```
    - Response body:
        ```json
         {
            "message": "User registered successfully"
         }
       ```
    - `Note`: Not passing the data as frontend is not required as of now
   #### Logon Endpoint: 
     - `/auth/login`   
     - Request body:
         ```json
         {
          "email": "<your_email>",
          "password": "<password>",
         }
       ```
    - Response body:
        ```json
        {
          "message": "Login successful",
          "data": {
            "token": "<token>",
            "name": "<name>"
            }
          }
       ```
2. Shows endpoints:
   #### Get all shows: 
     -  `/shows?page={page_number}`  
     - `headers`: {`Authorization`: bearer  `<token>`
     - Response body:
         ```json
         {
           "message": "Successfully get shows",
            "data": {
               "shows":"[array of show object]",
               "page":"<page_number>",
               "pageSize": "number of data in that page",
               "hasNextPage": "true/false if next page is there or not",
             },
         }
       ```
   #### Get shows by type: 
     -  `/shows?page={page_number}&type={type}`  
     - `headers`: {`Authorization`: bearer  `<token>`
     - Response body:
         ```json
         {
           "message": "Successfully get shows",
            "data": {
               "shows":"[array of show object]",
               "page":"<page_number>",
               "pageSize": "<number_of_data_in_that_page>",
               "hasNextPage": "<true/false_if_next_page_is_there_or_not>",
             },
         }
       ```
   #### Get show details: 
     -  `/shows/get-details/:show_id`  
     - `headers`: {`Authorization`: bearer  `<token>`
     - Response body:
         ```json
         {
           "message": "Show details fetched successfully",
            "data": {
               "show":{
                  "_id": "<mongo_id>"
                  "show_id": "<show_id>",
                  "type": "<type_of_the_show>",
                  "title": "<whow_title>",
                  "director": "<show_director>",
                  "country": "<show_country>",
                  "date_added": "<show_date>",
                  "release_year": "<show_year>",
                  "rating": "<show_rating>",
                  "duration": "<show_duration?",
                  "listed_in": "<show_listed_is_platforms>",
                  "description": "<show_description>"
                },
               
             },
         }
      ```
  
 ### Testing result:
 #### Environment:
  - OS: Windows
  - Node Version : v18.17.1
 #### Library used:
  - Jest
 #### Result:
 #### Auth test:
   ![Screenshot 2024-08-03 132750](https://github.com/user-attachments/assets/6a1a40f1-1df4-4be3-84bc-03a5f353a417)
 #### Show test:
   ![Screenshot 2024-08-03 144700](https://github.com/user-attachments/assets/ef25f8d8-efd5-4836-a0ec-0a7544a0fbac)

   

     
  
