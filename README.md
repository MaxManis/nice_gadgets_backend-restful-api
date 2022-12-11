# Nice Gadgets - Backend API server

## Nice Gadgets API Server (with Node.js(Express) and cloud claster of PostgresSQL)
> ⚠️ **Server built on NodeJS, Express, PostgresSQL(cloud claster), SequelizeORM, JWT, BCrypt, Cookies, .env, Nodemailer etc.**

## Endpoints:
**products:**
/products | GET - Get all phones.
/products/<id> | GET - Get one phone by id.
/products/one/<phoneSlug> | GET - Get one phone by slug.
/products/same/<phoneSlug> | GET - Get same model phones (capacity/color) by slug.
/products | POST - Create new phone.
/products/<id> | PATCH - Edit one phone.
/products/<id>| DELETE - Delete one phone.

**users:**
/users/singup | POST - Sing up new user.
/users/login | POST - Login user.
/users/logout | GET - Logout user.
/users/activate/<token> | GET - Activate user account with a token from email.

**orders:**
/orders | GET - Get all orders.
/orders/<id> | GET - Get all orders for user by userID.
/orders | POST - Create new order.
