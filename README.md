# Challenge

The objective of this technical test is to create a similar application to the one provided in this image:
![image](/src/assets/sample.png)
To achieve this, you must use the API provided by [Random User](https://randomuser.me/).

Here are the steps to follow:

- [ ] Fetch 100 rows of data using the API.[https://randomuser.me/api/?results=100](https://randomuser.me/api/?results=100)

Fields that I need: (myname - apiname)
- Picture: result[0].picture.thumbnail
- Name: result[0].name.first
- Lastname: result[0].name.last
- Country: result[0].location.country
- userId: result[0].login.uuid

- [X] Display the data in a table format, similar to the example.
- [X] Provide the option to color rows as shown in the example.
- [X] Enable the ability to delete a row as shown in the example.
- [X] Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.
- [X] Handle any potential errors that may occur.
- [X] Implement a feature that allows the user to filter the data by country.
- [X] Avoid sorting the data again when the user changes the filter by country.
- [X] Enable sorting by clicking on the column headers.
- [X] Provide a `README.md` with instructions on how to run the application.
