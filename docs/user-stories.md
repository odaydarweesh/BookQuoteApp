\# User Stories - Book \& Quote Management System



\## Authentication Module



\### US-001: User Registration

As a new visitor  

I want to create a new account with username, email, and password  

So that I can access the application  



Acceptance Criteria:

\- Username must be unique and 3-50 characters

\- Email must be valid format and unique

\- Password must be at least 8 characters

\- System sends confirmation message on success

\- System shows error for duplicate username/email



\### US-002: User Login

As a registered user  

I want to log in with my username and password  

So that I can access my personal data  



Acceptance Criteria:

\- Valid credentials grant access and return JWT token

\- Invalid credentials show clear error message

\- Token is stored securely in browser

\- User is redirected to books page on success



\### US-003: User Logout

As a logged-in user  

I want to log out from my account  

So that I can secure my session  



Acceptance Criteria:

\- Logout button is visible in navigation

\- Clicking logout clears stored token

\- User is redirected to login page

\- Cannot access protected routes after logout



\## Book Management Module



\### US-004: View Books List

As a logged-in user  

I want to see all my books on the home page  

So that I can manage my book collection  



Acceptance Criteria:

\- Books are displayed in a responsive list/grid

\- Each book shows title, author, and publication date

\- Empty state message shown when no books exist

\- Only user's own books are visible



\### US-005: Add New Book

As a logged-in user  

I want to add a new book with title, author, and publication date  

So that I can build my book collection  



Acceptance Criteria:

\- "Add Book" button navigates to form page

\- Form has fields: Title, Author, Published Date

\- All fields are required with validation

\- Success message shown and redirect to books list

\- New book appears in the list immediately



\### US-006: Edit Book

As a logged-in user  

I want to edit details of an existing book  

So that I can correct or update book information  



Acceptance Criteria:

\- Each book has an "Edit" button

\- Edit button opens form pre-filled with current data

\- Can modify any field

\- Changes are saved to database

\- User redirected to list with success message



\### US-007: Delete Book

As a logged-in user  

I want to delete a book from my collection  

So that I can remove books I no longer want  



Acceptance Criteria:

\- Each book has a "Delete" button

\- Confirmation dialog appears before deletion

\- Book is removed from database

\- List updates immediately without page refresh

\- Success message is displayed



\### US-008: Search Books

As a logged-in user  

I want to search for books by title or author  

So that I can quickly find specific books  



Acceptance Criteria:

\- Search box is visible above books list

\- Search filters results in real-time

\- Shows "No results" message when nothing matches

\- Clear search button to reset filter



\## Quote Management Module



\### US-009: View Quotes List

As a logged-in user  

I want to see all my favorite quotes  

So that I can read and manage them  



Acceptance Criteria:

\- Quotes displayed on separate "My Quotes" page

\- Each quote shows text and author

\- Responsive layout on all devices

\- Empty state message when no quotes exist



\### US-010: Add New Quote

As a logged-in user  

I want to add a new quote with text and optional author  

So that I can save quotes I like  



Acceptance Criteria:

\- "Add Quote" button opens form

\- Text field is required (max 500 chars)

\- Author field is optional

\- Success message and redirect to quotes list

\- New quote appears immediately



\### US-011: Edit Quote

As a logged-in user  

I want to edit an existing quote  

So that I can correct or update it  



Acceptance Criteria:

\- Each quote has an "Edit" button

\- Form opens with current data

\- Can modify text and author

\- Changes saved successfully

\- Redirect with success message



\### US-012: Delete Quote

As a logged-in user  

I want to delete a quote  

So that I can remove quotes I no longer like  



Acceptance Criteria:

\- Each quote has a "Delete" button

\- Confirmation dialog before deletion

\- Quote removed from database

\- List updates immediately

\- Success message displayed



\## UI/UX Module



\### US-013: Navigation Between Pages

As a logged-in user  

I want to easily navigate between Books and Quotes pages  

So that I can access both features quickly  



Acceptance Criteria:

\- Navigation menu visible on all pages

\- Clear indicators for current page

\- Menu items: Books, Quotes, Logout

\- Smooth transitions between pages



\### US-014: Responsive Design

As a user on any device  

I want to use the application comfortably  

So that I can access it from phone, tablet, or desktop  



Acceptance Criteria:

\- Layout adapts to screen size

\- Navigation collapses to hamburger menu on mobile

\- Forms are touch-friendly on mobile

\- All features accessible on all devices

\- Tested on Chrome, Firefox, Safari



\### US-015: Dark/Light Mode Toggle

As a user  

I want to switch between light and dark themes  

So that I can use the app comfortably in different environments  



Acceptance Criteria:

\- Toggle button visible in navigation

\- Theme changes immediately without reload

\- Preference is saved in browser

\- All pages respect theme setting

\- Both themes have good contrast

