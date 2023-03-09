authorizeRole = (allowedRoles) => {
  return function(req, res, next) {
    
  }
}

//   return async function(req, res, next) {
//     const userId = req.user.id;
//     try {
//       const result = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
//       const userRole = result.rows[0].role;
//       if (allowedRoles.includes(userRole)) {
//         next();
//       } else {
//         res.sendStatus(403);
//       }
//     } catch (err) {
//       console.error(err);
//       res.sendStatus(500);
//     }
//   }
// }
