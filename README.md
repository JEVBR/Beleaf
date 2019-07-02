# Beleaf Node.js app

Destilling some info from the design specifications, 2 pages need to be constructed:

- 1 page shows all marmitas

- 1 page shows individual marmita

# Still to do! :

- Styling! No styling has been done so far
- Change Mongoose DB to a Relational DB

# Depoly

The app has been deployed at https://beleafmarmitas.herokuapp.com/marmitas

a login can be done with email: "User@Beleaf.com" and password "Beleaf"

# Routes used:


routes to be implemented:

# index:

route GET '/' =

- Render a welcome message

# /marmitas

route GET 'marmitas/' (always available)

- Gives list of marmita objects depending on the given search parameter
- Gives all marmitas if no search option is given

route GET 'marmitas/new' (only available when logged in)

- Create new marmita

  params:
      nome,preco,desconto,ingredientes,estoque:,description
      and
      product (=image)

route POST 'marmitas/' (only available when logged in)

- Save new marmita to DB

route GET 'marmitas/:id' (always available)

- Give marmita depending on ID

route GET 'marmitas/:id/edit' (only available when logged in)

- Edit single marmita

route PUT 'marmitas/:id' (only available when logged in)

- Save single marmita to DB

route DELETE 'marmitas/:id' (only available when logged in)

- Delete single marmita from DB

# users

route GET '/users/login'

- Handle the login page

route GET '/users/register' (no link to this endpoint in the app)

- Handle the registration page

route POST '/users/register' (no link to this endpoint in the app)

- Creates a new user

route POST '/users/login'

- Login for existing user

route GET '/users/logout'

  Logout page
