const bcrypt = require('bcrypt-nodejs');

const db = require('../db_config.js');
const mysql = require('mysql');

let saveSpots = function(studySpotList) {
  db.getConnection((err, conn) => {
    for (let spot = 0; spot < studySpotList.length; spot++) {
      var currSpot = studySpotList[spot];
      var command = `INSERT INTO locations (id, name, city, state, address) VALUES (?, ?, ?, ?, ?)`;
      var params = [
        currSpot.id,
        currSpot.name,
        currSpot.location.city,
        currSpot.location.state,
        currSpot.location.address1
      ];

      conn.query(command, params, (err, result) => {
        if (err) {
          console.error('Error inserting locations into mySQL');
        } else {
          console.log('Inserted locations into mySQL');
        }
      });
    }

    conn.release();
  });
};

let getRelevantFirst = function(
  studySpotList,
  coffeeMult,
  atmosphereMult,
  comfortMult,
  foodMult,
  cb
) {
  var spotArr = [];
  var spotsWithReviews = [];
  var spotsWithoutReviews = [];
  var results = { businesses: [] };
  let count = 0;
  db.getConnection((err, conn) => {
    for (let spot = 0; spot < studySpotList.length; spot++) {
      conn.query(
        `SELECT AVG(coffeeTea) AS coffeeTea, AVG(atmosphere) AS atmosphere, AVG(comfort) AS comfort, AVG(food) AS food 
        FROM ratings 
        WHERE location=?`,
        studySpotList[spot]['id'],
        (err, result) => {
          let finalScore = 0;
          var resultObj = JSON.parse(JSON.stringify(result))[0];
          if (err) {
            cb(err);
          } else if (resultObj['coffeeTea'] !== null) {
            finalScore =
              resultObj['coffeeTea'] * coffeeMult +
              resultObj['atmosphere'] * atmosphereMult +
              resultObj['comfort'] * comfortMult +
              resultObj['food'] * foodMult;
          }
          spotArr.push([finalScore, studySpotList[spot]]);
          count++;
          if (count === studySpotList.length) {
            spotArr.forEach((pair) => {
              if (pair[0] > 0) {
                spotsWithReviews.push(pair);
              } else {
                spotsWithoutReviews.push(pair);
              }
            });
            spotsWithReviews.sort((a, b) => {
              return b[0] - a[0];
            });
            spotsWithReviews.forEach((pair) => {
              results['businesses'].push(pair[1]);
            });
            spotsWithoutReviews.forEach((pair) => {
              results['businesses'].push(pair[1]);
            });
            cb(null, results);
          }
        }
      );
    }
    conn.release();
  });
};

let getAveragesAndReviewCount = function({ location_id }, cb) {
  db.getConnection((err, conn) => {
    conn.query(
      `SELECT AVG(coffeeTea) AS coffeeTea, AVG(atmosphere) AS atmosphere, AVG(comfort) AS comfort, AVG(food) AS food, COUNT(id) as count
        FROM ratings
        WHERE location=?`,
      location_id,
      (err, result) => {
        if (err) {
          cb(err);
        } else {
          cb(null, JSON.parse(JSON.stringify(result)));
        }
      }
    );

    conn.release();
  });
};

let login = function({ username }, cb) {
  db.getConnection((err, conn) => {
    conn.query(
      `SELECT id, password, membership FROM users WHERE username=?`,
      username,
      (err, result) => {
        if (!result.length) {
          cb('Wrong');
        } else {
          console.log('Found user', result);
          // Return user id
          cb(null, result);
        }
      }
    );

    conn.release();
  });
};

let register = function({ username, password }, cb) {
  bcrypt.hash(password, null, null, (err, hash) => {
    if (err) {
      console.error('Error hashing password', err);
    } else {
      var params = [username, hash];

      db.getConnection((err, conn) => {
        conn.query(
          `INSERT INTO users (username, password) VALUES (?, ?)`,
          params,
          (err, result) => {
            if (err) {
              cb(err);
            } else {
              console.log('Registered', result);
              // Return user id
              cb(null, result);
            }
          }
        );

        conn.release();
      });
    }
  });
};

