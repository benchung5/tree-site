<?php
namespace Controllers;
use Lib\Controller;

class Contact extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) {
		$this->render('contact', null, 'Contact Us', 'Located just 15 mins south of Prince George, BC. Contact us for online, wholesale, or retail orders.');
	}
}