const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const multer = require("multer");

const PORT = 1000;

// MySQL connection pool configuration
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "carrentalmanagement",
  connectionLimit: 10,
});

// Express application setup
const app = express();

// Set up Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/"); // Specify the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename to be unique
  },
});

const upload = multer({ storage });

// Serve static files (including style.css) from the root directory
app.use(express.static(__dirname));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (images) from specific directories
app.use("/upload", express.static("upload"));
app.use("/img", express.static("img"));
app.use("/icon", express.static("icon"));
app.use("/car-img", express.static("car-img"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/GetcarList", (req, res) => {
  const filters = {
    brand: req.query.brand ? req.query.brand.split(",") : null,
    carType: req.query.cartype ? req.query.cartype.split(",") : null,
    fuelType: req.query.fueltype ? req.query.fueltype.split(",") : null,
    passengers: req.query.passenger
      ? req.query.passenger.split(",").map(Number)
      : null,
  };
  // console.log(req.query);

  getAllCarsWithFilters(filters, (error, filteredCars) => {
    if (error) {
      console.error("Error getting filtered cars:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(filteredCars);
  });
});
function getAllCarsWithFilters(filters, callback) {
  pool.getConnection((error, connection) => {
    if (error) {
      console.error("Error getting database connection:", error);
      return callback(error, null);
    }

    // Building the SQL query based on the provided filters
    let sql =
      "SELECT * FROM cars c, carbrands b, cartype ct WHERE ct.id = c.TypeCar AND b.BrandID = c.BrandID AND c.Deletecar = 0";

    console.log(filters);
    // Applying filters if they are provided
    if (filters) {
      if (filters.brand && filters.brand.length > 0) {
        sql += ` AND c.BrandID IN ('${filters.brand.join("','")}')`;
      }

      if (filters.carType && filters.carType.length > 0) {
        sql += ` AND c.TypeCar IN ('${filters.carType.join("','")}')`;
      }

      if (filters.fuelType && filters.fuelType.length > 0) {
        sql += ` AND c.CarType IN ('${filters.fuelType.join("','")}')`;
      }

      if (filters.passengers && filters.passengers.length === 2) {
        const minPassengers = Math.min(...filters.passengers);
        const maxPassengers = Math.max(...filters.passengers);

        // Ensure that at least one of the minimum or maximum values is not zero
        if (minPassengers !== 0 || maxPassengers !== 0) {
          sql += ` AND c.passengers BETWEEN ${minPassengers} AND ${maxPassengers}`;
        }
      }
    }
    console.log(sql);
    connection.query(sql, (error, result) => {
      connection.release();

      if (error) {
        console.error("Error executing SQL query with filters:", error);
        return callback(error, null);
      }

      const filteredCars = result;
      callback(null, filteredCars);
      console.log(filteredCars);
    });
  });
}

// Function to get all cars from the database
function getAllCars(callback) {
  pool.getConnection((error, connection) => {
    if (error) {
      console.error("Error getting database connection:", error);
      return callback(error, null);
    }

    const sql =
      "SELECT * FROM cars  c,carbrands b, cartype ct where ct.id=c.TypeCar and  b.BrandID=c.BrandID and  Deletecar=0";

    connection.query(sql, (error, result) => {
      connection.release();

      if (error) {
        console.error("Error executing SQL query:", error);
        return callback(error, null);
      }

      const cars = result;
      callback(null, cars);
    });
  });
}

app.get("/Selectcartype", (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    const sql = "SELECT id, typename FROM cartype";

    connection.query(sql, (error, result) => {
      connection.release();

      if (error) throw error;

      res.json(result);
    });
  });
});
app.get("/Selectallbrands", (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    const sql = "SELECT * FROM carbrands";

    connection.query(sql, (error, result) => {
      connection.release();

      if (error) throw error;

      res.json(result);
    });
  });
});


app.get("/Selectroutes", (req, res) => {

  pool.getConnection((error, connection) => {
    if (error) throw error;

    const sql = "SELECT * FROM `routes` ";

    connection.query(sql, (error, result) => {
      connection.release();

      if (error) throw error;

      res.json(result);
    });
  });
});


app.get('/sendmsg', (req, res) => {
  // Extract values from req.query
  const { firstname, lastname, email, phone, address } = req.query;

  const mobileNumber = 918128960080;
  const bodyText = `*Dear ${capitalizeFirstLetter(firstname)}*, thank you for choosing Akshar Tours and Travels for your car rental.
  Here are your reservation details:
  
  First Name: ${capitalizeFirstLetter(firstname)}
  Last Name: ${capitalizeFirstLetter(lastname)}
  Email: ${email}
  Phone: ${phone}
  Address: ${address}
  `;

  const messageData = {
    messaging_product: "whatsapp",
    to: mobileNumber,
    type: "text",
    text: {
      preview_url: false,
      body: bodyText,
    },
  };

  // Use fetch instead of XMLHttpRequest
  fetch("https://graph.facebook.com/v17.0/161493447052921/messages", {
    method: "POST",
    headers: {
      "Authorization": "Bearer EAAhZADG5K8rIBO8FnvjSpvPxMaZARk9530fDBzEnmstlu5hZBeQWKQXFYhH513VWmGyyr9i2DGVYOqZA0INT0HvngxNZB4UNAKofaxzW91P5JUerGGRvVBLNfKwTQJM70YjZCZBDT7ZCriqXJCKQnnw1zWY8cYbZAnMOy8DXwQPYRag42ZBBsXOFGeWQ3zxQwqwJDT",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  })
    .then(response => {
      if (response.ok) {
        res.redirect('/contactinfo.html'); // Redirect to the appropriate page after update

      } else {
        res.status(response.status).send('Error sending message'); // Respond with an error status
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
});

function capitalizeFirstLetter(string) {
  if (string && typeof string === 'string' && string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return ''; // or handle it in some appropriate way
  }
}

