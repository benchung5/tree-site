<?php 
use Config\Config as Config;
use Lib\Uri;
use Lib\Meta;
?>

<!doctype html>
<html class="no-js" lang="en" ng-app="onePix">
  <head>
  <!-- meta -->
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>
    <?php 
    $page_title = Meta::get_page_title();
    echo $page_title ?:  SITE_TITLE;
    ?>
  </title>
  <meta name="description" content="<?php
    $page_description = Meta::get_page_description();
    echo $page_description ?:  SITE_DESCRIPTION;  ?>">
  <meta name="author" content="Ben Chung">
   
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@niagaratrees">
  <meta name="twitter:creator" content="@niagaratrees">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="naturewithus.com">
  <meta property="og:title" content="<?php echo $page_title ?:  SITE_TITLE; ?>">
  <meta property="og:description" content="<?php echo $page_description ?: SITE_DESCRIPTION; ?>">
<!--   <meta property="og:image" content=""> -->
  
  <!-- Favicons -->
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png">
  <link rel="manifest" href="/assets/favicons/site.webmanifest">
  <link rel="mask-icon" href="/assets/favicons/safari-pinned-tab.svg" color="#8a9f3b">
  <link rel="shortcut icon" href="/assets/favicons/favicon.ico">
  <meta name="msapplication-TileColor" content="#9f00a7">
  <meta name="msapplication-config" content="/assets/favicons/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">

  <style>
    .preload {
      background-color: rgba(255,255,255,1);
      transition: opacity 0.5s;
      position: fixed;
      width: 100vw;
      height: 100vh;
      right: 0;
      left: 0;
      opacity: 1;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .preload.loaded {
      /*slight delay (.1s) to ensure smooth*/
      animation: fadeOut .15s ease .1s both;
    }
    @keyframes fadeOut {
      from { opacity: 1; visibility: visible; }
      to { opacity: 0; visibility: hidden; }
    }
  </style>

  <!-- Head scripts -->
  <script src="<?= Config::paths('ROOT_URL').'assets/js/head.js' ?>"></script>

  <?php
    $segments = Uri::get_parts();
    if (isset($segments['controller'])) {
      // later remove the 'admin' part of this
      if ($segments['controller'] == 'admin' || $segments['controller'] == ('admin_'.Config::paths('ADMIN_ID'))) {
        echo '<link href="'.Config::paths('ROOT_URL').'assets/css/admin.css'.'" rel="stylesheet" type="text/css">';
      } else {
        echo '<link href="'.Config::paths('ROOT_URL').'assets/css/app.css'.'" rel="stylesheet" type="text/css">';
      }
    }

  ?>

  <!-- CSS -->

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900" rel="stylesheet" type="text/css">
  <!-- Google Icons -->
  <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> -->

  <!-- Google tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-NPQB694GPY">
  </script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-NPQB694GPY');
  </script>

  <?php 
  if ($view_data['head_scripts']) {
    foreach ($view_data['head_scripts'] as $script) {
      echo $script;
    } 
  }
  

  ?>

  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-P4VFXW7V');</script>
  <!-- End Google Tag Manager -->
 
  </head>
  
  <body data-<?= $view_data['current_page'] ?> >

  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4VFXW7V"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <!-- preload screen (put above everything) -->
  <?php 
  // if ($segments['controller'] == 'index') {
  //   echo '<div class="preload"></div>';
  // }
  ?>

  <!-- begin main content -->
  <?php
  include $main_content;
  ?>
  <!-- end main content -->

  <!-- vendor libs -->
  <script src="<?= Config::paths('ROOT_URL').'assets/js/vendor.js' ?>"></script>
  <!-- app js -->
  <script src="<?= Config::paths('ROOT_URL').'assets/js/app.js' ?>"></script>

  <!-- *** footer scripts are loaded belew here *** -->

</body>
</html>