module.exports = {
   "development": {
      SERVER_URL: "/api",
      DOMAIN_URL: 'http://localhost',
      ROOT_URL: "/",
      ARTICLES_UPLOADS_PATH: '/uploads/articles/',
      PLANTS_UPLOADS_PATH: '/uploads/trees/',
   },
   "production": {
      DOMAIN_URL: 'https://naturewithus.com',
      SERVER_URL: "/api",
      ROOT_URL: "/",
      ARTICLES_UPLOADS_PATH: '/uploads/articles/',
      PLANTS_UPLOADS_PATH: '/uploads/trees/',
   },
   "globals": {
      HIDE_MENU_THRESHOLD: 1150,
      POST_CONFIG: {
           headers: {
             'CONTENT_TYPE': 'application/json',
           }
         },
      ADMIN_ENTRIES_PER_PAGE: 25,
      ADMIN_URL: 'admin_752'
    }
}