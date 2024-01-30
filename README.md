# Tech Stack

This project uses `React v18`

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

First, install all packages with:

```
npm install
```

Then, to run the server, simply run:

```
npm run start
```

Visit [localhost:3000](http://localhost:3000) to view and use the application.

# Notes

The `App.js` file is the entry point to this app. 

The `/components` folder contains a few other components - these are mostly presentational; i.e. they don't do any further data processing.

Most of the magic happens in the `./src/utils/formatData.js` file. A few additional notes on my thought process are:

- Based on the Loom videos, I understood that the `Number of Cabinets Per Circuit` variable decides:
    - How high a given circuit goes
    - Whether a single column of cabinets needs multiple circuit boxes
    
- Given the above, I divided the entire grid into "Sections", where a section is defined as an area of the grid that contains, _at most_, 1 circuit box per column. Given the constraints of the task, this means that each section covers the full `width`, but adjusts its `height` to fit just 1 circuit box per column.
    - Each section is stored as an object of shape: `{ height: Number, columns: Array }`

- Thereafter, each section contains a collection of "Columns"
    - This means that the app renders one column at a time, per section
    - The number of columns in a section is equivalent to the `width` setting.

- Each column has data describing the column, as well as a collection of "Rows".
    - i.e. Each column is an object that takes the shape:
    ```js
    {
      color: String, // hex colour code, we use color-seed package to get predictable colors for columns
      hasCircuitBox: Boolean, // determines if this column needs a circuit box in cases where `height` <= 2
      circuitboxId: String,
      rows: Array,
    }
    ```
    - To render a column, the app renders each row (i.e. one cabinet at a time)
    - The number of rows in a column is equivalent to the `height` setting.

- Rows are final part of the data, similar to columns, this is an object that contains data that described the specific cabinet + helps render the `circuit` 
    - Each row takes the shape:
    ```js
    {
      value: Number, // The number on the cabinet
      arrowStart: String, // circuit box ID / previous row dot ID
      arrowEnd: String, // current row dot ID
      color: String, // same as column color
    }
    ```

<details>
  <summary>Overall, the data takes the following shape (expand section to view)</summary>
  
  ```js
  // Array of sections
  [
    {
      height: 5,
      // Array of columns in this section. columns.length === width
      columns: [
        color: '#123456',
        hasCircuitBox: true,
        circuitboxId: `${sectionIndex}-circuit-box-${columnIndex}`,
        // Array of rows in this column. rows.length === height
        rows: [
          {
            value: 1,
            arrowStart: column.circuitboxId || `${sectionIndex}-${columnIndex}-row-${rowIndex - 1}-dot`,
            arrowEnd: `${sectionIndex}-${columnIndex}-row-${rowIndex}-dot`,
            color: column.color,
          }
        ],
      ]
    },
    { /*...*/ },
  ]
  ```
</details>

- The circuits themselves are drawn using the [`react-xarrows`](https://github.com/Eliav2/react-xarrows) package.