let addRating = function(
  { user_id, location_id, coffeeTea, atmosphere, comfort, food },
  cb
) {
  var command = `INSERT INTO ratings (coffeeTea, atmosphere, comfort, food, location, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
  var params = [coffeeTea, atmosphere, comfort, food, location_id, user_id];

  db.getConnection((err, conn) => {
    conn.query(command, params, (err, results) => {
      if (err) {
        console.error('Error inserting ratings', err);
      } else {
        console.log('Inserted ratings', results);
        cb(null, results);
      }
    });
    conn.release();
  });
};

let getRating = function({ location_id }, cb) {
  var command = `SELECT coffeeTea, atmosphere, comfort, food
                 FROM ratings
                 JOIN locations ON ratings.location=locations.id
                 WHERE locations.id=?`;

  db.getConnection((err, conn) => {
    conn.query(command, location_id, (err, results) => {
      if (err) {
        console.error('Error getting location ratings', location_id, err);
      } else {
        console.log('Retrieved all location ratings', results);
        // Return location ratings for use in cb
        cb(null, results);
      }
    });

    conn.release();
  });
};

let updateBio = function({user_id, bio}, cb) {
  db.getConnection((err, conn) => {
    conn.query(
      `UPDATE users SET bio = '${bio}' where id = ${user_id}`,
      (err, results) => {
        if (err) {
          console.error('Error updating bio', err);
        } else {
          console.log('Bio updated', results);
          cb(null, results);
        }
      }
    );
    conn.release();
  });
};

let getBio = function({user_id}, cb) {
  db.getConnection((err, conn) => {
    conn.query(
      `select bio from users where users.id = ${Number(user_id)}`,
      (err, results) => {
        if (err) {
          console.error('Error getting bio', err);
        } else {
          console.log('Bio gotten', results);
          cb(null, results);
        }
      }
    );
    conn.release();
  });
};




let addFavorite = function({ user_id, location_id }, cb) {
  var params = [user_id, location_id];

  db.getConnection((err, conn) => {
    conn.query(
      `INSERT INTO users_locations VALUES (?, ?)`,
      params,
      (err, results) => {
        if (err) {
          console.error('Error inserting into favorites', err);
        } else {
          console.log('Inserted into favorites', results);
          cb(null, results);
        }
      }
    );
    conn.release();
  });
};


let getFavorite = function({ user_id }, cb) {
  var command = `SELECT id, name, city, state, address, image1, image2, image3
                 FROM users_locations
                 JOIN locations ON locations.id=users_locations.location_id
                 WHERE users_locations.user_id=${user_id}`;

  db.getConnection((err, conn) => {
    conn.query(command, (err, results) => {
      if (err) {
        console.log('Error getting user favorites', err);
      } else {
        console.log('Retrieved all user favorites', results);
        // Return user favorites for use in cb
        cb(null, results);
      }
    });

    conn.release();
  });
};

let addComment = function({ user_id, location_id, text, parent_id, rating_id }, cb) {
  var params = [text, user_id, location_id, parent_id, rating_id];

  db.getConnection((err, conn) => {
    conn.query(
      `INSERT INTO comments (text, user_id, location, parent_id, rating_id) VALUES (?, ?, ?, ?, ?)`,
      params,
      (err, results) => {
        if (err) {
          console.error('Error inserting comment', err);
        } else {
          console.log('Inserted comment', results);
          cb(null, results);
        }
      }
    );
    conn.release();
  });
};

let getComment = function({ location_id }, cb) {
  var command = `SELECT text, user_id
                 FROM comments
                 JOIN locations ON comments.location=locations.id
                 WHERE locations.id=?`;
  db.getConnection((err, conn) => {
    conn.query(command, location_id, (err, results) => {
      if (err) {
        console.error('Error getting location comments', err);
      } else {
        console.log('Retrieved all location comments', results);
        // Returns location comments for use in cb
        cb(null, results);
      }
    });

    conn.release();
  });
};
let addPics = function({ pics, location_id }, cb) {
  var params = [pics[0], pics[1], pics[2], location_id];
  var command = `UPDATE locations
                 SET image1=?, image2=?, image3=?
                 WHERE id=?`;
  db.getConnection((err, conn) => {
    conn.query(command, params, (err, results) => {
      if (err) {
        console.error('Error posting pics to db', err);
      } else {
        console.log('Posted pics to db', results);
        cb(null, results);
      }
    });

    conn.release();
  });
};

let getFullReviews = function({ location_id, parent_id }, cb) {
  var params = [location_id, parent_id]
  var command = `SELECT r.coffeeTea, r.atmosphere, r.comfort, r.food, c.text, c.user_id, u.username
                  FROM comments as c
                  JOIN users as u ON u.id=c.user_id
                  JOIN locations ON c.location=locations.id
                  JOIN ratings as r ON r.location=locations.id
                  WHERE locations.id=? AND parent_id=?
                  GROUP BY c.text`;

  db.getConnection((err, conn) => {
    conn.query(command, params, (err, results) => {
      if (err) {
        console.error('Error getting all location reviews', err);
      } else {
        console.log('Retrieved all location reviews');
        cb(null, results);
      }
    });

    conn.release();
  });
};

let getReviewByParentId = ({parentId}, cb) => {
  let childSqlStatement = `SELECT l.name, l.city, l.state, l.address, c.text, c.user_id, c.parent_id, c.id, c.location, u.username, u.membership
  FROM comments as c
  JOIN locations as l ON l.id=c.location
  JOIN users as u ON c.user_id=u.id
  WHERE parent_id=?
  GROUP BY c.text
  ORDER BY c.id`;
  let sqlStatement = `SELECT l.name, l.city, l.state, l.address, r.coffeeTea, r.atmosphere, r.comfort, r.food, c.text, c.user_id, c.parent_id, c.id, c.location, u.username, u.membership
  FROM comments as c
  JOIN locations as l ON l.id=c.location
  JOIN ratings as r ON r.id=c.rating_id
  JOIN users as u ON c.user_id=u.id
  WHERE parent_id=?
  GROUP BY c.text
  ORDER BY c.id DESC LIMIT 10`;

  let sqlToggle = parentId === '0' ? sqlStatement : childSqlStatement;
  
  db.getConnection((err, conn) => {
    conn.query(sqlToggle, [parentId], (err, results) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results);
      }
      conn.release();
    })
  })
}

let postSubComment = ({parentId, location, userId, text}, cb) => {
  let sqlStatement = 'INSERT INTO comments (parent_id, location, user_id, text) VALUES (?, ?, ?, ?)';
  let params = [parentId, location, userId, text];

  db.getConnection((err, conn) => {
    conn.query(sqlStatement, params, (err, results) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results);
      }
      conn.release();
    })
  })
}

let updateMembership = (userId, cb) => {
  let sqlStatement = `UPDATE users SET membership = 1 WHERE id = ${userId}`
  db.getConnection((err, conn) => {
    conn.query(sqlStatement, (err, results) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results);
      }
      conn.release();
    })
  })
}

<<<<<<< HEAD
=======
  /* ======================== */
  /* CHAT FUNCTIONS           */
  /* ======================== */

let createGroup = (dataSet, cb) => {
  let sqlStatement1 = `INSERT INTO chatgroups SET ?`
  let sqlStatement2 = `INSERT INTO chatgroups_users (user_id, chatgroups_id) VALUES (?, ?)`

  db.getConnection((err, conn) => {
    conn.query(sqlStatement1, dataSet, (err, res) => {
      if (err) {
        cb(err)
      } else {

        conn.query(sqlStatement2, [dataSet.creator_id, res.insertId], (err, result) => {
          if (err) cb(err)
          else {
            console.log(res.insertId)
            result['chatgroups_id'] = res.insertId
            cb(null, result)
          }
        })
      }
      conn.release();
    })
  })
}
 
let selectGroups = (user_id, cb) => {
  let sqlStatement = `SELECT group_name, group_topic 
  FROM chatgroups
  JOIN chatgroups_users ON chatgroups.id = chatgroups_users.chatgroups_id
  WHERE user_id  = ? ` 
  db.getConnection((err, conn) => {
    conn.query(sqlStatement, user_id, (err, results) => {
      if (err) cb(err)
      else cb(null, results);     
      conn.release();
    })
  })
}

let sendInvitation = (chatgroups_id, usersArr, cb) => {
  let sqlStatement = `INSERT INTO chatgroups_invitations (chatgroups_id, user_id)
    VALUES (?, (SELECT id FROM users WHERE username = ?))`
  let promises = []
  usersArr.forEach((user) => {
    promises.push( new Promise((resolve, reject) => {
       db.getConnection((err, conn) => {
        conn.query(sqlStatement, [chatgroups_id, user], (err, results) => {
          if (err) reject(err)
          else resolve(results);     
        }) 
      })
    })
    )
  })

  return Promise.all(promises)
    .then(response => cb(null, response))
    .catch(err => cb(err))
}

let getInvitations = (user_id, cb) => {
  let sqlStatement = `SELECT * from chatgroups_invitations WHERE user_id = ?`
  db.getConnection((err, conn) => {
    conn.query(sqlStatement, user_id, (err, results) => {
      if (err) cb(err)
      else cb(null, results);     
      conn.release();
    })
  })
}

let acceptInvitation = ( chatgroups_id, user_id, cb ) => {
  console.log('INSIDE MODEL', chatgroups_id, user_id,)
  let sqlStatement = `INSERT INTO chatgroups_users (user_id, chatgroups_id) VALUES (?, ?)`
  db.getConnection((err, conn) => {
    conn.query(sqlStatement, [user_id, chatgroups_id], (err, results) => {
      if (err) cb(err)
      else cb(null, results);     
      conn.release();
    })
  })
}

let deleteInvitation = ( id, cb) => {
  let sqlStatement = `DELETE FROM chatgroups_invitations WHERE id = ?`
  db.getConnection((err, conn) => {
    conn.query(sqlStatement, id, (err, results) => {
      if (err) cb(err)
      else cb(null, results);     
      conn.release();
    })
  })
}

>>>>>>> dev
let addPic = ({user_id, url}, cb) => {
  console.log(user_id);
  console.log(url);
  let sqlStatement = `update users set profile_pic = '${url}' where id = ${user_id}`
  db.getConnection((err, conn) => {
    conn.query(sqlStatement, (err, results) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results);
      }
      conn.release();
    })
  })
}

let getPic = (user_id, cb) => {
  let sqlStatement = `select profile_pic from users where id = ${user_id}`
  db.getConnection((err, conn) => {
    conn.query(sqlStatement, (err, results) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results);
      }
      conn.release();
    })
  })
}

<<<<<<< HEAD

=======
>>>>>>> dev
module.exports = {
  saveSpots: saveSpots,
  addPic: addPic,
  getPic: getPic,
  getRelevantFirst: getRelevantFirst,
  getAveragesAndReviewCount: getAveragesAndReviewCount,
  login: login,
  register: register,
  addRating: addRating,
  addFavorite: addFavorite,
  getRating: getRating,
  getFavorite: getFavorite,
  addComment: addComment,
  getComment: getComment,
  addPics: addPics,
  getFullReviews: getFullReviews,
  getReviewByParentId: getReviewByParentId,
  postSubComment: postSubComment,
  updateMembership: updateMembership,
  updateBio: updateBio,
  getBio: getBio,
<<<<<<< HEAD
=======
  createGroup: createGroup, 
  selectGroups: selectGroups, 
  sendInvitation: sendInvitation,
  getInvitations: getInvitations, 
  acceptInvitation: acceptInvitation,
  deleteInvitation: deleteInvitation
>>>>>>> dev
};
