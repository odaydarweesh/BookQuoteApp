

\# API Endpoints Documentation



\## Base Configuration

\- \*\*Base URL (Dev):\*\* http://localhost:5000/api

\- \*\*Base URL (Prod):\*\* https://your-app.azurewebsites.net/api

\- \*\*Authentication:\*\* JWT Bearer Token

\- \*\*Content-Type:\*\* application/json



\## Authentication Endpoints



\### Register New User

\*\*Endpoint:\*\* POST /api/auth/register  

\*\*Authentication:\*\* Not required  

\*\*Description:\*\* Create a new user account



\*\*Request Body:\*\*

{

"username": "johndoe",

"email": "john@example.com",

"password": "SecurePass123!"

}



\*\*Success Response (201 Created):\*\*

{

"id": 1,

"username": "johndoe",

"email": "john@example.com",

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

"message": "Registration successful"

}



\*\*Error Responses:\*\*

\- 400 Bad Request: Validation errors or duplicate username/email

\- 500 Internal Server Error: Server error



\### User Login

\*\*Endpoint:\*\* POST /api/auth/login  

\*\*Authentication:\*\* Not required  

\*\*Description:\*\* Authenticate user and receive JWT token



\*\*Request Body:\*\*

{

"username": "johndoe",

"password": "SecurePass123!"

}



\*\*Success Response (200 OK):\*\*

{

"id": 1,

"username": "johndoe",

"email": "john@example.com",

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

"message": "Login successful"

}



\*\*Error Responses:\*\*

\- 401 Unauthorized: Invalid credentials

\- 400 Bad Request: Missing fields



\## Books Endpoints (Protected - Requires JWT)



\### Get All Books for Current User

\*\*Endpoint:\*\* GET /api/books  

\*\*Authentication:\*\* Required (Bearer Token)  

\*\*Description:\*\* Retrieve all books belonging to authenticated user



\*\*Request Headers:\*\*

Authorization: Bearer {token}



\*\*Success Response (200 OK):\*\*

\[

{

"id": 1,

"title": "Clean Code",

"author": "Robert C. Martin",

"publishedDate": "2008-08-01T00:00:00Z",

"createdAt": "2024-12-01T10:30:00Z"

},

{

"id": 2,

"title": "The Pragmatic Programmer",

"author": "Andrew Hunt",

"publishedDate": "1999-10-20T00:00:00Z",

"createdAt": "2024-12-02T14:20:00Z"

}

]



\*\*Error Responses:\*\*

\- 401 Unauthorized: Missing or invalid token

\- 500 Internal Server Error: Server error



\### Get Single Book by ID

\*\*Endpoint:\*\* GET /api/books/{id}  

\*\*Authentication:\*\* Required (Bearer Token)  

\*\*Description:\*\* Retrieve specific book details



\*\*Success Response (200 OK):\*\*

{

"id": 1,

"title": "Clean Code",

"author": "Robert C. Martin",

"publishedDate": "2008-08-01T00:00:00Z",

"createdAt": "2024-12-01T10:30:00Z",

"userId": 1

}



\*\*Error Responses:\*\*

\- 404 Not Found: Book doesn't exist or doesn't belong to user

\- 401 Unauthorized: Invalid token



\### Create New Book

\*\*Endpoint:\*\* POST /api/books  

\*\*Authentication:\*\* Required (Bearer Token)  

\*\*Description:\*\* Add a new book to user's collection



\*\*Request Body:\*\*

{

"title": "Design Patterns",

"author": "Gang of Four",

"publishedDate": "1994-10-21"

}



\*\*Success Response (201 Created):\*\*

{

"id": 3,

"title": "Design Patterns",

"author": "Gang of Four",

"publishedDate": "1994-10-21T00:00:00Z",

"createdAt": "2024-12-03T19:15:00Z",

"message": "Book created successfully"

}



\*\*Error Responses:\*\*

\- 400 Bad Request: Validation errors

\- 401 Unauthorized: Invalid token



\### Update Existing Book

\*\*Endpoint:\*\* PUT /api/books/{id}  

\*\*Authentication:\*\* Required (Bearer Token)  

\*\*Description:\*\* Update book details



\*\*Request Body:\*\*

{

"title": "Clean Code (Updated Edition)",

"author": "Robert C. Martin",

"publishedDate": "2008-08-01"

}



\*\*Success Response (200 OK):\*\*

{

"id": 1,

"title": "Clean Code (Updated Edition)",

"author": "Robert C. Martin",

"publishedDate": "2008-08-01T00:00:00Z",

"message": "Book updated successfully"

}



\*\*Error Responses:\*\*

\- 404 Not Found: Book doesn't exist or doesn't belong to user

\- 400 Bad Request: Validation errors

\- 401 Unauthorized: Invalid token



\### Delete Book

\*\*Endpoint:\*\* DELETE /api/books/{id}  

\*\*Authentication:\*\* Required (Bearer Token)  

\*\*Description:\*\* Remove book from user's collection



\*\*Success Response (204 No Content)\*\*  

No response body



\*\*Error Responses:\*\*

\- 404 Not Found: Book doesn't exist or doesn't belong to user

\- 401 Unauthorized: Invalid token



\## Quotes Endpoints (Protected - Requires JWT)



\### Get All Quotes for Current User

\*\*Endpoint:\*\* GET /api/quotes  

\*\*Authentication:\*\* Required (Bearer Token)



\*\*Success Response (200 OK):\*\*

\[

{

"id": 1,

"text": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",

"author": "Martin Fowler",

"createdAt": "2024-12-01T11:00:00Z"

},

{

"id": 2,

"text": "First, solve the problem. Then, write the code.",

"author": "John Johnson",

"createdAt": "2024-12-01T11:05:00Z"

}

]



\### Get Single Quote by ID

\*\*Endpoint:\*\* GET /api/quotes/{id}  

\*\*Authentication:\*\* Required (Bearer Token)



\*\*Success Response (200 OK):\*\*

{

"id": 1,

"text": "Any fool can write code that a computer can understand.",

"author": "Martin Fowler",

"createdAt": "2024-12-01T11:00:00Z",

"userId": 1

}



\### Create New Quote

\*\*Endpoint:\*\* POST /api/quotes  

\*\*Authentication:\*\* Required (Bearer Token)



\*\*Request Body:\*\*

{

"text": "Code is like humor. When you have to explain it, it's bad.",

"author": "Cory House"

}



\*\*Success Response (201 Created):\*\*

{

"id": 3,

"text": "Code is like humor. When you have to explain it, it's bad.",

"author": "Cory House",

"createdAt": "2024-12-03T19:20:00Z",

"message": "Quote created successfully"

}



\### Update Existing Quote

\*\*Endpoint:\*\* PUT /api/quotes/{id}  

\*\*Authentication:\*\* Required (Bearer Token)



\*\*Request Body:\*\*

{

"text": "Updated quote text here",

"author": "Author Name"

}



\*\*Success Response (200 OK):\*\*

{

"id": 1,

"text": "Updated quote text here",

"author": "Author Name",

"message": "Quote updated successfully"

}



\### Delete Quote

\*\*Endpoint:\*\* DELETE /api/quotes/{id}  

\*\*Authentication:\*\* Required (Bearer Token)



\*\*Success Response (204 No Content)\*\*





\## Error Response Format



All error responses follow this structure:



{

"error": "Error message description",

"details": \["Validation error 1", "Validation error 2"],

"timestamp": "2024-12-03T19:25:00Z"

}



\## Authentication Header Format



For all protected endpoints:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...



undefined

