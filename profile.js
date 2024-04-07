
/* Group members:-
Abraham Zbedat 213013618
Mohammed Tarabia 213011737
Tamer krakra 314657842  
*/


const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();

const con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "profiles",
    user: "root",
    password: "12345"      // my password 
});

app.set('view engine', 'ejs');
 app.use(express.static(path.join(__dirname, 'public')));



app.get('/profile', async (req, res) => {
    const id = req.query.id;



/************************************************************************************** */

    // Construct paths for the images based on the id
    const bannerImagePath = `${id}/banner.png`;
    const profileImagePath = `${id}/profile.png`;
    const image1ImagePath = `${id}/image1.png`;
    const image2ImagePath = `${id}/image2.png`;

    // Friends images
   
     const imageFriend1Path = `${id}/friend1.png`;
     const imageFriend2Path = `${id}/friend2.png`;
     const imageFriend3Path = `${id}/friend3.png`;
     const imageFriend4Path = `${id}/friend4.png`;
     const imageFriend5Path = `${id}/friend5.png`;
     const imageFriend6Path = `${id}/friend6.png`;
     const imageFriend7Path = `${id}/friend7.png`;
     const imageFriend8Path = `${id}/friend8.png`;
/************************************************************************************** */

     if (!id) {
        res.status(400).send('Profile ID is required');
        return;
    }

    // Fetch profile data from the database
    con.query("SELECT * FROM title WHERE profile = ?", [id], (err, results) => {
        if (err) {
            console.error("Error retrieving data from database:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("Profile not found");
            return;
        }

        const { title, long_text } = results[0];

        // Fetch advises for the profile
        con.query("SELECT item, long_text, signature FROM text WHERE profile = ?", [id], (err, advises) => {
            if (err) {
                console.error("Error retrieving advises from database:", err);
                res.status(500).send("Internal Server Error");
                return;
            }

          

        const { title, long_text } = results[0];
        res.render('profile', { id, title, long_text,advises, bannerImagePath, profileImagePath, image1ImagePath, image2ImagePath, imageFriend1Path,imageFriend2Path,imageFriend3Path,imageFriend4Path,imageFriend5Path,imageFriend6Path,imageFriend7Path,imageFriend8Path});
    });
});
});

/************************************************************************************** */

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

