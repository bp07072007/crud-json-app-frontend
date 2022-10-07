# CRUD-JSON-APP-FRONTEND
This app is used for handling the contact information using JSON file

# Common setup

Clone the CRUD-JSON-APP-FRONTEND and install the dependencies.

https://github.com/bp07072007/CRUD-JSON-APP-FRONTEND.git

cd CRUD-JSON-APP-FRONTEND

npm install
# Start intructions

In project root directory, run the following command to start the server.

npm start

The server will be available at http://localhost:3000


# Application Feature

# Contact List

The list of contact (name, email, phone number) will be in the tabular format

# Add New Contact

In this application, user can add the contact detail, by clicking the "Add Contact"


# Update the contact information

Updating the contact info, user can click on edit button and it will routing to http://localhost:3000/update/d29ddcad-1a02-45c9-8902-bc10aa87d9b1 like URL, here user can amend the data and click on save button, the data will be updated and refelect on list of contact.

# Delete an contact information

By click on "Delete" button shown on contact list section, it will ask for confirmation to remove it, and user click on "OK", then it will be deleted from list.

# Change status of contact info as "Complete" or "Not complete"

On the contact list page there is button named "Change Status", by which user can change the status "Completed" or "Not Completed", if contact infor is completed then the edit section is disabled.

# Filtering the contact info

there is dropdown list at the top of list, if used select "All", then show all contact.

if user select "Completed", then a list of completed contact info will be contact.

if user select the "Not completed" selection, user can see the list of contact of "Not completed"

# Important Note
upload .env file for setting the URL http://localhost:5000 that will be necessary for the application to execute on the local.
