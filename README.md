# Beleaf Node.js app

Destilling some info from the design specifications, 2 pages need to be constructed:

1 page shows all marmitas

1 page shows individual marmita

Routes used:


routes to be implemented:

# index:

route GET '/' =

  render a welcome message

# /marmitas

route GET 'marmitas/' (always available)

  gives list of marmita objects depending on the given search parameter
  gives all marmitas if no search option is given

route GET 'marmitas/new' (only available when logged in)

  create new marmita

  params:
    nome,preco,desconto,ingredientes,estoque:,description
    and
    product (=image)

route POST 'marmitas/' (only available when logged in)

  Save new marmita to DB

route GET 'marmitas/:id' (always available)

  give marmita depending on ID

route GET 'marmitas/:id/edit' (only available when logged in)

  edit single marmita

route PUT 'marmitas/:id' (only available when logged in)

  save single marmita to DB

route DELETE 'marmitas/:id' (only available when logged in)

  delete single marmita from DB

# users

route GET '/users/login'

  Handle the login page

route GET '/users/register' (no link to this endpoint in the app)

  Handle the registration page

route POST '/users/register' (no link to this endpoint in the app)

  Creates a new user

route POST '/users/login'

  login for existing user

route GET '/users/logout'

  logout page
